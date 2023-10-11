<template>
  <div class="page">
    <ul
      id="list"
      ref="listRefs"
      class="list"
      @dragstart="dragstart"
      @dragenter.prevent="dragenter"
      @dragover.prevent
      @dragend="dragend"
    >
      <li
        v-for="(item, index) in 6"
        :key="index"
        draggable="true"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
const listRefs = ref<HTMLElement | null>(null)
// 当前拖拽dom
const currentNode = ref<Element | null>(null)

const dragstart = (e: DragEvent) => {
  const target = e.target as unknown as Element
  setTimeout(() => {
    target.classList.add('moving')
    currentNode.value = target
  })
}

const dragenter = (e: DragEvent) => {
  const target = e.target as unknown as Element
  if (!currentNode.value || currentNode.value === target) return
  if (!listRefs.value) return
  const lis = [...listRefs.value.children]
  const targetIndex = lis.indexOf(target)
  const currentNodeIndex = lis.indexOf(currentNode.value)
  if (targetIndex < 0) return
  // 换位参照
  const referenceNode = targetIndex > currentNodeIndex ? lis[targetIndex].nextElementSibling : lis[targetIndex]
  listRefs.value.insertBefore(lis[currentNodeIndex], referenceNode)
}

const dragend = (e: DragEvent) => {
  const target = e.target as unknown as Element
  target.classList.remove('moving')
}
</script>

<style scoped lang="scss">
.page {
  display: grid;
  place-items: center;
  width: 100%;
  height: 100vh;
  .list {
    cursor: pointer;
    width: 500px;
    li {
      width: 100%;
      height: 50px;
      margin-top: 10px;
      background-color: pink;
      text-align: center;
      line-height: 50px;
      font-size: 24px;
      color: #fff;
      &:first-child {
        margin-top: 0;
      }
      &:hover {
        cursor: pointer;
      }
    }
    .moving {
      background-color: transparent;
      color: transparent;
      border: 1px solid #000;
    }
  }
}
</style>
