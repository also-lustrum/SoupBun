<template>
  <div class="page">
    <virtualList
      :list="listInfo.list"
      :width="800"
      :height="500"
      :itemHeight="50"
      v-slot="{ item, index }"
    >
      {{ item }} - {{ index }}
    </virtualList>
  </div>
</template>

<script setup lang="ts">
import virtualList from './components/virtual-list.vue'

interface ListInfo {
  list: { id: number; name: string }[]
}
const listInfo = reactive<ListInfo>({
  list: []
})

const getListApi = () => {
  const list = []
  for (let i = 0; i < 100; i++) {
    list.push({
      id: i,
      name: `i is ${i}`
    })
  }
  return list
}
const getList = () => {
  const res = getListApi()
  listInfo.list = res
}

onMounted(() => {
  getList()
})
</script>

<style lang="scss" scoped>
.page {
  width: 100vw;
  height: 100vh;
}
</style>
