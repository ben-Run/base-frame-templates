// 系统基础数据档案-crud 无关联的数据
import {
  getBaseDataList
} from '@/services/base/api'
const state = {
  Post: [], // 职务
  Status: [], // 身份类型
  Passport: [], // 证件类型
  Dossier: [] // 档案类型
}
const getters = {
  PostData: state => state.Post,
  StatusData: state => state.Status,
  PassportData: state => state.Passport,
  DossierData: state => state.Dossier
}
const actions = {
  // 基础服务
  async getBaseDataList ({ commit }, params) {
    const response = await getBaseDataList(params)
    if (response.Code === 0) {
      commit('BASE_DATA_LIST', response)
    }
    return response
  }
}
const mutations = {
  BASE_DATA_LIST (state, data = {}) {
    state.Post = data.Post
    state.Status = data.Status
    state.Passport = data.Passport
    state.Dossier = data.Dossier
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
