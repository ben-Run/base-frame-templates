/**
 * 判断val是否为函数
 * @function isFunction
 * @param {*} val - 需要判断的变量值
 * @return {boolean}
 * @example
 * isFunction(5)
 * // => false
 *
 * isFunction(function () {})
 * // => true
 */
export const isFunction = val => typeof val === 'function'

/**
 * 判断val是否为数字
 * @function isNumber
 * @param {*} val - 需要判断的变量值
 * @return {boolean}
 * @example
 * isNumber(5)
 * // => true
 *
 * isNumber('5')
 * // => false
 */
export const isNumber = val => typeof val === 'number'

/**
 * 判断val是否为字符串
 * @function isString
 * @param {*} val - 需要判断的变量值
 * @return {boolean}
 * @example
 * isString(5)
 * // => false
 *
 * isString('5')
 * // => true
 */
export const isString = val => typeof val === 'string'

/**
 * 判断val是否为布尔类型
 * @function isBoolean
 * @param {*} val - 需要判断的变量值
 * @return {boolean}
 * @example
 * isBoolean(5)
 * // => false
 *
 * isBoolean(true)
 * // => true
 */
export const isBoolean = val => typeof val === 'boolean'

/**
 * 判断arr是否为数组类型
 * @function isArray
 * @param {*} arr - 需要判断的变量值
 * @return {boolean}
 * @example
 * isArray(5)
 * // => false
 *
 * isArray([])
 * // => true
 */
export const isArray = arr => Array.isArray(arr)

/**
 * 判断obj是否为对象
 * @function isObject
 * @param {*} obj - 需要判断的变量值
 * @return {boolean}
 * @example
 * isObject(5)
 * // => false
 *
 * isObject({})
 * // => true
 */
export const isObject = obj => obj instanceof Object && !isArray(obj)

/**
 *时间格式化
 *
 * @export
 * @param {*} time
 * @param {*} format
 * @returns
 */
export function formatTime (time, format) {
  if (!time) {
    return ''
  }
  // 判断是否IE进行日期格式处理，IE不支持yyyy-MM之类的格式
  if (IEVersion() && isString(time) && time.indexOf('-') !== -1) {
    time = time.replace(/-/g, '/')
  }

  const t = new Date(time)

  const tf = function (i) {
    return (i < 10 ? '0' : '') + i
  }
  return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
    switch (a) {
      case 'yyyy':
        return tf(t.getFullYear())
      case 'MM':
        return tf(t.getMonth() + 1)
      case 'mm':
        return tf(t.getMinutes())
      case 'dd':
        return tf(t.getDate())
      case 'HH':
        return tf(t.getHours())
      case 'ss':
        return tf(t.getSeconds())
    }
  })
}

/**
 * 替换掉全部逗号
 * @param {String} value 带逗号的数字字符串
 */
export const replaceComma = value => {
  value = isString(value) ? value : value.toString()
  return value.replace(new RegExp(',', 'gm'), '')
}

/**
 * 检查日期dateA是否在dateB之后
 * @function isAfterDate
 * @param {*} dateA - 较后的日期
 * @param {*} dateB - 较前的日期
 * @returns {boolean}
 * @example
 * isAfterDate(new Date(2010, 10, 21), new Date(2010, 10, 20))
 * // => true
 *
 * isAfterDate('2010-10-21', '2010-10-20')
 * // => true
 */
export const isAfterDate = (dateA, dateB) => new Date(dateA) > new Date(dateB)

/*
 防抖，防止快速重复点击
 */
export function throttle (fn, wait = 500, scope) {
  clearTimeout(throttle.timer)
  throttle.timer = setTimeout(function () {
    fn.apply(scope)
  }, wait)
}
/**
 * 格式化为带千分位的字符
 * @param [String|Number] value 数字或字符串数字
 * 实例：
 * 字符串数字  formatThousandValue ('-10548.185458fg') => -10,548.185458
 * 数字 formatThousandValue (-10548.185) => -10,548.185
 * 非数字字符串 formatThousandValue ('fdg54848') => NaN
 * type整数仍保留两位小数
 */
