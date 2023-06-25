import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import App from './App.vue'

import { usePermissionStoreHook } from '@/store/modules/permission'
import { isLogin, login } from '@/utils/login'
import router, { setupRouter } from '@/router'
import { setupStore } from '@/store'
import { setupSvg } from '@/assets/icons'

import '@/styles/index.scss'
import 'element-plus/dist/index.css'

const init = async () => {
  const app = createApp(App)
  app.use(ElementPlus)

  // 加载菜单权限
  const routes = await usePermissionStoreHook().generateRoutes()

  // 注册svg
  setupSvg(app)

  // 挂载状态管理
  setupStore(app)

  // 挂载路由
  await setupRouter(app)

  // 挂载异步路由
  router.addRoute(routes)

  // 路由准备就绪后挂载APP实例
  await router.isReady()

  app.mount('#app')
}

if (isLogin()) {
  init()
} else {
  ;(login() as any).then(() => init())
}
