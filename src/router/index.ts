import { App } from 'vue'
import { Router, createRouter, createWebHistory } from 'vue-router'
import asyncRoutesMap from '@/router/asyncRoutes'
import syncRoutesMap from '@/router/syncRoutes'

const router: Router = createRouter({
  history: createWebHistory(),
  routes: syncRoutesMap,
  strict: true,
  scrollBehavior(_, from, savedPosition) {
    return new Promise(resolve => {
      if (savedPosition) {
        return savedPosition
      } else {
        if (from.meta.saveSrollTop) {
          const top: number = document.documentElement.scrollTop || document.body.scrollTop
          resolve({ left: 0, top })
        }
      }
    })
  },
})

export { asyncRoutesMap, syncRoutesMap }

export function setupRouter(app: App) {
  app.use(router)
}

export default router