export const formatThousandValue = (value, digit, round) => {
  value = isNumber(value) ? value : Number(value)
  if (!value) return value === 0 ? '0' : ''
  if (round) value = Number(value.toFixed(digit))
  let arr = value.toString().split('.')
  arr[0] = arr[0].replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
  if (!round && digit && arr[1] && arr[1].length > digit) arr[1] = arr[1].substring(0, digit)
  return arr.join('.')
}

/**
 * 计算字符串中前start长度中有多少个,号
 * @param {String} value 被计算的字符串
 * @param {Number} start 字符串的结束位置
 */
function getCountComma (value, start) {
  let count = 0
  let strOne = String(value).substring(0, start)
  if (strOne && strOne.indexOf(',') !== -1) {
    let arry = strOne.split(',')
    count = arry.length - 1
  }
  return count
}

/**
 * 1、input中使用
 * 2、把数据格式化为带千分位
 * 3、自动移除中英文字符
 * @param {Object} event 触发事件的对象
 * @param {Object} me 当前组件this对象
 */
export function formatThousands (event, me) {
  let obj = event.target
  // 异常处理--浏览器不支持selectionStart时
  if (obj.selectionStart === undefined) {
    try {
      obj.selectionStart = 1
    } catch (error) {
      console.error('function formatThousands throws:', error)
    }
    return false
  }
  // 光标起始位置
  let start = obj.selectionStart
  let value = obj.value
  let leng1 = value.length // 移除字母前的长度
  value = value.replace(/[\u4e00-\u9fa5a-zA-Z]/g, '')
  let leng2 = value.length // 移除字母后的长度
  // 处理前光标前的逗号数量
  let commaNumBefore = getCountComma(value, start)
  // 格式化数据
  value = replaceComma(value)
  value = formatThousandValue(value)
  // 处理后光标前的逗号数量
  let commaNumAfter = getCountComma(value, start)
  let leng = commaNumAfter - commaNumBefore // 光标需要移动数值：负数往左移，正数往右移
  leng -= (leng1 - leng2)
  // 根据name设置数据值
  let name = obj.name
  if (value === 0) {
    value = ''
  }
  if (name) {
    if (name.indexOf('.') !== -1) { // 如果存在两级对象属性
      let names = name.split('.')
      if (names.length === 2) {
        /**
         * !!!必须加nextTick才会生效
         * 1、原理说明：
         *  a, 例如原值为'200'，此时data中绑定属性（假设为val）和dom中显示值（假设为value）都是200；
         *  b, 在dom中输入字母'f'，触发此方法，value值为'200f'，此时val仍为200；
         *  c, 本函数把value中的'f'移除，value变为'200'，再重新赋值给data中的val，此时value和val值相同；
         *  d, 在vue中如果赋值前后值相同时不会触发dom的更新，所以无法达成效果。
         * 2、解决方案：
         *  利用nextTick方法，在data中的val被更新后再赋值，此时val值为200f，与value不同
         */
        me.$nextTick(() => {
          me[names[0]][names[1]] = value
          /**
           * 赋值后完成了dom更新再重新定位光标
           * 不使用nextTick时定位语句总是会在vue的更新触发前执行，光标定位失效
           */
          me.$nextTick(() => {
            obj.selectionStart = start + leng
            obj.selectionEnd = start + leng
          })
        })
      }
    } else {
      me[name] = value
    }
  }
}

/**
 * 获取当月份的总天数
 * @params {*} 日期
 * @returns {Number} 当月天数
 */
export const getCountDays = (value = new Date()) => {
  const d = new Date(value)
  const m = d.getMonth() + 1
  d.setMonth(m)
  d.setDate(0)
  return d.getDate()
}
/**
 * 数字保留小数函数
 * @param num{String or Number}
 * @param digit{Number | 0~20 } | 保留的小数位数
 * @param fixed{Boolean} | 是否保留末位0
 * @returns {Number}
 */
