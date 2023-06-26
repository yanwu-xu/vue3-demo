import { Component } from 'vue'
export const routerArrays: Array<RouteConfigs> = [
  {
    path: '/welcome',
    parentPath: '/',
    meta: {
      title: 'menus.hshome',
      i18n: true,
      icon: 'home-filled',
    },
  },
]

export type routeMetaType = {
  title?: string
  i18n?: boolean
  icon?: string
  showLink?: boolean
  savedPosition?: boolean
  authority?: Array<string>
}

export type RouteConfigs = {
  path?: string
  parentPath?: string
  query?: object
  meta?: routeMetaType
  children?: RouteConfigs[]
  name?: string
}

export type multiTagsType = {
  tags: Array<RouteConfigs>
}

export type tagsViewsType = {
  icon: Component
  text: string
  divided: boolean
  disabled: boolean
  show: boolean
}

export interface setType {
  sidebarOpened?: boolean
  fullMain?: boolean
  classObj?: any
}

export type childrenType = {
  path?: string
  noShowingChildren?: boolean
  children?: childrenType[]
  value: unknown
  meta?: {
    icon?: string
    title?: string
    i18n?: boolean
    extraIcon?: {
      svg?: boolean
      name?: string
    }
  }
  showTooltip?: boolean
  parentId?: number
  pathList?: number[]
}

export type userType = {
  user: any
  hasI18n: any
  lang: any
}

export type themeColorsType = {
  rgb: string
  themeColor: string
}

export interface scrollbarDomType extends HTMLElement {
  wrap?: {
    offsetWidth: number
  }
}
