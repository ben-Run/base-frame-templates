/*
 * @Author: bensong.long
 * @Date: 2019-01-29 12:21:13
 * @Last Modified by: bensong.long
 * @Last Modified time: 2019-03-23 00:24:39
 */
export function isvalidUsername (str) {
  const validMap = ['admin', 'editor']
  return validMap.indexOf(str.trim()) >= 0
}
/**
 *合法url
 *
 * @export
 * @param {*} textval
 * @returns
 */
export function validateURL (textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}
/**
 *小写字母
 *
 * @export
 * @param {*} str
 * @returns
 */
export function validateLowerCase (str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}
/**
 *大写字母
 *
 * @export
 * @param {*} str
 * @returns
 */
export function validateUpperCase (str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/**
 * validate email
 * @param email
 * @returns {boolean}
 */
export function validateAlphabets (str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/**
 * validate email
 * @param email
 * @returns {boolean}
 */
export function validateEmail (email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}
/**
 * validate mobilePhone
 * @param email
 * @returns {boolean}
 */
export function validateMobilePhone (phone) {
  const re = /^1[3456789]\d{9}$/
  return re.test(phone)
}
/**
 * validate telPhone 电话 (固话 and 手机)
 * @param telPhone
 * @returns {boolean}
 */
export function telPhone (telPhone) {
  const re = /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/
  return re.test(telPhone)
}
/**
 * validate tel 固话
 * @param tel
 * @returns {boolean}
 */
export function validateTel (tel) {
  const re = /^0\d{2,3}-?\d{7,8}$/
  return re.test(tel)
}
/**
 * validate 身份证(简单版15位/18位)
 * @param tel
 * @returns {boolean}
 */
export function identityCard (tel) {
  const re = /(^\d{15}$)|(^\d{17}([0-9]|X)$)/
  return re.test(tel)
}
