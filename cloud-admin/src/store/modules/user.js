import { login } from '@/api/login'
import { setToken, removeToken, setUserInfo, getUserInfo, removeUserInfo } from '@/utils/auth'

const defaultAvatar = require('@/assets/images/administrator.png')

const user = {
  state: {
    token: '',
    userInfo: JSON.parse(getUserInfo('userInfo')) || {}
  },
  getters: {
    userInfo: state => state.userInfo
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USERINFO: (state, userInfo) => {
      // 登出设置空对象
      if (Object.keys(userInfo).length) {
        userInfo.avatar = userInfo.headImg ? userInfo.headImg : defaultAvatar
      }
      state.userInfo = userInfo
      // 登出设置空对象
      if (Object.keys(userInfo).length) {
        setUserInfo('userInfo', JSON.stringify(userInfo)) // cookie
      }
    }
  },

  actions: {
    SetUserInfo ({ commit, dispatch }, userInfo) {
      commit('SET_USERINFO', userInfo) // vuex
    },

    // 登录
    async Login ({ commit, dispatch }, userInfo) {
      let params = {
        name: userInfo.UserName.trim(),
        pwd: userInfo.Password
      }
      // const user = await login(params)
      // if (user.code === 200) {
      //   await dispatch('SetToken', user.data.token)
      //   await dispatch('SetUserInfo', user.data)
      // }
      console.log(params)
      console.log(login)
      const user = {
        name: 'admin',
        pwd: '123456'
      }
      return user
    },

    SetToken ({ commit, dispatch, state }, token) {
      return new Promise((resolve, reject) => {
        if (token) {
          commit('SET_TOKEN', token) // vuex
          setToken(token) // cookie
          return resolve(token)
        }
        return reject(new Error('new error'))
      })
    },

    // 登出
    async LogOut ({ dispatch }) {
      await dispatch('resetToken')
    },
    resetToken ({ commit }) {
      commit('SET_TOKEN', '')
      commit('SET_USERINFO', {})

      removeToken()
      removeUserInfo()
    }
  }
}

export default user
