// 有意思的 css
export const interestingCss = [
  {
    // 打字动画效果
    path: '/typewriting-animation',
    component: () => import('@/view/interesting-css/typewriting-animation/index.vue')
  },
  {
    // 上升的泡泡
    path: '/rising-bubble',
    component: () => import('@/view/interesting-css/rising-bubble/index.vue')
  },
  {
    // 文字交融展开
    path: '/text-merge',
    component: () => import('@/view/interesting-css/text-merge/index.vue')
  },
  {
    // 网格布局动画
    path: '/grid-animation',
    component: () => import('@/view/interesting-css/grid-animation/index.vue')
  }
]
