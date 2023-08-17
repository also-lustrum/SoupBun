// 性能优化
export const optimize = [
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
  {
    // 大文件上传
    path: '/large-file-upload',
    component: () => import('@/view/optimize/large-file-upload/index.vue')
  },
]
