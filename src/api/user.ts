import { http } from '@/utils/http'

const PREFIX = (window as any).env.api.userCenter

export function getUserInfo() {
  const params = {
    category: 'handle',
  }
  return http.request('get', `${PREFIX}/user/front/info`, { params })
}
