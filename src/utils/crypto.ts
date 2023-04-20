import { CRYPTO_KEY } from './../config/common'
import CryptoJS from 'crypto-js'

/**
 * @param message {string} 需要加密的内容
 * @param key {string} 加密的key
 */
export const encrypt = (message: string, key: string = CRYPTO_KEY) => {
  return CryptoJS.AES.encrypt(message, CryptoJS.enc.Utf8.parse(key), {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  }).toString()
}
