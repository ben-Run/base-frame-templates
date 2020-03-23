const CryptoJS = require('crypto-js')

const key = CryptoJS.enc.Utf8.parse('graduateProcessi') // 十六位十六进制数作为密钥
const iv = CryptoJS.enc.Utf8.parse('processiGraduate') // 十六位十六进制数作为密钥偏移量

// 解密方法Aes
function DecryptAes (value) {
  let encryptedHexStr = CryptoJS.enc.Hex.parse(value)
  let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr)
  let decrypt = CryptoJS.AES.decrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 })
  let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
  return decryptedStr.toString()
}

// 加密方法Aes
function EncryptAes (value, key) {
  let srcs = CryptoJS.enc.Utf8.parse(value)
  let encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 })
  return encrypted.ciphertext.toString().toUpperCase()
}
// 解密方法base64
function DecryptBase64 (value) {
  let srcs = CryptoJS.enc.Base64.parse(value)
  return srcs.toString(CryptoJS.enc.Utf8)
}

// 加密方法base64
function EncryptBase64 (value) {
  let srcs = CryptoJS.enc.Utf8.parse(value)
  return CryptoJS.enc.Base64.stringify(srcs)
}

export default {
  DecryptAes,
  EncryptAes,
  DecryptBase64,
  EncryptBase64
}
