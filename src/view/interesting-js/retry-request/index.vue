<template>
  可以重试的请求
</template>
<script setup lang="ts">
/**
 * 可以重试的请求
 * @param url 请求地址
 * @param retryFrequency 重试次数
 */
function retryRequest(url: string, retryFrequency = 5) {
  return fetch(url).catch((err) => {
    retryFrequency <= 0 ? Promise.reject(err) : retryRequest(url, retryFrequency--)
  })
}
retryRequest('https://xxxxxxxxxx')

</script>
