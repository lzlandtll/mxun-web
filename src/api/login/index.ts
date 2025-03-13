import request from '@/axios'


export const accountLogin = (data: any) => {
    return request.post({ url: '/open/auth/login', data: data})
}

export const registerAccount = (data: any) => {
    return request.post({ url: '/open/sys/registerAccount', data: data})
}

export const getRegisterSmsCode = (tel:any) => {
    return request.get({ url: `/open/sys/getRegisterSmsCode?tel=${tel}` })
}

