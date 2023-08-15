import { createRouter, createWebHashHistory } from 'vue-router'
import { RouteRecordRaw } from 'vue-router'

const optimize = [
  {
    // 虚拟列表-简单
    path: '/virtual-list-easy',
    component: () => import('@/view/optimize/virtual-list-easy/index.vue')
  },
  {
    // 虚拟列表
    path: '/virtual-list',
    component: () => import('@/view/optimize/virtual-list/index.vue')
  },
]

const directive = [
  {
    // 点击复制
    path: '/click-copy',
    component: () => import('@/view/directive/click-copy/index.vue')
  },
  {
    // 盒子观察者
    path: '/observe-box',
    component: () => import('@/view/directive/observe-box/index.vue')
  },
]

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/virtual-list-easy'
  },
  ...optimize,
  ...directive
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

export default router
