import { defineStore } from 'pinia'
import StringUtil from '@/utils/StringUtil'

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
        },
        hasLogin():boolean {
            return StringUtil.isNotEmpty(this.userInfo.token);
        },
        isSelf(userId: number):boolean {
            return this.userInfo.id == userId
        }
    },
    persist: true
})

const useUserStoreInstance = useUserStore();
export default {
    getUserInfo: () => useUserStoreInstance.getUserInfo,
    getToken: () => useUserStoreInstance.getToken,
    setUserInfo: (userInfo: UserInfo) => useUserStoreInstance.setUserInfo(userInfo),
    addRole: (roleCode: string) => useUserStoreInstance.addRole(roleCode),
    removeRole: (roleCode: string) => useUserStoreInstance.removeRole(roleCode),
    hasRole: (roleCode: string) => useUserStoreInstance.hasRole(roleCode),
    hasLogin: () => useUserStoreInstance.hasLogin(),
    isSelf: (userId: number) => useUserStoreInstance.isSelf(userId)
}
