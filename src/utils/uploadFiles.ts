import { UploadFileInfo } from 'naive-ui'
import oss from './oss'

export const sendSingleFile = (file: UploadFileInfo) => {
  const fileOptions = {
    userId: 1111112746,
    file: file.file as File,
    onProgress(process: any) {
      file.status = 'uploading'
      file.percentage = process.percent
      console.log(process.percent)
    },
    onSuccess(val: any) {
      const src = 'https://img.juexiaotime.com/' + val.name
      file.url = src
      file.status = 'finished'
    },
    onError() {
      file.status = 'error'
    },
  }
  file.status = 'pending'
  return oss.ossUploadFile(fileOptions)
}
