<template>
  <div
    class="container"
    ref="container"
    @scroll="scrollHandle"
  >
    <div
      class="list-container"
      :style="listStyle"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  // 每行元素高度
  itemHeight: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  // 每屏显示条数
  size: {
    type: Number,
    default: 10
  },
  // 预加载n屏数据
  page: {
    type: Number,
    default: 1
  }
})
const emits = defineEmits(['indexChange'])

const container = ref<HTMLElement | null>(null)

// 起始点
const startIndex = ref<number>(0)

// 结束索引
const endIndex = computed(() => {
  let index = 0
  if (startIndex.value > props.size * props.page) {
    index = startIndex.value
  }
  return index + props.size + props.size * props.page
})

// 计算样式
const listStyle = computed(() => {
  let index = 0
  if (startIndex.value > props.size * props.page) {
    index = startIndex.value - props.size * props.page
  }
  const bottom = props.total - endIndex.value
  return {
    paddingTop: index * props.itemHeight + 'px',
    paddingBottom: bottom * props.itemHeight + 'px'
  }
})

watch([startIndex, endIndex], (val) => {
  let index = 0
  const startIndex = val[0]
  if (startIndex > props.size * props.page) {
    index = startIndex - props.size * props.page
  }
  emits('indexChange', index, val[1])
})

// 重置起始点
watch(
  () => props.total,
  (newValue, oldValue) => {
    if (newValue < oldValue) {
      startIndex.value = 0
    }
  }
)

// 容器滚动
const scrollHandle = () => {
  // 获取 startIndex
  window.requestAnimationFrame(() => {
    const scrollTop = container.value?.scrollTop || 0
    startIndex.value = ~~(scrollTop / props.itemHeight)
  })
}
</script>

<style lang="scss" scoped>
.container {
  overflow-x: hidden;
  overflow-y: auto;
  width: 100%;
  height: 100%;
  border: 1px solid skyblue;
}
.list-container {
  width: 100%;
}
</style>

