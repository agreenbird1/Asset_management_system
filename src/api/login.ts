import request from './request'

export default class LoginApi {
  /** 登录 */
  static login(username: string, password: string) {
    return request.post('/api/user/login', {
      username,
      password
    })
  }
}
