<template>
  <div class="page">
    <virtual-list
      :total="listInfo.total"
      :item-height="150"
      @index-change="indexChange"
    >
      <div class="v-list-item" v-for="item in lastData" :key="item.id">
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
interface ListInfo {
  list: List[]
  total: number
  pageSize: number
  pageNum: number
}

const startIndex = ref(0)
const endIndex = ref(10)

const listInfo = reactive<ListInfo>({
  list: [],
  total: 100,
  pageSize: 100,
  pageNum: 1
})

const getListApi = (params: { pageSize: number; pageNum: number }) => {
  console.log(params)
  const list = []
  // for (
  //   let i = params.pageNum * params.pageSize;
  //   i <= params.pageNum * params.pageSize + params.pageSize;
  //   i++
  // ) {
  //   list.push({
  //     id: i,
  //     name: `i is ${i}`
  //   })
  // }
  for (let i = 0; i < 100; i++) {
    list.push({
      id: i,
      name: `i is ${i}`
    })
  }
  return list
}
const getList = () => {
  const params = {
    pageSize: listInfo.pageSize,
    pageNum: listInfo.pageNum
  }
  const res = getListApi(params)
  listInfo.list = res
}

onMounted(() => {
  getList()
})

// 索引改变
const indexChange = (start: number, end: number) => {
  startIndex.value = start
  endIndex.value = end
}

// 截取显示的数据
const lastData = computed(() => {
  return listInfo.list.slice(startIndex.value, endIndex.value)
})
</script>

<style lang="scss" scoped>
.page {
  width: 100vw;
  height: 100vh;
}
// 无关紧要的 item 样式
.v-list-item {
  width: 100%;
  height: 150px;
  line-height: 50px;
  border: 1px solid pink;
  padding-left: 30px;
}
</style>
