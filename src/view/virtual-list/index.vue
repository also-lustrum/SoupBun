<template>
  <div class="page">
    <virtual-list :total="list.length">
      <div class="v-list-item" v-for="item in list" :key="item.id">
        {{ item.name }}
      </div>
    </virtual-list>
  </div>
</template>

<script setup lang="ts">
import virtualList from './components/virtual-list.vue'

interface List {
  id: number
  name: string
}
const list = ref<List[]>([])
const getList = () => {
  for (let i = 1; i <= 100; i++) {
    list.value.push({
      id: i,
      name: `i is ${i}`
    })
  }
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
