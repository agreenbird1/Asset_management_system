import { ICategory } from './category'
import { useUserStore } from '@/store/userStore'
import request, { ListInfo, PageInfo } from './request'
import pinia from '../store/index'

export interface IUser {
  id?: number
  userName: string
  password: string
  rePassword: string
  categoryId?: number
  category?: ICategory
  description?: string
  avatar?: string
  phone: string
  status?: 0 | 1
  role?: 1 | 2 | 3 | 4
}

export interface IUserSearch extends PageInfo {
  userName?: string
  phone?: string
  categoryId?: number
}

const userInfo = useUserStore(pinia).userInfo

export class UserApi {
  static createUser(param: IUser) {
    return request.post('/user', param)
  }
  static getUsers(param: IUserSearch) {
    return request.post<ListInfo<IUser>>('/user/list', param)
  }
  static deleteUser(id: number) {
    return request.delete(`/user/${id}`)
  }
  static changeUserStatus(id: number, status: 0 | 1) {
    return request.post(`/user/status`, { status, id })
  }

  static updateUser(
    param: Partial<IUser>,
    id: number | undefined = userInfo?.id
  ) {
    return request.patch(`/user/${id}`, param)
  }

  static changeUserRole(id: number, role: 2 | 1) {
    return request.post(`/user/role`, { role, id })
  }

  static checkRepeatAccount(phone: string) {
    return request.post<boolean>('/user/check', { phone })
  }
}
