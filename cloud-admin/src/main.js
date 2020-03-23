// import 'babel-polyfill' // 兼容IE
import Vue from 'vue'
import 'normalize.css/normalize.css'// A modern alternative to CSS resets
import ElementUI from 'element-ui'
import Loading from '@/components/loading'
import App from './App.vue'
import router from './router'
import store from './store'
// import '@/components/ElementUI'
import './styles/index.scss' // css主入口
import animated from 'animate.css'
import Filters from './filters' // 全局过滤器
import Directives from './directives' // 全局指令
import '@/permission'

// 注册基础组件
import './components/Base/index'

import VueParticles from 'vue-particles'
import { throttle } from '@/utils/index'

// import print from 'print-js'

Vue.use(ElementUI)
Vue.use(Loading.directive)
Vue.use(animated)
Vue.use(Filters)
Vue.use(Directives)
Vue.use(VueParticles)
// Vue.use(print)

Vue.config.productionTip = false
Vue.config.errorHandler = function (err, vm, info) {
  console.log(err)
}

Vue.prototype.$throttle = throttle

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
