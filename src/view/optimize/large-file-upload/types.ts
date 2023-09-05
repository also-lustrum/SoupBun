export interface InstantUpload {
  shouldUpload: boolean
  uploadList: string[]
}

export interface ChunkListItem {
  chunk: Blob,
  size: number,
  chunkHash: string,
  fileHash: string,
  index: number
  percentage: number,
  status?: number
}
