<template>
  <div class="container">
    <span class="text">hellow world</span>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100vh;
  background-color: #333;
  padding-top: 100px;
  text-align: center;
  filter: contrast(30);
  .text {
    font-size: 100px;
    color: #fff;
    animation: showup 3s forwards;
  }
}

@keyframes showup {
  from {
    letter-spacing: -50px;
    filter: blur(10px);
  }
  to {
    letter-spacing: 10px;
    filter: blur(2px);
  }
}
</style>
