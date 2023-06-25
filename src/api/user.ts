import { http } from '@/utils/http'

const PREFIX = (window as any).env.userCenter

export function getUserInfo() {
  const params = {
    category: 'handle',
  }
  return http.request('get', `/api/${PREFIX}/user/front/info`, { params })
}
