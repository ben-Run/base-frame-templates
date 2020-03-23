import directive from './src/directive'
import service from './src/index'

export default {
  install: function (Vue) {
    Vue.use(directive)
    Vue.prototype.$loading = service
  },
  directive,
  service
}
