<template>
  <div class="page">
    <input
      type="file"
      @change="chooseFile"
    />
    <button @click="upload">上传</button>
  </div>
</template>

<script lang="ts" setup>
import SparkMD5 from 'spark-md5'
import { verifyUpload, uploadChunk } from './api/upload'
import type { InstantUpload, ChunkListItem } from './types'

// 文件详情
const fileInfo = ref<File>()
// 文件hash
const hash = ref('')
// 分片后文件列表
const chunkList = ref<ChunkListItem[]>([])
// 请求列表
const requestList = ref<ChunkListItem[]>([])
const isPaused = ref(false)
// 请求控制器
const controller = ref<AbortController | null>(null)

const chooseFile = (e: any) => {
  const [file] = e.target.files
  if (!file) return
  fileInfo.value = file
}

const upload = async () => {
  if (!fileInfo.value) return
  hash.value = await calculateHash()
  // 判断文件是否可以秒传
  const { shouldUpload, uploadList } = await instantUpload(fileInfo.value.name, hash.value)
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
  // 上传分片
  uploadChunks(uploadList)
}

/**
 * 文件分片
 * @params file 文件
 * @params size 每片大小
 * @return fileChunkList 分片后文件
 */
function createFileChunk(file: File, size: number) {
  const fileChunkList = []
  let cur = 0
  while (cur < file.size) {
    fileChunkList.push({ file: file.slice(cur, cur + size) })
    cur += size
  }
  return fileChunkList
}

/** 计算文件hash */
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
async function instantUpload(fileName: string, fileHash: string): Promise<InstantUpload> {
  const { data } = await verifyUpload(JSON.stringify({ fileName, fileHash }))
  return data
}

// 上传文件切片
async function uploadChunks(uploadedList: string[]) {
  if (controller.value) {
    controller.value = null
  }
  controller.value = new AbortController()
  requestList.value = chunkList.value.filter((chunk) => !uploadedList.includes(chunk.chunkHash))
  await sendRequest(requestList.value)
}
const Status = { wait: 1, error: 2, done: 3, fail: 4 }

// 控制请求发送以及上传错误处理
function sendRequest(form: ChunkListItem[], max = 4) {
  return new Promise((resolve) => {
    const len = form.length
    let counter = 0 // 发送成功的请求数
    const retryArr: number[] = []
    form.forEach((item) => (item.status = Status.wait))
    const start = async () => {
      let Err = false
      while (counter < len && !isPaused.value && !Err) {
        // 创建请求列表
        let requestArr: Promise<void>[] = []
        // 并发控制请求
        for (let i = 0; i < max; i++) {
          const idx = form.findIndex((item) => item.status === Status.wait || item.status === Status.error)
          if (idx === -1) return (Err = true)
          form[idx].status = Status.done
          let { index } = form[idx]
          if (!controller.value) return
          requestArr.push(
            uploadChunk(form[idx], onProgress(chunkList.value[index]), controller.value.signal)
              .then(() => {
                form[idx].status = Status.done
                counter++
                if (counter === len) {
                  resolve('')
                }
              })
              .catch(() => {
                form[idx].status = Status.error
                if (typeof retryArr[index] !== 'number') {
                  if (!isPaused.value) {
                    console.log(`第 ${index} 个片段上传失败，系统准备重试`)
                    retryArr[index] = 0
                  }
                }
                // 次数累加
                retryArr[index]++
                if (retryArr[index] > 3) {
                  console.log(`第 ${index} 个片段重试多次无效，系统准备放弃上传`)
                  form[idx].status = Status.fail
                  form[idx].percentage = 0
                  // 终止当前所有请求
                  Err = true
                  requestArr.forEach(() => {
                    if (!controller.value) return
                    controller.value.abort()
                  })
                  requestArr = []
                }
              })
          )
          console.log(requestArr)
          await Promise.all(requestArr)
        }
      }
    }
    start()
  })
}
// 上传进度监听函数
function onProgress(item: ChunkListItem) {
  return (e: ProgressEvent) => {
    item.percentage = parseInt(String((e.loaded / e.total) * 100))
  }
}
</script>

<style scoped lang="scss">
.page {
  width: 100vw;
  height: 100vh;
  padding: 80px;
}
</style>

