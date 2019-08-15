import axios from 'axios'
import { getToken, removeToken } from '@/utils/auth'
import { Toast } from 'mint-ui'

// 使用interceptors拦截每次的request和response，然后自定义添加header信息
axios.defaults.withCredentials = true
axios.interceptors.request.use(config => { // config表示每次请求的内容
  config.headers['X-Requested-With'] = 'XMLHttpRequest'
  config.headers['content-type'] = 'application/json;charset=utf-8'
  const token = getToken()
  if (token) {
    config.headers['AccessToken'] = token
  }
  return config
}, error => { // 错误处理
  return Promise.reject(error)
})

// http response 拦截器
axios.interceptors.response.use(
  response => {
    const { status, data } = response
    // 根据业务调整
    if (status === 200) {
      const { code, msg } = data
      if (code === '0') {
        return data.data
      } else {
        if (msg && msg.indexOf('is invalid or expired') > -1) {
          if (process.env.NODE_ENV === 'development') {
            removeToken()
            window.location.reload()
          }
        }
        if (msg) {
          Toast({
            message: msg,
            position: 'middle',
            duration: 3000
          })
        }
      }
      /* eslint-disable-next-line */
      return Promise.reject({ message: msg })
    }
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
              // TODO: 登录
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
            error.message = '系统错误，请联系管理员'
        }
      }
    }
    Toast({
      message: error.message,
      position: 'middle',
      duration: 3000
    })
    return Promise.reject(error)
  }
)

export default axios
