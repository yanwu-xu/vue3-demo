import { RouteRecordName } from 'vue-router'

export type cacheType = {
  mode: string
  name?: RouteRecordName
}

export type positionType = {
  startIndex?: number
  length?: number
}

export type appType = {
  sidebarOpened: boolean
  fullMain: boolean
  lang: string
  hasI18n: boolean
}

export type permissionType = {
  routes: any
}

export type setType = {
  title: string
  fixedHeader: boolean
  hiddenSideBar: boolean
}

export type userType = {
  user: string
  name: string
  avatar: string
  id: string
  email: string
  mobile: string
  introduction: string
  roles: any
  elements: any
  companyId: string
}
