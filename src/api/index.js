import axios from 'axios'

export const baseUrl = 'http://localhost:3000'

// axios的实例及拦截器配置
const instance = axios.create({
  baseURL: baseUrl
})
instance.interceptors.request.use(
  config => config,
  err => {
    return Promise.reject(err)
  }
)

instance.interceptors.response.use(
  res => res.data,
  err => {
    return Promise.reject(err)
  }
)

export {
  instance
}
