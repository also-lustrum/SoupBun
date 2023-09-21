<template>
  <div class="page">
    <audio
      controls
      src="/src/assets/music.mp3"
    />
    <div class="container">
      <ul>
        <li>Lorem, ipsum dolor.</li>
        <li>Voluptates, aliquid in.</li>
        <li>Iusto, eveniet pariatur?</li>
        <li>Iusto, soluta officiis.</li>
        <li class="active">In, dolores assumenda.</li>
        <li>Natus, aut quo!</li>
        <li>Reprehenderit, praesentium cum.</li>
        <li>Sunt, officia architecto!</li>
        <li>Minus, necessitatibus possimus.</li>
        <li>Officiis, ullam odit?</li>
        <li>Non, vitae blanditiis.</li>
        <li>Vel, cupiditate sapiente.</li>
        <li>Libero, necessitatibus facere.</li>
        <li>Commodi, quae ducimus!</li>
        <li>Impedit, maiores ex.</li>
        <li>In, iste voluptas!</li>
        <li>Dolorum, sit sint.</li>
        <li>Placeat, unde sint!</li>
        <li>Sunt, sed reprehenderit.</li>
        <li>Optio, fugiat doloribus.</li>
        <li>Possimus, earum soluta.</li>
        <li>Soluta, natus nobis.</li>
        <li>Libero, nam perspiciatis.</li>
        <li>Nihil, at dolores!</li>
        <li>Perferendis, provident voluptate.</li>
        <li>Quo, dolore ad!</li>
        <li>Adipisci, atque reprehenderit.</li>
        <li>Rem, illo magnam?</li>
        <li>Voluptas, labore tempore?</li>
        <li>Quo, rem quos.</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
/**
 * 解析歌词字符串
 * @return 歌词的数组对象 { time: 开始时间, words: 结束时间 }[]
 *  */
function parseLre() {}
</script>

<style scoped lang="scss">
.page {
  width: 100%;
  height: 100vh;
  background: #000;
  color: #666;
  text-align: center;
}

audio {
  width: 450px;
  margin: 30px 0;
}

.container {
  overflow: hidden;
  height: 420px;
  ul {
    transition: 0.2s;
    li {
      height: 35px;
      line-height: 35px;
      transition: 1s;
    }
    .active {
      color: #fff;
      transform: scale(1.2);
    }
  }
}
</style>
