import Vue from 'vue'
import Viewer from 'v-viewer'
import Mint from 'mint-ui';
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/index.scss' // css主入口
import 'mint-ui/lib/style.css'
import 'viewerjs/dist/viewer.css'
import './registerServiceWorker'
import './permission'

Vue.config.productionTip = false

Vue.use(Mint)
Vue.use(Viewer)

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