export function keepFixed (num, digit, fixed) {
  // 转化为字符串，且只保留数字和‘.’号
  num = num.toString().replace(/[^-|\d.]/g, '')
  let arr = num.split('.')
  num = parseFloat(arr[0] + '.' + (arr[1] || '')).toFixed(digit)
  if (!fixed) num = parseFloat(num)
  return num
}
/**
 * 保留两位小数
 * @param value{String or Number}
 * @returns {Number}
 */
export function foramtDecimal (value, number = 2) {
  try {
    if (value === '' || isBoolean(value) || isNaN(Number(value).toFixed(2))) return ''
    return Number(value).toFixed(number, 10)
  } catch (e) {
    return null
  }
}
/**
 * @param {*} source
 * @returns obj ()
 */
export function deepClone (source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'shallowClone')
  }
  const newObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach((keys) => {
    if (source[keys] && typeof source[keys] === 'object') {
      newObj[keys] = deepClone(source[keys])
    } else {
      newObj[keys] = source[keys]
    }
  })
  return newObj
}
// 新版千分位
export function newFormatThousandValue (value, round = 0) {
  value = isNumber(value) ? value : Number(value)
  if (value === 0) return 0
  if (!value) return ''
  if (round) value = value.toFixed(round)
  let arr = value.toString().split('.')
  arr[0] = arr[0].replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
  if (!round && arr[1] && arr[1].length > round) arr[1] = arr[1].substring(0, round)
  return arr.join('.')
}

// 是否外部链接
export const isExternal = path => (/^(https?:|mailto:|tel:)/.test(path))

/**
 * 判断ie版本
 */
export const IEVersion = () => {
  const userAgent = navigator.userAgent
  const isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1
  const isEdge = userAgent.indexOf('Edge') > -1 && !isIE
  const isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1
  return isIE || isEdge || isIE11
}

/**
 * 初始化数组函数
 * @function initArray
 * @param {number} len - 数组的长度length
 * @param {*} value - 可选，默认为null，初始化数组的值。当为函数时数组的值为函数的返回值，该函数有i和数组长度len两个参数
 * @return {array}
 * @example
 * initArray(3)
 * // => [null, null, null]
 *
 * initArray(3, i => i)
 * [0, 1, 2]
 */
export const initArray = (len, value = null) => (
  !isFunction(value) ? Array.from({
    length: len
  }).fill(value) : Array.from({
    length: len
  }, (item, i) => value(i, len))
)

/**
 * 为对象分配默认值
 * @function defaults
 * @param {object} obj - 默认对象（提供默认值）
 * @param {...object} defs - 对象源（用于扩展默认对象）
 * @return {object}
 * @example
 * defaults({a: 1, b: 2}, {b: 3}, {c: 5})
 * // => {a: 1, b: 2, c: 5}
 */
export const defaults = (obj, ...defs) => Object.assign({}, obj, ...defs.reverse(), obj)

/**
 * 重命名对象key名称
 * @function renameKeys
 * @param {object} map - 由oldKey: newKey键值对组成的检索对象
 * @param {object} obj - 目标对象
 * @return {object}
 * @example
 * const obj = {name: 'john', age: 30}
 * renameKeys({name: 'firstName'}, obj)
 * // => {firstName: "john", age: 30}
 */
export const renameKeys = (map, obj) => (
  Object.keys(obj).reduce((acc, key) => ({
    ...acc,
    ...{
      [map[key] || key]: obj[key]
    }
  }), {})
)
/**
 * 随机数
 * @param min{Number}
 * @param max{Number}
 * @returns {Number}
 */
export function getRandom (min = 1, max = 99999) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}
// 导出
export function downFile (data, fileName = '导出数据.xlsx') {
  // application/vnd.openxmlformats-officedocument.spreadsheetml.sheet这里表示xlsx类型
  let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' })
  const elink = document.createElement('a')
  elink.download = fileName
  elink.style.display = 'none'
  elink.href = URL.createObjectURL(blob)
  document.body.appendChild(elink)
  elink.click()
  document.body.removeChild(elink)
}
