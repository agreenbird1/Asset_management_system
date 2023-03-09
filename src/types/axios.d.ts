import type { Method, AxiosPromise, AxiosRequestConfig } from "axios";

export interface AFanTiAxiosRequestConfig extends AxiosRequestConfig {
  isLoading?: boolean;
}

// 总方法的声明
export type requestType = <T = any>(
  url: string,
  method: Method,
  data?: unknown,
  config?: AFanTiAxiosRequestConfig // 配置其他，包括 isLoading
) => AxiosPromise<T>;

// 单独方法的声明
export type requestMethodType = <T = any>(
  url: string,
  data?: unknown,
  config?: AFanTiAxiosRequestConfig // 配置其他，包括 isLoading
) => AxiosPromise<T>;

// 直接生成每一个对应的简单的方法
export type requestMethod = {
  [k in "get" | "post" | "delete" | "patch"]: requestMethodType;
};