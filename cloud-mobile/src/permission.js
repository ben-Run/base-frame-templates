import Vue from 'vue'
import store from './store'
import router from '@/router/index'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { Toast } from 'mint-ui'
import { getToken } from '@/utils/auth'
NProgress.configure({ showSpinner: false })
const whiteList = ['/login'] // 路由白名单
router.beforeEach(async (to, from, next) => {
  NProgress.start()
  if (to.path === '/login') {
    next()
  } else {
    // 判断是否登录
    if (getToken()) {
      console.log(store)
      console.log(Vue)
      // if (store.getters.PostData.length === 0 ||
      //   store.getters.StatusData.length === 0 ||
      //   store.getters.PassportData.length === 0 ||
      //   store.getters.DossierData.length === 0) {
      //   await store.dispatch('getBaseDataList', {}) // 人事档案
      // }
      // if (store.getters.cardSettingsList.length === 0 ||
      //   store.getters.cardTypeList.length === 0) {
      //   await store.dispatch('getCardSettings', {}) // 卡配置基础档案
      // }
      // *****************************************************end
      // 已登录，获取后端路由接口信息
      // if (!store.getters.menuTree.menuTree) {
      //   store.dispatch('getMenuTrees').then(data => {
      //     // 有权限列表配置路由信息
      //     if (data.menuTree.length > 0) {
      //       // 控制未知路径跳转404
      //       const unfound = { path: '*', redirect: '/404', hidden: true }
      //       routerList.push(unfound)

      //       // 把路由列表加入现有router
      //       router.addRoutes(routerList)
      //       next()
      //     } else {
      //       // 无权限列表
      //       removeAccount()
      //       window.location.href = process.env.FRAME_URI
      //     }
      //   }).catch(e => {
      //     removeAccount()
      //     let origin = getorigin()
      //     window.location.href = origin
      //   })
      //   next()
      // } else {
      //   // 已获取后端路由接口，但权限列表是空
      //   if (store.getters.menuTree.menuTree.length <= 0) {
      //     removeAccount()
      //     window.location.href = process.env.FRAME_URI
      //   } else {
      //     // 已登录且有路由权限列表，正常进入
      //     next()
      //   }
      // }
      next()
    } else {
      if (whiteList.indexOf(to.path) !== -1) {
        next()
      } else {
        Toast({
          message: `操作失败，您还未登录系统，正在跳回登录页面。`,
          position: 'middle',
          duration: 3000
        })
        next('/login')
        NProgress.done()
      }
    }
  }
})
router.afterEach(() => {
  NProgress.done() // finish progress bar
})
