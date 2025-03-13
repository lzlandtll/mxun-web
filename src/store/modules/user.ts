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
    roles: number[]
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
        },
        addRole(role: number) {
            if (!this.userInfo.roles.includes(role)) {
                this.userInfo.roles.push(role); // 添加新角色
            }
        },
        removeRole(role: number) {
            this.userInfo.roles = this.userInfo.roles.filter(r => r !== role); // 删除指定角色
        },
        hasRole(role: number): boolean {
            return this.userInfo.roles.includes(role); // 使用 includes 方法检查角色存在性
        }
    },
    persist: true
})

export const userStoreHandler = () => {
    return useUserStore(store)
}
