<template>
  <div class="page">
    <input type="file" @change="chooseFile" />
    <button @click="upload">上传</button>
  </div>
</template>

<script lang="ts" setup>
import SparkMD5 from 'spark-md5'
import { verifyUpload } from './api/upload'

const fileInfo = ref<File>()
const hash = ref('')

const chooseFile = (e: any) => {
  const [file] = e.target.files
  if (!file) return
  fileInfo.value = file
}

const upload = async () => {
  if (!fileInfo.value) return
  const chunkFileList = createFileChunk(fileInfo.value, 3 * 1024 * 1024)
  hash.value = await calculateHash()
  await verifyUpload(fileInfo.value.name, hash.value)
}

// 文件分片
function createFileChunk(file: File, size: number) {
  const fileChunkList = []
  let cur = 0
  while (cur < file.size) {
    fileChunkList.push({ file: file.slice(cur, cur + size) })
    cur += size
  }
  return fileChunkList
}

// 计算hash
function calculateHash(): Promise<string> {
  return new Promise((resolve) => {
    const spark = new SparkMD5.ArrayBuffer()
    const reader = new FileReader()
    if (!fileInfo.value) return
    const file = fileInfo.value
    const size = file.size
    let offset = 2 * 1024 * 1024
    let chunks = [file.slice(0, offset)]

    let cur = offset
    while (cur < size) {
      // 最后一块全部加进来
      if (cur + offset >= size) {
        chunks.push(file.slice(cur, cur + offset))
      } else {
        // 中间的 前中后去两个字节
        const mid = cur + offset / 2
        const end = cur + offset
        chunks.push(file.slice(cur, cur + 2))
        chunks.push(file.slice(mid, mid + 2))
        chunks.push(file.slice(end - 2, end))
      }
      // 前取两个字节
      cur += offset
    }

    reader.readAsArrayBuffer(new Blob(chunks))
    reader.onload = (e) => {
      spark.append(e.target.result)
      resolve(spark.end())
    }
  })
}
</script>

<style scoped lang="scss">
.page {
  width: 100vw;
  height: 100vh;
  padding: 80px;
}
</style>
