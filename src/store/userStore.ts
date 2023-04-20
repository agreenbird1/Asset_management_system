import { IUser } from './../api/user'
import { AsideAuthorityItem } from '@/config/authority'
import storage from '@/utils/storage'
import { defineStore } from 'pinia'

type UserStoreState = {
  userInfo?: IUser
  permission: AsideAuthorityItem[]
}

// useStore 可以是 useUser、useCart 之类的任何东西
// 第一个参数是应用程序中 store 的唯一 id
export const useUserStore = defineStore('userStore', {
  state: (): UserStoreState => {
    const state = storage.getSession<UserStoreState>('userState')
    return {
      userInfo: state?.userInfo,
      permission: state?.permission || [],
    }
  },
})
