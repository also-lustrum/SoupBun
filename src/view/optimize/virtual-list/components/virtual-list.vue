<template>
  <div
    class="container"
    ref="containerRef"
    :style="containerStyle"
    @scroll="handleScroll"
  >
    <div ref="list-container" :style="listStyle">
      <div
        v-for="(item, index) in visibleList.list"
        :key="visibleList.startIndex + index"
        :style="getItemStyle(visibleList.startIndex + index)"
      >
        <slot
          :event="item"
          :item="item"
          :index="visibleList.startIndex + index"
        ></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { STYLE_LIST } from './constants'
import { ContainerStyle, VisibleList } from './index.ts'
import { CSSProperties } from 'vue'

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
  },
  unit: {
    type: String,
    default: 'px'
  }
})

const containerRef = ref<HTMLElement | null>(null)

const containerStyle = ref<ContainerStyle>({ width: '', height: '' })
const listStyle = ref()

const visibleList = reactive<VisibleList>({
  list: [],
  startIndex: 0
})

const init = async () => {
  await setTimeout(() => {}, 0)
  setDomStyle()
  scrollRender(0)
}
// 设置基础样式
const setDomStyle = () => {
  containerStyle.value = {
    width:
      typeof props.width === 'string'
        ? props.width
        : `${props.width}${props.unit}`,
    height:
      typeof props.width === 'string'
        ? props.height
        : `${props.height}${props.unit}`
  }
  listStyle.value = {
    ...STYLE_LIST,
    height: `${props.list.length * gainNumberSize(props.itemHeight)}${
      props.unit
    }`
  }
}
// 获取每一项基样式
const getItemStyle = (index: number) => {
  const top = `${index * gainNumberSize(props.itemHeight)}${props.unit}`
  return {
    position: 'absolute',
    left: 0,
    top,
    width: '100%',
    minHeight:
      typeof props.itemHeight === 'string'
        ? props.itemHeight
        : `${props.itemHeight}${props.unit}`
  } as CSSProperties
}

onMounted(() => init())

// 渲染可视列表
const scrollRender = (scrollTop: number) => {
  const indexResult = getVisibleRange(scrollTop)
  const { start, end } = indexResult
  if (!end) return
  visibleList.list = []
  visibleList.startIndex = start
  for (let i = start; i < end; i++) {
    visibleList.list.push(props.list[i])
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
  index.end = height / itemHeight + index.start
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
