<template>
  <div class="watermark_container" ref="paeentRef">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import useWatermarkBg from '../hooks/useWatermarkBg';

const props = defineProps({
  text: {
    type: String,
    required: true,
    default: 'watemark'
  },
  fontSize: {
    type: Number,
    default: 30
  },
  gap: {
    type: Number,
    default: 10
  }
})

const bg = useWatermarkBg(props)
const paeentRef = ref<HTMLElement | null>(null)
let div = null as HTMLElement | null
/** 重置水印 */
function resetWatermack() {
  if(!paeentRef.value) return;
  if(!bg.value) return
  if(div) {
    div.remove();
  }
  const { base64, size } = bg.value
  div = document.createElement('div')
  div.style.position = 'absolute'
  div.style.backgroundImage = `url(${base64})`
  div.style.backgroundSize = `${size}px ${size}px`
  div.style.backgroundRepeat = 'repeat'
  div.style.zIndex = '9999'
  div.style.inset = '0'
  paeentRef.value.appendChild(div)
}

onMounted(() => {
  resetWatermack()
  if(!paeentRef.value) return;
  ob.observe(paeentRef.value, {
    childList: true,
    subtree: true,
    attributes: true
  })
})

const ob = new MutationObserver((entries) => {
  for(const entry of entries) {
    // 删除 dom 处理
    for (const dom of entry.removedNodes) {
      if(dom === div) return resetWatermack();
    }
    // 修改 dom 处理
    if(entry.target === div) return resetWatermack();
  }
})
</script>

<style scoped lang="scss">
.watermark_container {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
