<template>
  <div class="container">
    <div class="list-container">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  // 每行元素高度
  itemHeight: {
    type: Number,
    default: 160
  },
  // 数据总数
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
</script>

<style lang="scss" scoped>
.container {
  overflow-x: hidden;
  overflow-y: auto;
  width: 100%;
  height: 100%;
  border: 1px solid blue;
}
.list-container {
  width: 100%;
}
</style>
