import { store } from '@/store'
import { userType } from './types'
import { defineStore } from 'pinia'
import { getUserInfo } from '@/api/user'

export const useUserStore = defineStore({
  id: 'pure-user',
  state: (): userType => ({
    user: '',
    name: '',
    avatar: '',
    id: '',
    email: '',
    mobile: '',
    introduction: '',
    roles: [],
    elements: [],
    companyId: '',
  }),
  getters: {
    getCompanyId() {
      return (this as any).companyId
    },
  },
  actions: {
    // 获取用户信息
    GetUserInfo() {
      return getUserInfo()
        .then((res: any) => {
          const {
            menus,
            elements,
            name,
            username,
            email,
            mobilePhone,
            id,
            avatar,
            introduction,
            companyId,
          } = res.data

          const elementsMap = (elements || []).reduce((result, current) => {
            result[current.code] = true
            return result
          }, {})
          this.elements = elementsMap
          this.roles = menus || []
          this.name = name
          this.user = username
          this.email = email
          this.mobile = mobilePhone
          this.id = id
          this.avatar = avatar
          this.introduction = introduction
          if (!(window as any).__POWERED_BY_QIANKUN__) {
            this.companyId = companyId
          }
          return res.data
        })
        .catch(error => {
          return Promise.reject(error)
        })
    },

    // 登出
    LogOut() {
      return new Promise(resolve => {
        this.roles = []
        resolve(new Error())
      })
    },
  },
})

export function useUserStoreHook() {
  return useUserStore(store)
}
