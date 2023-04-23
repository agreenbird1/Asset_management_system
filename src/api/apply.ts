import { useUserStore } from '@/store/userStore'
import request, { ListInfo, PageInfo } from './request'
import { IAsset } from './asset'
import { IUser } from './user'
import pinia from "../store/index"

const userState = useUserStore(pinia)

export type ApplyStatus = 1 | 2 | 3 | 4 | 5

export interface IApply {
  applyTime: string
  approveTime?: string
  asset: IAsset
  id: number
  rejectReason?: string
  remark?: string
  status: ApplyStatus
  user: IUser
  approveUser: IUser
  approveUserId: number
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
}
