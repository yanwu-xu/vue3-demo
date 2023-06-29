import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/Layout.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/demo',
    name: 'demo',
    component: Layout,
    redirect: '/demo/page1',
    meta: {
      title: 'demo',
      breadcrumb: false
    },
    children: [
      {
        path: 'page1',
        name: 'page1',
        component: () => import('@/views/demo/page1.vue'),
        meta: {
          title: 'page1'
        }
      },
      {
        path: 'page2',
        name: 'page2',
        component: () => import('@/views/demo/page2.vue'),
        meta: {
          title: 'page2'
        }
      },
      {
        path: 'page3',
        name: 'page3',
        component: () => import('@/views/demo/page3.vue'),
        meta: {
          title: 'page3'
        }
      }
    ]
  }
]

export default routes
