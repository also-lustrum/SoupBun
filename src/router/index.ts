import { createRouter, createWebHashHistory } from 'vue-router'
import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: () => import('@/view/home/index.vue')
  },
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

export default router
