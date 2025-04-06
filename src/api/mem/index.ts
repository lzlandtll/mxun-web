import request from '@/axios'

export const getOpenUserInfo = (userId: any):Promise<IResponse<any>> => {
    return request.get({ url: `/open/mem/getOpenUserInfo?userId=${userId}`})
}
