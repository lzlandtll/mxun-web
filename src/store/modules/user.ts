import { defineStore } from 'pinia'
import { store } from '../index'

interface UserState {
    userInfo: UserInfo
}
interface UserInfo {
    id: number
    username: string
    tel: string
    email: string
    token: string
}

export const useUserStore = defineStore('user', {
    state: (): UserState => {
        return <UserState>{
            userInfo: {}
        }
    },
    getters: {
        getUserInfo(): UserInfo{
            return this.userInfo
        },
        getToken(): string {
            return this.userInfo.token
        }
    },
    actions: {
        setUserInfo(userInfo: UserInfo) {
            this.userInfo = userInfo
        }
    },
    persist: true
})

export const userStoreHandler = () => {
    return useUserStore(store)
}
