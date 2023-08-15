import { createRouter, createWebHashHistory } from 'vue-router'
import { RouteRecordRaw } from 'vue-router'
import { optimize, directive, feature } from './module'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/virtual-list-easy'
  },
  ...optimize,
  ...directive,
  ...feature
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

export default router
