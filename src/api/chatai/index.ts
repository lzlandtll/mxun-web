import request from '@/axios'


export const getChatSessionList = () => {
    return request.get({ url: '/api/chatai/chatSession/getChatSessionList' })
}

export const getMessageList = (sessionId:any) => {
    return request.get({ url: `/api/chatai/chatSession/getMessageList/${sessionId}` })
}

export const sendQuestion = (data) => {
    return request.post({ url: `/api/chatai/chatSession/sendMessage`, data: data })
}
