import request from './request'

export default class LoginApi {
  /** 登录 */
  static login(phone: string, password: string) {
    return request.post('/user/login', {
      phone,
      password
    })
  }
}
