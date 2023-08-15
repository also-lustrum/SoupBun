<template>
  <div class="container">
    <x-scroll>
      <div class="card-list">
        <div class="card"><img src="@/assets/bg1.jpg" /></div>
        <div class="card"><img src="@/assets/bg2.jpg" /></div>
        <div class="card"><img src="@/assets/bg3.jpg" /></div>
        <div class="card"><img src="@/assets/bg4.jpg" /></div>
        <div class="card"><img src="@/assets/bg5.jpg" /></div>
      </div>
    </x-scroll>
  </div>
</template>

<script setup lang="ts">
import XScroll from './components/x-scroll.vue'
</script>

<style scoped>
.container {
  width: 100%;
  height: 100vh;
}
.card-list {
  display: flex;
  min-width: 100%;
  height: 100%;
}
.card {
  width: 100vw;
  height: 100%;
}

img {
  width: 100%;
  height: 100%;
}
</style>
