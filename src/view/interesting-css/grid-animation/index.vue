<template>
  <div class="page">
    <div class="container">
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page {
  overflow: hidden;
  width: 100%;
  height: 100vh;
  background-color: #23262d;
}
.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 10px;
  width: 400px;
  height: 400px;
  margin: 50px auto 0;
  transition: all 1s;
}

@for $i from 0 to 9 {
  .item:nth-child(#{$i + 1}) {
    background: hsl($i * 40%, 100%, 74%);
  }
  .container:has(.item:nth-child(#{$i + 1}):hover) {
    $r: floor($i / 3 + 1);
    $c: $i % 3 + 1;
    $arr: 1fr 1fr 1fr;
    $rows: set-nth($arr, $r, 2fr);
    $columns: set-nth($arr, $c, 2fr);
    grid-template-columns: $columns;
    grid-template-rows: $rows;
  }
}
</style>

