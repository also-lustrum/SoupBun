import request from "../utils/request";

export const verifyUpload = (data: any) => {
  return request({
    url: "upload/verify",
    method: "post",
    data
  })
}
