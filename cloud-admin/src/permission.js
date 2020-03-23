import Vue from 'vue'
// import store from './store'
import router from '@/router/index'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login'] // 路由白名单

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  if (to.path === '/login') {
    next()
  } else {
    // // 判断是否登录
    // if (getToken()) {
    //   next()
    // } else {
    //   if (whiteList.indexOf(to.path) !== -1) {
    //     next()
    //   } else {
    //     Vue.prototype.$message.error(`操作失败，您还未登录系统，正在跳回登录页面。`)
    //     next('/login')
    //   }
    // }
    console.log(Vue)
    console.log(getToken)
    console.log(whiteList)
    next()
  }
})
router.afterEach(() => {
  NProgress.done() // finish progress bar
})
