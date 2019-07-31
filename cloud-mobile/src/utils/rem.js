/* set font-size
 * @Author: bensong.long
 * @Date: 2019-07-30 09:48:54
 * @Last Modified by: bensong.long
 * @Last Modified time: 2019-08-01 00:27:32
 */
function setRem (doc, win) {
  const docEl = doc.documentElement
  let resizeEvent = 'orientationchange' in window ? 'orientationchange' : 'resize'
  let reCaculate = function () {
    let clientWidth = docEl.clientWidth
    if (!clientWidth) return
    if (clientWidth >= 750) {
      docEl.style.fontSize = '200px' // 超过750px设固定值
    } else {
      // 375 具体根据设计稿调整
      docEl.style.fontSize = 100 * (clientWidth / 375) + 'px'
      clientWidth = docEl.clientWidth
      docEl.style.width = clientWidth
    }
  }
  if (!doc.addEventListener) return
  win.addEventListener(resizeEvent, reCaculate, false)
  doc.addEventListener('DOMContentLoaded', reCaculate, false)
}
export default setRem
