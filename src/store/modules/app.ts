import { store } from '@/store'
import { appType } from './types'
import { defineStore } from 'pinia'
import Cookies from 'js-cookie'

export const useAppStore = defineStore({
  id: 'pure-app',
  state: (): appType => ({
    sidebarOpened: false,
    fullMain: false,
    lang: 'zh_CN',
    hasI18n: false,
  }),
  actions: {
    toggleSideBar(status?: boolean) {
      this.sidebarOpened = status ?? !this.sidebarOpened
      if (!this.sidebarOpened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
    },
    setLang(lang: any) {
      this.lang = lang
    },
  },
})

export function useAppStoreHook() {
  return useAppStore(store)
}
