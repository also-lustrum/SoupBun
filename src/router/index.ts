import { createRouter, createWebHashHistory } from 'vue-router'
import { RouteRecordRaw } from 'vue-router'
import { optimize, directive, feature, interestingCss, interestingJs } from './module'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/watermark-text'
  },
  ...optimize,
  ...directive,
  ...feature,
  ...interestingCss,
  ...interestingJs
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

export default router
