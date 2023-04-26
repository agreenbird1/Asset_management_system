import { useUserStore } from '@/store/userStore'
import request, { ListInfo, PageInfo } from './request'
import { IAsset } from './asset'
import { IUser } from './user'
import pinia from '../store/index'
import { IMaintenance } from './maintenance'

const userState = useUserStore(pinia)

export type ApplyStatus = 1 | 2 | 3 | 4 | 5
export type MyAssetStatus = 1 | 2 | 3 | 4 // 正常使用、维修中、退还中、已报废

export interface IApply {
  applyTime: string
  approveTime?: string
  signTime?: string
  returnTime?: string
  asset: IAsset
  id: number
  rejectReason?: string
  remark?: string
  status: ApplyStatus
  user: IUser
  approveUser: IUser
  approveUserId: number
  myStatus: MyAssetStatus
}

export class ApplyApi {
  static createApply(assetIds: number[]) {
    return request.post('/apply', {
      userId: userState.userInfo?.id,
      assetIds,
    })
  }
  static getApplies(status: 1 | 2 | 3 | 4 | 5, pageNum: number) {
    return request.get<ListInfo<IApply>>('/apply', {
      status,
      userId: userState.userInfo?.id,
      pageNum,
    })
  }

  static getMyAssets(myStatus: MyAssetStatus, pageNum: number) {
    return request.get<ListInfo<IApply>>('/apply/my-asset', {
      myStatus,
      userId: userState.userInfo?.id,
      pageNum,
    })
  }

  static getApprovalApplies(status: 1 | 2, pageNum: number) {
    return request.get<ListInfo<IApply>>('/apply/approval', {
      status,
      pageNum,
      approveUserId: userState.userInfo?.id,
    })
  }

  static updateApply(id: number, param: Partial<IApply>) {
    return request.patch(`/apply/${id}`, param)
  }

  static maintenance(id: number, param: Partial<IMaintenance>) {
    return request.patch(`/apply/maintenance/${id}`, param)
  }
}
