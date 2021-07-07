import { instance } from '@/utils/service'
export const auth = (data) => instance('/auth/login', { method: 'POST', data })
export const getDict = () => instance('/user/dict')
export const getArticle = (data) => instance('/article', { method: 'POST', data })
export const getArtilceDetail = id => instance(`/article/${id}`)
