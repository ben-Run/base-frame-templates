import axios from 'axios'
import { getToken } from '@/utils/auth'
/**
 * 统一的连接服务器接口
 * @param {*string} url url或自定义的url属性名 (默认值'')
 * @param {*string} type request类型 (默认值get)
 * @param {*json} params json参数 (默认值{})
 * @param {*string} subUrl 要拼接到url后面的资源文件名 (默认值'')
 * @param {*string} download 是否是下载
 */
export function axiosServer ({ url = '', type = 'get', params = {}, subUrl = '', download = false }) {
  url += subUrl // 拼接子url
  let config = {
    method: type,
    timeout: 5000,
    url: url,
    data: params,
    baseURL: '/api'
  }
  if (type === 'get') {
    config.params = params
  }
  config.headers = {
    Token: getToken()
  }
  // 下载
  if (download === true) {
    config.responseType = 'blob'
  }
  return axios(config)
}
