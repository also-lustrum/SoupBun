<template>
  <div class="container" :style="containerStyle" @scroll="handleScroll">
    <div ref="list-container" :style="listStyle">
      <div v-for="(item, index) in list" :key="index">
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
  }
})

const containerStyle = ref<ContainerStyle>({ width: '', height: '' })
const listStyle = ref()

const init = () => {
  setDomStyle()
}

const setDomStyle = () => {
  containerStyle.value = {
    width: typeof props.width === 'string' ? props.width : `${props.width}px`,
    height: typeof props.width === 'string' ? props.height : `${props.height}px`
  }
  listStyle.value = {
    ...STYLE_LIST
  }
}

onMounted(() => init())

const handleScroll = () => {}
</script>

<style lang="scss" scoped>
.container {
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 0;
  }
}
</style>
