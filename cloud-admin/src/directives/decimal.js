/**
 * v-decimal自定义指令，传的值代表取的小数位，传的参数代表处理的函数，支持floor(对数进行下舍入),round(把数四舍五入为最接近的整数),ceil(对数进行上舍入),默认值为floor
 * 根据传入值n格式化数字为带n位小数的值
 * 如：v-decimal:round="2"，为取两位小数且末位小数四舍五入，value值为1.23556789，返回值为1.24
 * @param {Object} el 指令所绑定的元素，可以用来直接操作 DOM
 */
const decimal = function (el, binding, vnode) {
  let value = el.innerText
  let count = binding.value           // 取的小数位数
  let arg = binding.arg             // 处理类型
  arg = arg !== undefined ? arg : 'floor'
  if (arg !== 'floor' && arg !== 'round' && arg !== 'ceil') {     // 不是这三种函数类型忽略这个参数，按floor处理
    arg = 'floor'
  }
  if (isNaN(count - 0)) {
    console.error(`decimalPlace instructions parameter ${count} is not number`)
  } else {
    count = count - 0
    if (isNaN(value - 0)) {
      console.error(`decimalPlace instructions parameter ${value} is not number`)
    } else {
      value = value - 0
      const pow = Math.pow(10, count)
      value = Math[arg](value * pow)
      value = value.toFixed(count) / pow
    }
  }
  el.innerText = value
}

export default {
  bind (el, binding, vnode, oldVnode) {
    decimal(el, binding, vnode, oldVnode)
  },
  componentUpdated (el, binding, vnode, oldVnode) {
    decimal(el, binding, vnode, oldVnode)
  }
}
