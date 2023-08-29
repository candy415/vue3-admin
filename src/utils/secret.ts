/*
 * @Author: shi hong yu
 * @Date: 2023-06-14 17:01:52
 * @LastEditors: shi hong yu
 * @LastEditTime: 2023-06-14 18:45:01
 * @Description: 加密账号密码
/
/**
 * 加密（需要先加载lib/aes/aes.min.js文件）
 */
import CryptoJS from 'crypto-js'

export const encrypt = (token: string, word: string) => {
  const key = CryptoJS.enc.Utf8.parse(token)
  const srcs = CryptoJS.enc.Utf8.parse(word)
  const encrypted = CryptoJS.AES.encrypt(srcs, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  const hexStr = encrypted.ciphertext.toString().toUpperCase()

  const oldHexStr = CryptoJS.enc.Hex.parse(hexStr)
  // 将密文转为Base64的字符串
  const base64Str = CryptoJS.enc.Base64.stringify(oldHexStr)
  // 这里根据需求返回 base64Str 或 hexStr(解密时有小小差别)
  return base64Str
}
/**
 * 解密
 */
export const decrypt = (token: string, word: string) => {
  const key = CryptoJS.enc.Utf8.parse(token) // 十六位十六进制数作为密钥
  const decrypt = CryptoJS.AES.decrypt(word, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
  return decryptedStr
}
