
import fetch from '@/utils/fetch'

/**
 * login
 * @param {string} userAccount
 * @param {string} userPwd
 */
export function login (params) {
  return fetch({
    url: '/user/login',
    method: 'post',
    data: params
  })
}

/**
 * 退出登录
 */
export function logout () {
  return fetch({
    url: '/admin/user/OA/loginOut',
    method: 'post'
  })
}
