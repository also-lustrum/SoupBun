import { createRouter, createWebHashHistory } from 'vue-router'
import { RouteRecordRaw } from 'vue-router'
import { optimize, directive, feature, interestingCss } from './module'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/watermark-text'
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