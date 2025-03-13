import request from '@/axios'


export const getChatSessionList = () => {
    return request.get({ url: '/api/chatai/chatSession/getChatSessionList' })
}
export const removeChatSession = (sessionId) => {
    return request.get({ url: `/api/chatai/chatSession/removeChatSession?sessionId=${sessionId}` })
}
export const addAiKey = (aiKey) => {
    return request.get({ url: `/api/sys/user/addAiKey?aiKey=${aiKey}` })
}
export const removeAiKey = () => {
    return request.get({ url: `/api/sys/user/removeAiKey` })
}

export const getMessageList = (sessionId:any) => {
    return request.get({ url: `/api/chatai/chatSession/getMessageList/${sessionId}` })
}

export const sendQuestion = (data) => {
    return request.post({ url: `/api/chatai/chatSession/sendMessage`, data: data })
}
