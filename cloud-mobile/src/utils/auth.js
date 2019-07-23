import Cookies from 'js-cookie'
const TokenKey = 'web-card-sys'
const HardWareKey = 'hard-warekey'

export function getToken () {
  return Cookies.get(TokenKey)
}

export function setToken (token) {
  return Cookies.set(TokenKey, token, {
    path: ''
  })
}

export function removeToken () {
  return Cookies.remove(TokenKey, { path: '' })
}
// 硬件token
export function getHardWareToken () {
  return Cookies.get(HardWareKey)
}
// 硬件token默认15分钟
export function setHardWareToken (token, minute = 15) {
  var inFifteenMinutes = new Date(new Date().getTime() + minute * 60 * 1000)
  return Cookies.set(HardWareKey, token, {
    path: '',
    expires: inFifteenMinutes
  })
}
// 删除
export function removeHardWareToken () {
  return Cookies.remove(HardWareKey, { path: '' })
}
