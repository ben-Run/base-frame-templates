// 判断当前终端是否是App终端
export function isApp () {
  if (window.nintf || window.location.href.indexOf('isApp') > -1 || navigator.userAgent.indexOf('ibaApp') !== -1) {
    return true
  } else {
    return false
  }
}

// 判断当前终端是否是ios终端
export function isIOS () {
  return navigator.userAgent.indexOf('ibaAppIOS') !== -1
}

// 判断当前终端是否是微信终端
export function isWeixin () {
  var ua = window.navigator.userAgent.toLowerCase()
  if (ua.match(/MicroMessenger/i) === 'micromessenger') {
    return true
  } else {
    return false
  }
}
