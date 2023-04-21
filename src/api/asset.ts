import request, { ListInfo, PageInfo } from './request'

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
}

export interface IAssetSearch extends PageInfo {
  name?: string
  categoryId?: number
}

export class AssetsApi {
  static createAsset(param: Partial<IAsset>) {
    return request.post('/asset', param)
  }
  static getAssets(param: IAssetSearch) {
    return request.post<ListInfo<IAsset>>('/asset/list', param)
  }
  static deleteAsset(id: number) {
    return request.delete(`/asset/${id}`)
  }
  static changeAssetStatus(id: number, status: 0 | 1) {
    return request.post(`/asset/status`, { status, id })
  }
}
