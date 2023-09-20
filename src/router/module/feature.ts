export const feature = [
  {
    // 横向滚动
    path: '/x-scroll',
    component: () => import('@/view/feature/x-scroll/index.vue')
  },
  {
    // 文字水印
    path: '/watermark-text',
    component: () => import('@/view/feature/watermark-text/index.vue')
  },
]
