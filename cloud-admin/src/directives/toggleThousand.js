import { formatThousandValue, replaceComma } from '@/utils/index.js'
/**
 * 用于input元素格式化数字字符串，增加千位分隔符
 * 如：123456789格式化为123,456,789
 * @param {Object} el 指令所绑定的元素，可以用来直接操作 DOM
 * ******
 * * const 使用示例：
 * <input type="text" v-model="value" v-toggle-thousand.round.precision="2"/>
 * @round修饰符：执行四舍五入
 * @precision修饰符：保留精确度，参数“2”为精确度
 */
const toggleThousand = function (el, binding) {
  const input = el.nodeName === 'INPUT' ? el : el.querySelector('input[type=text]')
  if (!input) return
  const round = binding.modifiers.round
  const precision = binding.modifiers.precision ? Number(binding.expression) : 0
  // 绑定onblur事件，执行千位符格式化
  input.addEventListener('blur', function () {
    if (!this.value) return
    this.value = formatThousandValue(this.value, precision, round)
    // 根据v-model指令的原理，手动触发元素oninput事件
    this.dispatchEvent(new Event('input'))
  })
  // 绑定onfocus事件，去除千位符
  input.addEventListener('focus', function () {
    if (!this.value) return
    this.value = replaceComma(this.value)
    // 根据v-model指令的原理，手动触发元素oninput事件
    this.dispatchEvent(new Event('input'))
  })
}

export default {
  inserted: toggleThousand
}
