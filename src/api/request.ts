import axios, { InternalAxiosRequestConfig } from 'axios'
import {
  AFanTiAxiosRequestConfig,
  requestType,
  requestMethod,
} from '../types/axios'
import router from '@/router'

const service = axios.create({
  timeout: 5000,
  baseURL: import.meta.env.VITE_APP_BASEURL,
})

service.interceptors.request.use(
  (config: InternalAxiosRequestConfig<AFanTiAxiosRequestConfig>) => {
    // if(config.isLoading) {
    //   添加加载动画
    // }
    return config
  },
  (errors) => {
    return Promise.reject(errors)
  }
)

service.interceptors.response.use(
  (res) => {
    if (res.data.success) return res.data
    else {
      Promise.reject(res.data)
      window.$message.error(res.data.message)
    }
  },
  (rej) => {
    if (rej.response.status == 401) {
      window.$message.error('登录过期，请重新登录')
      router.push('/login')
    }
  }
)

const request: requestType & requestMethod = (url, method, data, config) => {
  return service({
    url,
    method,
    [method.toLocaleLowerCase() === 'get' ? 'params' : 'data']: data,
    ...config,
  })
}

// 新增四个单独的方法
request.get = (url, data, config) => {
  return request(url, 'get', data, config)
}
request.post = (url, data, config) => {
  return request(url, 'post', data, config)
}
request.delete = (url, data, config) => {
  return request(url, 'delete', data, config)
}
request.patch = (url, data, config) => {
  return request(url, 'patch', data, config)
}

// 规定返回和请求值的类型
export default request

export type PageInfo = {
  pageSize: number
  pageNum: number
}

export type ListInfo<T> = {
  total: number
  list: T[]
}
