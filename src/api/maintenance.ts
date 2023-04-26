import { IAsset } from './asset'
import request, { ListInfo, PageInfo } from './request'
import { IUser } from './user'

export type MaintenanceStatus = 0 | 1 // 维修中 已完成

export type IMaintenance = {
  applyTime: string
  completeTime?: string
  asset: IAsset
  id: number
  picture: string
  description: string
  applyUser: IUser
  maintenanceUser: IUser
}

export class MaintenanceApi {
  static get(pageNum: number, status: MaintenanceStatus, userId?: number) {
    return request.get('/maintenance',{
      pageNum,
      status,
      userId
    })
  }
}
