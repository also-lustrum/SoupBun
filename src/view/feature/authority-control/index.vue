<template>
  <div class="page">
    <authorityControl permission="sys:user:view">
      <button>查看</button>
    </authorityControl>
    <authorityControl permission="sys:user:add">
      <button>新增</button>
    </authorityControl>
    <authorityControl>
      <template #default="{ userPermissions }">
        <button :style="{ color: userPermissions.includes('sys:user:edit') ? 'red' : 'pink' }">修改</button>
      </template>
    </authorityControl>
    <authorityControl permission="sys:user:remove">
      <button>删除</button>
    </authorityControl>
  </div>
</template>

<script setup lang="ts">
import authorityControl from './components/authority-control.vue'
</script>

<style scoped lang="scss">
.page {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
}
button {
  margin-left: 30px;
}
</style>
