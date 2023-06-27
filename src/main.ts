import { createApp } from 'vue'
import App from './App.vue'

import { usePermissionStoreHook } from '@/store/modules/permission'
import { isLogin, login } from '@/utils/login'
import router, { setupRouter } from '@/router'
import { setupStore } from '@/store'
import { setupComponents } from '@/components'
import { setupSvg } from '@/assets/icons'
import { setupElementPlus } from '@/components/element-plus'

import '@/styles/index.scss'

const init = async () => {
  const app = createApp(App)

  // 加载菜单权限
  const routes = await usePermissionStoreHook().generateRoutes()

  // 注册element
  setupElementPlus(app)

  // 注册全局自定义组件
  setupComponents(app)

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
