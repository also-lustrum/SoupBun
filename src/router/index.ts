import { createRouter, createWebHashHistory } from 'vue-router'
import { RouteRecordRaw } from 'vue-router'
import { optimize, directive, feature, interestingCss } from './module'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/large-file-upload'
  },
  ...optimize,
  ...directive,
  ...feature,
  ...interestingCss
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

export default router
