import { IUser } from './user'
import request from './request'

export default class LoginApi {
  /** 登录 */
  static login(phone: string, password: string) {
    return request.post<IUser>('/user/login', {
      phone,
      password,
    })
  }
}
