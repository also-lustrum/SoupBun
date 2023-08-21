<template>
  <div class="page">
    <div class="text">对不起，我爱你</div>
  </div>
</template>

<style lang="scss" scoped>
.page {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
}
.text {
  position: relative;
  font-size: 32px;
  font-family: monospace;
  &::before,
  &::after {
    content: '';
    position: absolute;
    inset: 0;
  }
  &::before {
    width: 100%;
    background-color: #fff;
    animation:
      stepsShowText 3s steps(7) 500ms forwards,
      delText 2s steps(4) 4.5s forwards;
  }
  &::after {
    width: 3px;
    height: 100%;
    left: 0;
    background-color: #cfcfcf;
    animation:
      stepsShowText 3s steps(7) 500ms forwards,
      flicker 500ms infinite,
      delText 2s steps(4) 4.5s forwards;
  }
}

@keyframes stepsShowText {
  100% {
    left: 100%;
  }
}

@keyframes flicker {
  0%,
  100% {
    background-color: transparent;
  }
  50% {
    background-color: #cfcfcf;
  }
}

@keyframes delText {
  0% {
    left: 100%;
  }
  100% {
    left: 6ch;
  }
}
</style>
