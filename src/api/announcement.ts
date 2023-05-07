import { useUserStore } from '@/store/userStore'
import request from './request'
import pinia from '../store/index'

const userState = useUserStore(pinia)

export type ApplyStatus = 1 | 2 | 3 | 4 | 5

export interface IAnnouncement {
  title: string
  content: string
  picture: string
  userName?: string
}

export class AnnouncementApi {
  static createAnnouncement(param: Partial<IAnnouncement>) {
    return request.post('/announcement', {
      ...param,
      userName: userState.userInfo?.userName,
    })
  }

  static getAnnouncement() {
    return request.get<IAnnouncement>('/announcement')
  }

  static clear(){
    return request.delete('/announcement')
  }
}
