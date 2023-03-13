import request from "./request"
import { WEATHER_API_KEY } from "@/config/common"

export type Now = {
  text: string
  code: string
  temperature: string
}

export type Location = {
  name: string
  path: string
}

export type WeatherResult = {
  results: Array<{
    now: Now
  }>
}

export type LocationResult = {
  results: Array<Location>
}

export class CommonApi {
  /** 天气获取 */
  static getWeather(name: string) {
    return request.get<WeatherResult>(`https://api.seniverse.com/v3/weather/now.json?key=${WEATHER_API_KEY}&location=${name}&language=zh-Hans&unit=c`)
  }
  /** 根据经纬度获取城市名 */
  static getCityInfo(latitude: number, longitude: number) {
    return request.get<LocationResult>(`https://api.seniverse.com/v3/location/search.json?key=${WEATHER_API_KEY}&q=${latitude}:${longitude}`)
  }
}