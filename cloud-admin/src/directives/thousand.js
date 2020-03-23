import { newFormatThousandValue, replaceComma } from '@/utils/index.js'
/**
 * 用于格式化数字字符串，增加千位分隔符
 * 如：123456789格式化为123,456,789
 * @param {Object} el 指令所绑定的元素，可以用来直接操作 DOM
 * *****
 * const 使用示例：
 * <span v-thousand.round.precision="2">-15454.15616</span>
 * => -15,454.16
 * @round修饰符：执行四舍五入
 * @precision修饰符：保留精确度，参数“2”为精确度
 */
const thousand = function (el, binding) {
  let value = el.innerText
  if (!Number(value)) return
  value = replaceComma(value)
  const round = binding.modifiers.round
  const precision = binding.modifiers.precision ? Number(binding.expression) : 0
  el.innerText = newFormatThousandValue(value, precision, round)
}

export default {
  bind (el, binding) {
    thousand(el, binding)
  },
  componentUpdated (el, binding) {
    thousand(el, binding)
  }
}
