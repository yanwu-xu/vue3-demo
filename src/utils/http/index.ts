import Axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { useUserStoreHook } from '@/store/modules/user'
import { ElMessage } from 'element-plus'
import { PureHttpError, RequestMethods, PureHttpResoponse, PureHttpRequestConfig } from './types.d'
import { getCookie } from '@/utils/cookie'
import { logout } from '@/utils/login'

// declare const window: Window & { env: any };

class PureHttp {
  constructor() {
    this.httpInterceptorsRequest()
    this.httpInterceptorsResponse()
  }

  // 保存当前Axios实例对象
  private static axiosInstance: AxiosInstance = Axios.create({
    baseURL: (window as any).env.baseUrl,
    timeout: 100000,
  })

  // 请求拦截
  private httpInterceptorsRequest(): void {
    PureHttp.axiosInstance.interceptors.request.use(
      (config: PureHttpRequestConfig) => {
        if (!config.headers) return
        config.headers.Authorization = getCookie('tk')
        config.headers.username = getCookie('username')
        config.headers.tenantCode = useUserStoreHook().getCompanyId
        config.headers.companyId = useUserStoreHook().getCompanyId
        return config
      },
      error => Promise.reject(error)
    )
  }

  // 响应拦截
  private httpInterceptorsResponse(): void {
    PureHttp.axiosInstance.interceptors.response.use(
      (response: PureHttpResoponse) => {
        const { data = {}, config = {}, headers = {} } = response || {}
        const { code, message } = data
        const { url = '', cancelMessage, responseType } = config
        if (!response || (code && ![200, '200'].includes(code))) {
          ElMessage.error({ message: message || '未知错误' })
          return Promise.reject()
        }
        // 文件下载的处理
        if (responseType === 'blob') {
          const fileName = headers['content-disposition']?.split('=')[1]
          if (fileName) {
            const contentType = headers['content-type']
            return { data, fileName, contentType }
          } else {
            const fileReader = new FileReader()
            fileReader.readAsText(data, 'utf-8')

            fileReader.onload = () => {
              if (fileReader?.result) {
                const msg = JSON.parse(fileReader?.result as any)?.message
                ElMessage.error({ message: msg || '未知错误' })
              }
            }
            return Promise.reject()
          }
        }

        if (!cancelMessage && !/visits|list/g.test(url) && [200, '200'].includes(code) && message) {
          ElMessage.success({ message })
        }
        return data
      },
      (error: PureHttpError) => {
        const { response = { status: '', data: {} } } = error
        const { status, data = {} } = response
        const { message = '系统错误' }: any = data

        if (status === 401) {
          // 401后直接退出
          logout(window.location.href)
        } else {
          ElMessage.error({ message, showClose: true })
        }

        return Promise.reject(error)
      }
    )
  }

  // 通用请求工具函数
  public request<T>(
    method: RequestMethods,
    url: string,
    param?: AxiosRequestConfig,
    axiosConfig?: PureHttpRequestConfig
  ): Promise<T> {
    const config = {
      method,
      url,
      ...param,
      ...axiosConfig,
    } as PureHttpRequestConfig

    // 单独处理自定义请求/响应回掉
    return new Promise((resolve, reject) => {
      PureHttp.axiosInstance
        .request(config)
        .then((response: any) => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  // 单独抽离的post工具函数
  public post<T, P>(url: string, params?: T, config?: PureHttpRequestConfig): Promise<P> {
    return this.request<P>('post', url, params as any, config)
  }

  // 单独抽离的get工具函数
  public get<T, P>(url: string, params?: T, config?: PureHttpRequestConfig): Promise<P> {
    return this.request<P>('get', url, params as any, config)
  }
}

export const http = new PureHttp()
