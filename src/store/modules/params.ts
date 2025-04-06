import { defineStore } from 'pinia'
import AppUtils from "@/utils/AppUtils";

interface ParamsState {
    paramsInfo: ParamsInfo
}
interface ParamsInfo {
    navFilterKey: string,
    filterUserKey: string
}

export const useParamsStore = defineStore('params', {
    state: (): ParamsState => {
        return <ParamsState>{
            paramsInfo: {}
        }
    },
    getters: {
        getNavFilterKey(): string{
            return this.paramsInfo.navFilterKey
        },
        getFilterUserKey(): string{
            return this.paramsInfo.filterUserKey
        }
    },
    actions: {
        updateNavFilterKey(navFilterKey: string){
            this.paramsInfo.navFilterKey = navFilterKey
            AppUtils.replaceUrlQuery("query", navFilterKey)
        },
        updateFilterUserKey(filterUserKey: string){
            this.paramsInfo.filterUserKey = filterUserKey
            AppUtils.replaceUrlQuery("filterUserKey", filterUserKey)
        }
    },
    persist: true
})

const useParamsStoreInstance = useParamsStore();
export default {
    getNavFilterKey: () => useParamsStoreInstance.getNavFilterKey,
    getFilterUserKey: () => useParamsStoreInstance.getFilterUserKey,
    updateNavFilterKey: (navFilterKey: string) => useParamsStoreInstance.updateNavFilterKey(navFilterKey),
    updateFilterUserKey: (filterUserKey: string) => useParamsStoreInstance.updateFilterUserKey(filterUserKey)

}
