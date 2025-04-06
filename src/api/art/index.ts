import request from '@/axios'
import { Page } from '@/api/art/types'



export const getTagList = (name: string):Promise<IResponse<any>> => {
    return request.get({ url: `/api/art/tag/getTagList?name=${name}`})
}

export const getCategoryList = ():Promise<IResponse<any>> => {
    return request.get({ url: `/api/art/category/getCategoryList`})
}

export const createCategory = (name: any):Promise<IResponse<any>> => {
    return request.get({ url: `/api/art/category/createCategory?name=${name}`})
}

export const saveArticleHistory = (articleHistory: any):Promise<IResponse<any>> => {
    return request.post({ url: `/api/art/articleHistory/saveArticleHistory`, data: articleHistory})
}

export const publishArticle = (articleHistory: any):Promise<IResponse<any>> => {
    return request.post({ url: `/api/art/articleHistory/publishArticle`, data: articleHistory})
}

export const getOpenArticleDetail = (articleId: any):Promise<IResponse<any>> => {
    return request.get({ url: `/open/art/getOpenArticleDetail?articleId=${articleId}`})
}

export const getEditArticleHistoryDetail = (articleId: any):Promise<IResponse<any>> => {
    return request.get({ url: `/api/art/articleHistory/getEditArticleHistoryDetail?articleId=${articleId}`})
}

export const getArticleListByParam = (param: any):Promise<IResponse<Page>> => {
    return request.post({url: `/open/art/getArticleListByParam`, data: param})
}

