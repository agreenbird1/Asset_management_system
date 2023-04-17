// utils/oss.js
import { JxCloudOss } from '@juexiao/juexiao-utils'
const oss = new JxCloudOss({
  /** bucket桶名称 */
  bucket: 'juexiao-time',
  /** 节点名（非必传 默认 obs.cn-east-3.myhuaweicloud.com） */
  endPoint: 'obs.cn-east-3.myhuaweicloud.com',
  /** 目标文件夹名， 建议设为 `${folderName}_${env}`， 如`adminFile_dev` */
  folderName: `adminFile_operation_${process.env.NODE_ENV}`
  /** 用户id（非必传，一般在ossUploadFile方法实时传入即可） */
})
export default oss
