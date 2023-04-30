import { useUserStore } from '@/store/userStore'
import request, { ListInfo, PageInfo } from './request'
import pinia from '@/store/index'
import { ICategory } from './category'

const userStore = useUserStore(pinia)

export type IAsset = {
  id?: number
  name: string
  specification: string
  quantity: number | string
  amount: number
  categoryId?: number
  picture?: string
  location: string
  purchaseTime?: Date
  serialNumber?: string
  status: 0 | 1
  category: ICategory
}

export interface IAssetSearch extends PageInfo {
  name?: string
  categoryId?: number
  isApply?: boolean
}

export class AssetsApi {
  static createAsset(param: Partial<IAsset>) {
    return request.post('/asset', { ...param, userId: userStore.userInfo?.id })
  }
  static getAssets(param: IAssetSearch) {
    return request.post<ListInfo<IAsset>>('/asset/list', param)
  }
  static deleteAsset(id: number) {
    return request.delete(`/asset/${id}`)
  }
  static updateAsset(id: number, status: 0 | 1) {
    return request.patch(`/asset/${id}`, { status })
  }
}
