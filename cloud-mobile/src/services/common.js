import { axiosServer } from '@/utils/request'

export function post (url, params) {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axiosServer({
        url,
        type: 'post',
        params: params
      })
      // `Code` 成功返回0，通用错误返回`1`。其它错误返回某一个特定编码，每个编码都是全局唯一，含义都是唯一的。
      // 除了通用的一下错误码，各个接口不会出现错误码重复
      // `Message` 服务端返回的信息，一般`Code` 不等于0，都会有信息。
      if (data.Code === 0) {
        resolve(data)
      } else {
        if (data.Message && data.Message === '您没有该应用的权限') {
        } else if (data.Message.includes('未登录')) {
          location.href = `${process.env.FRAME_URL}`
        } else {
          Message.error(data.Message)
          reject(data.Message)
        }
      }
    } catch (e) {
      reject(e)
      this.$toast({
        message: `${e.message}` || '系统繁忙，请稍后再试！'
      })
    }
  })
}
// 上传
export function fileUpload (url, params) {
  const formdata = new FormData()
  for (let i in params) {
    formdata.append(i, params[i])
  }
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axiosServer({
        url,
        type: 'post',
        params: formdata,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
      resolve(data)
    } catch (e) {
      Message.error(e.message || '系统繁忙，请稍后再试！')
      reject(e)
    }
  })
}
export function get (url, download = false) {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axiosServer({
        url,
        type: 'get',
        download
      })
      // TODO:是不是下载也应该返回code跟message
      if (data.Code === 0 || download) {
        resolve(data)
      } else {
        Message.error(data.Message)
        reject(data.Message)
      }
    } catch (e) {
      reject(e)
      Message.error(e.message || '系统繁忙，请稍后再试！')
    }
  })
}

export function del (url) {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axiosServer({
        url,
        type: 'delete'
      })
      if (data.Code === 0) {
        resolve(data)
      } else {
        Message.error(data.Message)
        reject(data.Message)
      }
    } catch (e) {
      reject(e)
      Message.error(e.message || '系统繁忙，请稍后再试！')
    }
  })
}

/**
 * 通过表单提交参数方式，下载文件，兼容IE
 * @param {String} method: 提交方式，post或get
 * @param {*} url 路径
 * @param {*} params 参数对象，当参数过多时使用
 */
export function downloadFileUseForm (method, url, params) {
  const options = {
    method: method,
    url: url,
    data: params
  }
  const $form = document.createElement('form')
  $form.setAttribute('method', options.method)
  $form.setAttribute('action', options.url)
  Object.keys(options.data).filter(k => {
    let $input = document.createElement('input')
    $input.setAttribute('type', 'hidden')
    $input.setAttribute('name', k)
    $input.setAttribute('value', options.data[k])
    $form.appendChild($input)
  })
  document.body.appendChild($form)
  $form.submit()
  $form.parentNode.removeChild($form)
}

// 开发环境使用代理服务器时增加代理配置字符/weApp
export function replaceProxyUrl (url) {
  // return url.replace(/^(\/app)/, '/webPc')
  if (process.env.NODE_ENV === 'production') {
    return url
  } else return '/webApp' + url
}
