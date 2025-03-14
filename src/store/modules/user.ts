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
    roleCodes: string[]
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
        addRole(roleCode: string) {
            if (!this.userInfo.roleCodes.includes(roleCode)) {
                this.userInfo.roleCodes.push(roleCode); // 添加新角色
            }
        },
        removeRole(roleCode: string) {
            this.userInfo.roleCodes = this.userInfo.roleCodes.filter(r => r !== roleCode); // 删除指定角色
        },
        hasRole(roleCode: string): boolean {
            return this.userInfo.roleCodes.includes(roleCode); // 使用 includes 方法检查角色存在性
        }
    },
    persist: true
})

export const userStoreHandler = () => {
    return useUserStore(store)
}
