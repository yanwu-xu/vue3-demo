import { RouteRecordRaw } from 'vue-router'
import Layout from '@/views/layout/Layout.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    name: 'root',
    meta: {
      title: 'root',
    },
    redirect: '/main/auth',
  },
  {
    path: '/main',
    name: 'main',
    component: Layout,
    redirect: '/main/auth',
    meta: {
      title: 'main',
    },
    children: [
      {
        path: 'auth',
        name: 'auth',
        component: () => import('@/views/page/page1.vue'),
        meta: {
          title: '权限判断',
        },
      },
    ],
  },
]

export default routes
