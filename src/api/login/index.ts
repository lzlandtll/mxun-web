import request from '@/axios'


export const accountLogin = (data: any):Promise<IResponse<any>> => {
    return request.post({ url: '/open/auth/login', data: data})
}

export const registerAccount = (data: any):Promise<IResponse<any>> => {
    return request.post({ url: '/open/sys/registerAccount', data: data})
}

export const getRegisterSmsCode = (tel:any):Promise<IResponse<any>> => {
    return request.get({ url: `/open/sys/getRegisterSmsCode?tel=${tel}` })
}

