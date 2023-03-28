import { AsideAuthorityItem } from '@/config/authority'
import { defineStore } from 'pinia'

type UserStoreState = {
  userId?: number
  asidePermission: AsideAuthorityItem[]
}

// useStore 可以是 useUser、useCart 之类的任何东西
// 第一个参数是应用程序中 store 的唯一 id
export const useUserStore = defineStore('userStore', {
  state: (): UserStoreState => {
    return {
      userId: undefined,
      asidePermission: [],
    }
  },
})
