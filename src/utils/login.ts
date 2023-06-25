import { getQueryString, delQueryString, queryParams } from '@/utils/util'
import { getCookie, setCookie, deleteCookie } from '@/utils/cookie'
import { getToken as getTokenApi } from '@/api/token'
import Auth from 'auth_iot'

const auth = new Auth(window.env.baseUrl)

const getToken = (resolve, reject, code) => {
  const params = {
    grant_type: 'authorization_code',
    redirect_uri: delQueryString(window.location.href, 'code', true),
    client_id: window.env.clientId,
    client_secret: window.env.clientSecret,
    code,
  }
  getTokenApi(params).then(
    res => {
      const { token_type, access_token } = res.data
      const newToken = token_type + access_token
      // 设置token
      setCookie('tk', newToken)
      resolve(newToken)
    },
    error => reject(error)
  )
}

// 判断是否登录
export function isLogin() {
  return auth.isLogin()
}

// 登录逻辑
export function login() {
  const { authType, authUrl } = window.env
  if (authType === 'iot2') {
    return auth.login(window.location.href)
  } else {
    return new Promise((resolve, reject) => {
      const token = getCookie('tk')
      if (token) {
        resolve(token)
      } else {
        const code = getQueryString('code')
        if (code) {
          getToken(resolve, reject, code)
        } else {
          const params = {
            client_id: window.env.clientId,
            response_type: 'code',
            redirect_uri: delQueryString(window.location.href, 'code', true),
          }
          window.location.href = `${authUrl}/uni/oauth/authorize?${queryParams(params)}`
        }
      }
    })
  }
}

// 登出
export function logout(redirectUri) {
  const { authType, authUrl } = window.env
  if (authType === 'iot2') {
    auth.logout(window.location.href)
  } else {
    deleteCookie('tk')
    deleteCookie('username')
    const params = {
      token: getCookie('tk'),
      redirect_uri: delQueryString(redirectUri, 'code', true),
    }
    // 调用接口
    window.location.href = `${authUrl}/uni/cusLogout?${queryParams(params)}`
  }
}
