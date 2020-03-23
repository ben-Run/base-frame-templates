/*
 * @Description:基础档案api
 * @Version: 1.0
 * @Autor: longbs
 * @Date: 2019-11-24 10:45:02
 * @LastEditors: Seven
 * @LastEditTime: 2019-11-25 00:17:29
 */
import fetch from '@/utils/fetch'

/**
 * 系统用户列表
 * @param {string}
 * @param {string}
 */
export function getSysUserList (params) {
  return fetch({
    url: '/user/query',
    method: 'post',
    data: params
  })
}
/**
 * 新增系统用户列表
 * @param {string}
 * @param {string}
 */
export function createSysUser (params) {
  return fetch({
    url: '/user/create',
    method: 'post',
    data: params
  })
}
/**
 * 更新系统用户
 * @param {string}
 * @param {string}
 */
export function updateUserSys (params) {
  return fetch({
    url: '/user/update',
    method: 'post',
    data: params
  })
}
/**
 * 删除系统用户
 * @param {string}
 * @param {string}
 */
export function deleteUserSys (params) {
  return fetch({
    url: '/user/delete',
    method: 'get',
    params
  })
}
/**
 * 启用/禁用系统用户
 * @param {string}
 * @param {string}
 */
export function setDisableSys (params) {
  return fetch({
    url: '/user/disable',
    method: 'get',
    params
  })
}
// 课题
/**
 * 课题列表
 * @param {string}
 * @param {string}
 */
export function getTopicList (params) {
  return fetch({
    url: '/topic/query',
    method: 'post',
    data: params
  })
}
/**
 * 新增课题
 * @param {string}
 * @param {string}
 */
export function createTopic (params) {
  return fetch({
    url: '/topic/create',
    method: 'post',
    data: params
  })
}
/**
 * 更新课题
 * @param {string}
 * @param {string}
 */
export function updateTopic (params) {
  return fetch({
    url: '/topic/update',
    method: 'post',
    data: params
  })
}
/**
 * 删除课题
 * @param {string}
 * @param {string}
 */
export function delTopic (params) {
  return fetch({
    url: 'topic/delete',
    method: 'get',
    params
  })
}
// 人员管理
/**
 * 人员列表
 * @param {string}
 * @param {string}
 */
export function getStaffList (params) {
  return fetch({
    url: '/staff/query',
    method: 'post',
    data: params
  })
}
/**
 * 新增人员
 * @param {string}
 * @param {string}
 */
export function createStaff (params) {
  return fetch({
    url: '/staff/create',
    method: 'post',
    data: params
  })
}
/**
 * 更新人员
 * @param {string}
 * @param {string}
 */
export function updateStaff (params) {
  return fetch({
    url: '/staff/update',
    method: 'post',
    data: params
  })
}
/**
 * 删除人员
 * @param {string}
 * @param {string}
 */
export function delStaff (params) {
  return fetch({
    url: '/staff/delete',
    method: 'get',
    params
  })
}
