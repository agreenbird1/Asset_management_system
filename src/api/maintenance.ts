import { useUserStore } from '@/store/userStore'
import pinia from '@/store/index'
import { IApply } from './apply'
import { IAsset } from './asset'
import request, { ListInfo, PageInfo } from './request'
import { IUser } from './user'

const userState = useUserStore(pinia)

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
  apply: IApply
}

export class MaintenanceApi {
  static get(pageNum: number, status: MaintenanceStatus, userId?: number) {
    return request.get<ListInfo<IMaintenance>>('/maintenance', {
      pageNum,
      status,
      userId,
    })
  }
  static update(
    id: number,
    status: MaintenanceStatus,
    assetId: number,
    maintenanceValue?: number
  ) {
    return request.patch(`/maintenance/${id}`, {
      status,
      maintenanceUserId: userState.userInfo?.id,
      maintenanceValue,
      assetId
    })
  }
}
