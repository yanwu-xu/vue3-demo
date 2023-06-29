import { store } from '@/store'
import { permissionType } from './types'
import { defineStore } from 'pinia'
import { asyncRoutesMap, syncRoutesMap } from '@/router/index'
import { mapRoutes } from '@/utils/util'
import { useUserStoreHook } from '@/store/modules/user'

// 判断是否有权限
function hasPermission(roles, route) {
  // return roles.find(role => route.name === role.code)
  return true
}

function filterAsyncRouter(routes, roles) {
  // if (!roles || !roles.length) return []

  const result = routes.filter(route => {
    const role = hasPermission(roles, route)
    if (role) {
      const { orderNum, zhTitle, enTitle } = role
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
      }
      route.orderNum = orderNum
      route.meta = { ...(route.meta || {}), zhTitle, enTitle }
      return true
    }
    return false
  })

  const sortResult = result.sort((a, b) => a.orderNum - b.orderNum)
  return sortResult
}

export const usePermissionStore = defineStore({
  id: 'pure-permission',
  state: (): permissionType => ({
    routes: [],
  }),
  actions: {
    SET_ROUTES(routes: any) {
      this.routes = mapRoutes([...syncRoutesMap, ...routes])
    },
    generateRoutes() {
      return useUserStoreHook()
        .GetUserInfo()
        .then(data => {
          const routes = filterAsyncRouter(asyncRoutesMap, data.menus)
          this.SET_ROUTES(routes)
          return routes
        })
    },
  },
})

export function usePermissionStoreHook() {
  return usePermissionStore(store)
}
