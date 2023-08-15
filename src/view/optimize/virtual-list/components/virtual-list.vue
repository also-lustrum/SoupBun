<template>
  <div
    class="container"
    ref="containerRef"
    :style="containerStyle"
    @scroll="handleScroll"
  >
    <div ref="list-container" :style="listStyle">
      <div v-for="(item, index) in visibleList" :key="index" :style="itemStyle">
        <slot :event="item" :item="item" :index="index"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { STYLE_LIST } from './constants'
import { ContainerStyle } from './index.ts'

const props = defineProps({
  list: {
    type: Array,
    required: true
  },
  width: {
    type: [Number, String],
    required: true
  },
  height: {
    type: [Number, String],
    required: true
  },
  itemHeight: {
    type: [Number, String],
    required: true
  }
})

/**
 * bug
 * 无法持续添加
 * index 不变
 */

const containerRef = ref<HTMLElement | null>(null)

const containerStyle = ref<ContainerStyle>({ width: '', height: '' })
const listStyle = ref()
const itemStyle = ref()

const visibleList = ref<any[]>([])

const init = async () => {
  await setTimeout(() => {}, 0)
  setDomStyle()
  scrollRender(0)
}

const setDomStyle = () => {
  containerStyle.value = {
    width: typeof props.width === 'string' ? props.width : `${props.width}px`,
    height: typeof props.width === 'string' ? props.height : `${props.height}px`
  }
  listStyle.value = {
    ...STYLE_LIST
  }
  itemStyle.value = {
    minHeight:
      typeof props.itemHeight === 'string'
        ? props.itemHeight
        : `${props.itemHeight}px`
  }
}

onMounted(() => init())

const scrollRender = (scrollTop: number) => {
  const indexResult = getVisibleRange(scrollTop)
  const { start, end } = indexResult
  console.log(start, end)
  if (!end) return
  visibleList.value.length = 0
  for (let i = start; i < end; i++) {
    visibleList.value.push(props.list[i])
  }
}
// 获取 number 类型尺寸
function gainNumberSize(size: string | number): number {
  if (typeof size === 'number') return size
  if (typeof size === 'string') {
    if (size.match(/\d+/g)) return Number(size.match(/\d+/g)?.[0]) ?? 0
  }
  return 0
}
// 获取可视区域的列表索引
function getVisibleRange(scrollTop: number): { start: number; end: number } {
  const index = {
    start: 0,
    end: 0
  }
  const height = gainNumberSize(props.height)
  const itemHeight = gainNumberSize(props.itemHeight)
  if (!height || !itemHeight) return index
  index.start = ~~(scrollTop / itemHeight)
  index.end = height / itemHeight + index.start + 5
  return index
}

const handleScroll = () => {
  if (!containerRef.value) return
  const scrollTop = containerRef.value['scrollTop']
  if (!scrollTop) return
  scrollRender(scrollTop)
}
</script>

<style lang="scss" scoped>
.container {
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 0;
  }
}
</style>
