import { createRouter, createWebHashHistory } from 'vue-router'
import { RouteRecordRaw } from 'vue-router'
import { optimize, directive, feature } from './module'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/large-file-upload'
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
