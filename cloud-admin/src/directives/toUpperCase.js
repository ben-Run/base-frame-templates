/**
 * 用于input元素，小写字母转大写字母
 * @param {Object} el 指令所绑定的元素，可以用来直接操作 DOM
 * ******
 * @const 使用示例：
 * <el-input v-model="form.marketCode" placeholder="请输入..." v-toUpperCase></el-input>
 */
function toUpperCase (el) {
  const $input = el.nodeName === 'INPUT' ? el : el.querySelector('input[type=text]')
  const value = $input.value
  if (!$input || !value) return
  $input.value = value.replace(/[a-z]/g, letter => letter.toUpperCase())
  // 根据v-model指令的原理，手动触发元素oninput事件
  $input.dispatchEvent(new Event('input'))
}

export default toUpperCase
