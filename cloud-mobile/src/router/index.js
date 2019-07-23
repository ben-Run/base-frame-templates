import Vue from 'vue'
import Router from 'vue-router'
import { constantRouterMap } from './routerMap'
// import Layout from '../views/layout/Layout'
Vue.use(Router)

export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
