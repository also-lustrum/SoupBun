<template>
  <div class="page">
    <div class="bubble"></div>
  </div>
</template>

<style lang="scss" scoped>
.page {
  width: 100%;
  height: 100vh;
  background-color: #666;
}
.bubble {
  position: absolute;
  width: 100px;
  height: 100px;
  animation:
    animateBubble 10s linear infinite,
    sideWays 2s ease-in-out infinite alternate;
  border-radius: 50%;
  box-shadow:
    0 20px 30px rgb(58 81 112 / 10%),
    inset 0px 10px 30px 5px rgb(255 255 255 / 70%);
  &::before {
    content: '';
    position: absolute;
    left: 5px;
    width: 90px;
    height: 90px;
    background: radial-gradient(
      ellipse at center,
      rgb(203 238 255 / 30%),
      rgba(255, 255, 255, 0) 70%
    );
    border-radius: 50%;
    box-shadow: inset 0 20px 30px rgba(255, 255, 255, 0.3);
  }
}

@keyframes animateBubble {
  0% {
    margin-top: 90vh;
  }
  100% {
    margin-top: -10%;
  }
}

@keyframes sideWays {
  0% {
    margin-left: 0px;
  }
  100% {
    margin-left: 50px;
  }
}
</style>
