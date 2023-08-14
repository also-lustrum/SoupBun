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
  {
    /**
     * 虚拟列表-简单
     * */
    path: '/virtual-list-easy',
    component: () => import('@/view/virtual-list-easy/index.vue')
  },
  {
    /**
     * 虚拟列表
     * */
    path: '/virtual-list',
    component: () => import('@/view/virtual-list/index.vue')
  },
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

export default router
