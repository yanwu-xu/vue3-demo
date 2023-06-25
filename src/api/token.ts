import axios from 'axios'
import { queryParams } from '@/utils/util'
import { logout } from '@/utils/login'

// 允许携带cookie
axios.defaults.withCredentials = true

const http = axios.create({
  baseURL: (window as any).env.authUrl,
  timeout: 100000,
})

// response拦截器
http.interceptors.response.use(
  res => res,
  error => {
    logout(window.location.href)
    throw new Error('获取token失败', error)
  }
)

export function getToken(params?: object) {
  return http.post(`/uni/oauth/token?${queryParams(params)}`)
}
