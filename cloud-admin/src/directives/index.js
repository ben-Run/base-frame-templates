// vue指令
import Thousands from './thousand'
import toggleThousand from './toggleThousand'
import Decimal from './decimal'
import maxlengthTips from './maxlengthTips'
import toUpperCase from './toUpperCase'
import dialogDrag from './dialogDrag.js'
import toFocus from './txtFocus'

// 指令集
const Directives = {
  'thousand': Thousands, // 格式化为带千分位
  'toggleThousand': toggleThousand, // 输入框切换千分位显示
  'decimal': Decimal, // 格式化为带小数位
  'maxlengthTips': maxlengthTips, // 文本输入元素字数提示
  'toUpperCase': toUpperCase, // 文本输入元素小写字母转大写
  'dialogDrag': dialogDrag, // 弹窗拖拽
  'toFocus': toFocus // input 自动获取焦点
}
export default {
  install (Vue, opts = {}) {
    Object.keys(Directives).forEach(k => {
      Vue.directive(k, Directives[k])
    })
  }
}
