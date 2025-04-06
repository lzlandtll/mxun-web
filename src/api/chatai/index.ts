import request from '@/axios'


export const getChatSessionList = ():Promise<IResponse<any>> => {
    return request.get({ url: '/api/chatai/chatSession/getChatSessionList' })
}
export const removeChatSession = (sessionId):Promise<IResponse<any>> => {
    return request.get({ url: `/api/chatai/chatSession/removeChatSession?sessionId=${sessionId}` })
}
export const addAiKey = (aiKey):Promise<IResponse<any>> => {
    return request.get({ url: `/api/sys/user/addAiKey?aiKey=${aiKey}` })
}
export const removeAiKey = ():Promise<IResponse<any>> => {
    return request.get({ url: `/api/sys/user/removeAiKey` })
}

export const getMessageList = (sessionId:any):Promise<IResponse<any>> => {
    return request.get({ url: `/api/chatai/chatSession/getMessageList/${sessionId}` })
}

export const sendQuestion = (data):Promise<IResponse<any>> => {
    return request.post({ url: `/api/chatai/chatSession/sendMessage`, data: data })
}
