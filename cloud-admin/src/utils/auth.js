
import Cookies from 'js-cookie'
const TokenKey = 'web-graduate-sys'
// const UserKey = 'web-graduate-use'

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

export function setUserInfo (userInfo, stringValue) {
  sessionStorage.setItem(userInfo, stringValue)
}

export function getUserInfo (userInfo) {
  return sessionStorage.getItem(userInfo)
}

export function removeUserInfo () {
  sessionStorage.removeItem('userInfo')
}
