import { IUser } from './user'
import request, { ListInfo } from './request'
import { IAsset } from './asset'

export type IMonitor = {
  type: 1 | 2 | 3 | 4 | 5 // 新增 领用 维修 退还 报废
  createTime: Date
  id: number
  applyUser: IUser
  handleUser: IUser
  asset: IAsset
}

export type IMonitorSearch = {
  pageNum: number
  assetName: string
  applyUserName: string
  handleUserName: string
}

export default class MonitorApi {
  /** 登录 */
  static get(query: IMonitorSearch) {
    return request.get<ListInfo<IMonitor>>('/monitor', query)
  }
}
