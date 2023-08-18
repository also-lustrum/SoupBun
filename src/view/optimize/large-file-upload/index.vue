<template>
  <div class="page">
    <input type="file" @change="chooseFile" />
    <button @click="upload">上传</button>
  </div>
</template>

<script lang="ts" setup>
import SparkMD5 from 'spark-md5'
import { verifyUpload } from './api/upload'
import type { InstantUpload, ChunkListItem } from './types'

// 文件详情
const fileInfo = ref<File>()
// 文件hash
const hash = ref('')
// 分片后文件列表
const chunkList = ref<ChunkListItem[]>([])

const chooseFile = (e: any) => {
  const [file] = e.target.files
  if (!file) return
  fileInfo.value = file
}

const upload = async () => {
  if (!fileInfo.value) return
  hash.value = await calculateHash()
  // 判断文件是否可以秒传
  const { shouldUpload, uploadList } = await instantUpload(
    fileInfo.value.name,
    hash.value
  )
  // 文件已存在 无需上传
  if (!shouldUpload) return
  // 文件需要上传 开始分片
  const chunkFileList = createFileChunk(fileInfo.value, 3 * 1024 * 1024)
  chunkList.value = chunkFileList.map(({ file }, index) => ({
    chunk: file,
    size: file.size,
    chunkHash: `${hash.value} - ${index}`,
    fileHash: hash.value,
    index,
    percentage: uploadList.includes(`${hash.value} - ${index}`) ? 100 : 0
  }))
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
    reader.onload = (e: any) => {
      spark.append(e.target?.result)
      resolve(spark.end())
    }
  })
}

/**
 * 判断文件是可以秒传
 * @params fileName 文件名
 * @params fileHash 文件hash
 * @return shouldUpload 文件是否需要上传 true: 需要 false: 不需要
 * @return uploadList 上传文件列表
 */
async function instantUpload(
  fileName: string,
  fileHash: string
): Promise<InstantUpload> {
  const { data } = await verifyUpload(JSON.stringify({ fileName, fileHash }))
  return data
}
</script>

<style scoped lang="scss">
.page {
  width: 100vw;
  height: 100vh;
  padding: 80px;
}
</style>
