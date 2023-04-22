import LoginApi from '@/api/login'
import router from '@/router'
import { IUser } from './../api/user'
import storage from '@/utils/storage'
import { defineStore } from 'pinia'

type UserStoreState = {
  userInfo?: IUser
}

// useStore 可以是 useUser、useCart 之类的任何东西
// 第一个参数是应用程序中 store 的唯一 id
export const useUserStore = defineStore('userStore', {
  state: (): UserStoreState => {
    const state = storage.getSession<UserStoreState>('userState')
    return {
      userInfo: state?.userInfo,
    }
  },
  actions: {
    setUserInfo(phone: string, password: string, path?: string) {
      LoginApi.login(phone, password).then((res) => {
        // 存储到 store
        storage.setSession('userState', {
          userInfo: res.data,
        })
        this.$patch({
          userInfo: res.data,
        })
        path && router.push('/')
      })
    },
  },
})
