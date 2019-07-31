import Vue from 'vue'
import Viewer from 'v-viewer'
import Mint from 'mint-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import setRem from '@/utils/rem'
import './styles/index.scss' // css主入口
import 'mint-ui/lib/style.css'
import 'viewerjs/dist/viewer.css'
import './registerServiceWorker'
import './permission'
import svgIcon from '@/components/svgIcon'

// rem
setRem(document, window)
Vue.config.productionTip = false

Vue.use(Mint)
Vue.use(Viewer)
Vue.use(svgIcon)

// all svg
const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./assets/icons', false, /\.svg$/)
requireAll(req)

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
