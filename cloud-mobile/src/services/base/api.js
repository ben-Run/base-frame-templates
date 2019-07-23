import { post } from '../common'
// 列表
/**
 * @returns {Promise<void>}
 */
export const getBaseDataList = params => post(`/Personnel/GetPersonnelSettings`, params)
