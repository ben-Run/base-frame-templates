import Vue from 'vue'
import BaseDialog from './Dialog'
import EmptyTips from './EmptyTips'

function registerAllComponents (requireContext) {
  return requireContext.keys().forEach(comp => {
    const vueComp = requireContext(comp)
    const compName = vueComp.name ? vueComp.toLowerCase() : /\/([\w-]+)\.vue$/.exec(comp)[1]
    Vue.component(compName, vueComp.default)
  })
}

const req = require.context('./', false, /\.vue$/)
registerAllComponents(req)

// 注册
Vue.use(BaseDialog)
Vue.use(EmptyTips)
