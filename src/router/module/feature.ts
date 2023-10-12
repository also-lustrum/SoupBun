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
  {
    // 权限控制
    path: '/authority-control',
    component: () => import('@/view/feature/authority-control/index.vue')
  },
  {
    // 拖拽列表
    path: '/drag-list',
    component: () => import('@/view/feature/drag-list/index.vue')
  },
  {
    path: '/flip-practice',
    component: () => import('@/view/feature/flip-practice/index.vue')
  },
]
