/*
 * @Description:课题录入管理api
 * @Version: 1.0
 * @Autor: longbs
 * @Date: 2019-11-24 10:45:02
 * @LastEditors: Seven
 * @LastEditTime: 2019-11-29 02:16:56
 */
import fetch from '@/utils/fetch'

/**
 * 新增课题记录
 * @param {string}
 * @param {string}
 */
export function createProject (params) {
  return fetch({
    url: '/topicRecord/create',
    method: 'post',
    data: params
  })
}
/**
 * 更新课题记录
 * @param {string}
 * @param {string}
 */
export function updateProject (params) {
  return fetch({
    url: '/topicRecord/update',
    method: 'post',
    data: params
  })
}
/**
 * 课题审核
 * @param {string}
 * @param {string}
 */
export function projectVerify (params) {
  return fetch({
    url: '/topicRecord/batchVerify',
    method: 'get',
    params
  })
}
/**
 * 课题统计导出
 * @param {string}
 * @param {string}
 */
export function exportProject (params) {
  return fetch({
    url: '/topicRecord/export',
    method: 'get',
    responseType: 'blob',
    params
  })
}
/**
 * 课题记录列表
 * @param {string}
 * @param {string}
 */
export function getPojectList (params) {
  return fetch({
    url: '/topicRecord/query',
    method: 'post',
    data: params
  })
}
/**
 * 课题记录详情
 * @param {string}
 * @param {string}
 */
export function getPojectRecordDetail (params) {
  return fetch({
    url: '/topicRecord/get',
    method: 'get',
    params
  })
}
/**
 * 删除
 * @param {string}
 * @param {string}
 */
export function delProject (params) {
  return fetch({
    url: '/topicRecord/delete',
    method: 'get',
    params
  })
}
/**
 * 退回
 * @param {string}
 * @param {string}
 */
export function fallbackProject (params) {
  return fetch({
    url: '/topicRecord/fallback',
    method: 'get',
    params
  })
}
