/** 文本输入元素字数提示指令 */

// 将dom元素插入到el元素之后
const appendAfter = (el, dom) => {
  const parent = el.parentNode
  if (parent.lastChild === el) {
    parent.appendChild(dom)
  } else {
    parent.insertBefore(dom, el.nextSibling)
  }
}

// 创建提示文本盒子div函数
const createBoxDiv = () => {
  const $div = document.createElement('div')
  $div.id = 'v-maxlength-tips-directive'
  $div.style = 'color: #606266; text-align: right; line-height: 1.5'
  return $div
}

// 文本盒子
let $box = null

/**
 * 用于文本输入元素字数提示
 * ******
 * * const 使用示例：
 * <input type="textarea" v-model="value" maxlength="500" v-maxlength-tips="500" maxlength-tips-style="color:red"/>
 * @v-maxlength-tips参数：最大字数。如上例：v-maxlength-tips="500"表示最大字数为500
 * @maxlength-tips-style属性：设定动态字数的样式
 */
function maxlengthTips (el, binding, vnode) {
  const style = vnode.data.attrs['maxlength-tips-style']
  const $input = el.nodeName === 'INPUT' ? el : el.querySelector('input[type=text],input[type=textarea],textarea')
  const length = $input.value.replace(/\s+/g, '').length
  if (!$box) $box = createBoxDiv()
  $box.innerHTML = `<span style="${style}">${length}</span>/${binding.value}`
  appendAfter($input, $box)
}

export default maxlengthTips
