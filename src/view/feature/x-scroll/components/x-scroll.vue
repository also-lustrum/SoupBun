<template>
  <div class="scroll-container" v-scroll-ob="handleChange">
    <div class="v-scroll">
      <div class="content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import observeSize from '@/directive/observeSize'

const vScrollOb = { ...observeSize }

const scrollSize = reactive({
  w: 0,
  h: 0
})
const handleChange = (size: any) => {
  scrollSize.w = size.width
  scrollSize.h = size.height
}
</script>

<style scoped>
.scroll-container {
  width: 100%;
  height: 100%;
}
.v-scroll {
  position: relative;
  width: calc(v-bind('scrollSize.h') * 1px);
  height: calc(v-bind('scrollSize.w') * 1px);
  overflow: auto;
  transform-origin: 0 0;
  transform: translateY(calc(v-bind('scrollSize.h') * 1px)) rotate(-90deg);
}
.v-scroll::-webkit-scrollbar {
  width: 0;
}
.content {
  position: absolute;
  left: 100%;
  height: calc(v-bind('scrollSize.h') * 1px);
  transform-origin: 0 0;
  transform: rotate(90deg);
}
</style>
