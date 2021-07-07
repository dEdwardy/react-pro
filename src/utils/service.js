import axios from 'axios'
import { notification } from 'antd'
export const baseUrl = 'http://localhost:3000'

// axios的实例及拦截器配置
const instance = axios.create({
  baseURL: baseUrl
})
instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('toekn')
    if (token) {
      config.token = `Bear ${token}`
    }
    return config
  },
  err => {
    console.error(err)
  }
)

instance.interceptors.response.use(
  ({ data }) => {
    if (data.statusCode !== 200 || data?.error || data?.data?.error) {
      notification.error({
        message: data?.error || data?.data?.error
      })
      return Promise.reject(data?.error || data?.data?.error)
    }
    return data.data
  },
  err => {
    return Promise.reject(err)
  }
)

export {
  instance
}
