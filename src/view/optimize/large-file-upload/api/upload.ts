import request from "../utils/request";
import type { ChunkListItem } from '../types'

export const verifyUpload = (data: string) => {
  return request({
    url: "upload/verify",
    method: "post",
    data
  })
}
export const uploadChunk = (data: ChunkListItem, onProgress: any, signal: any) => {
  return request({
    url: "/upload/chunk",
    method: "POST",
    data,
    headers: {
      "Content-type": "multipart/form-data;charset=UTF-8",
    },
    onUploadProgress: onProgress,
    signal
  });
};
