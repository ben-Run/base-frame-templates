const toFocus = function (el, binding, vnode) {
  if (el) {
    const input = el.querySelector('input')
    if (input) {
      input.focus()
    }
  }
}
export default {
  bind (el, binding) {
    toFocus(el, binding)
  },
  componentUpdated (el, binding) {
    toFocus(el, binding)
  }
}
