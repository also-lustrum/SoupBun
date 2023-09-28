<template>
  <div class="page">
    <div class="loading">
      <span
        v-for="(item, index) in 8"
        :style="{
          '--i': index
        }"
      ></span>
    </div>
    <div class="text">
      <span
        v-for="(item, index) in text"
        :style="{ '--i': index }"
      >
        {{ item }}
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
const text = ['L', 'o', 'a', 'd', 'i', 'n', 'g', '.', '.', '.']
</script>

<style scoped lang="scss">
.page {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: #000;
  .loading {
    filter: contrast(15);
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 300px;
    height: 300px;
    background-color: #000;
    span {
      position: absolute;
      left: 50px;
      transform-origin: 100px center;
      transform: rotate(calc(360deg / 8 * var(--i)));
      width: 30px;
      height: 30px;
      background-color: #fff;
      border-radius: 50%;
      animation: show 3s infinite;
      filter: blur(5px);
    }
  }
  .text {
    display: flex;
    font-size: 50px;
    color: #fff;
    padding-left: 10px;
    span {
      animation: upDown 1.5s ease-in-out infinite;
      animation-delay: calc(0.1s * var(--i));
    }
  }
}
@keyframes show {
  0% {
    transform: rotate(0deg) translateX(80px);
  }
  50%,
  100% {
    transform: rotate(calc(360deg / 8 * var(--i)));
  }
  100% {
    transform: rotate(360deg) translateX(80px);
  }
}

@keyframes upDown {
  0% {
    transform: translateY(0px);
  }
  20% {
    transform: translateY(-24px);
  }
  40%,
  100% {
    transform: translateY(0px);
  }
}
</style>
