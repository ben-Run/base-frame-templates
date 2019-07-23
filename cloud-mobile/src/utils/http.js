import axios from 'axios'
import { getToken } from '@/utils/auth'
import store from '@/store'

// 使用interceptors拦截每次的request和response，然后自定义添加header信息
axios.defaults.withCredentials = true
axios.interceptors.request.use(config => { // config表示每次请求的内容
  config.headers['X-Requested-With'] = 'XMLHttpRequest'
  config.headers['content-type'] = 'application/json;charset=utf-8'
  return config
}, error => { // 错误处理
  return Promise.reject(error)
})

// http response 拦截器
axios.interceptors.response.use(
  response => {
    return response
  },
  error => { // 错误处理
    if (error && error.response) {
      if (error.response.data) {
        error.message = error.response.data.errorMsg
      } else {
        switch (error.response.status) {
          case 400:
            error.message = '请求错误'
            break
          case 401:
            error.message = '未授权，请登录'
            if (!getToken()) {
              TODO: 登录
              // store.dispatch('') // 登录页面
            }
            break
          case 403:
            error.message = '拒绝访问'
            break
          case 404:
            error.message = `请求地址出错: ${error.response.config.url}`
            break
          case 408:
            error.message = '请求超时'
            break
          case 500:
            error.message = '服务器内部错误'
            break
          case 501:
            error.message = '服务未实现'
            break
          case 502:
            error.message = '网关错误'
            break
          case 503:
            error.message = '服务不可用'
            break
          case 504:
            error.message = '网关超时'
            break
          case 505:
            error.message = 'HTTP版本不受支持'
            break
          default:
        }
      }
    }
    return Promise.reject(error)
  }
)

export default axios
