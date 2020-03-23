// 自定义返回格式
const formatters = (val, format) => {
  if (typeof (format) === 'function') {
    return format(val)
  } else return val
}
// 过滤器集合
const Filters = {
  'formatters': formatters
}
export default {
  install (Vue, opts = {}) {
    Object.keys(Filters).forEach(k => {
      Vue.filter(k, Filters[k])
    })
  }
}
