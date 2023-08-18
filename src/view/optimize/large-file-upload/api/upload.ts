import request from "../utils/request";

export const verifyUpload = (data: string) => {
  return request({
    url: "upload/verify",
    method: "post",
    data
  })
}
