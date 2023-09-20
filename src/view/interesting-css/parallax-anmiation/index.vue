<template>
  <div class="container">
    <div class="item" v-for="(, index) in 5">
      <img :src="`/src/assets/bg${index + 1}.jpg`" />
    </div>
  </div>
</template>

<script lang="ts" setup>
</script>

<style scoped lang="scss">
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-template:
    'A A B'
    'C D B'
    'C E E';
    gap: 10px
  ;
  width: 300px;
  height: 300px;
  margin: 100px auto 0;
  --r: 360deg;
  animation: rotation 10s infinite linear;
  .item {
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid;
    img {
      width: 260%;
      height: 260%;
      object-fit: cover;
      --r: -360deg;
      animation: rotation 10s infinite linear;
    }
    &:nth-child(1) {
      grid-area: A;
    }
    &:nth-child(2) {
      grid-area: B;
    }
    &:nth-child(3) {
      grid-area: C;
    }
    &:nth-child(4) {
      grid-area: D;
    }
    &:nth-child(5) {
      grid-area: E;
    }
  }
}

@keyframes rotation {
  to {
    transform: rotate(var(--r));
  }
}
</style>
