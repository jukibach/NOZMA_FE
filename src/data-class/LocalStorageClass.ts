import CryptoJS from 'crypto-js'

export type LocalStorageName = 'LANG' | 'X-XSRF-TOKEN' | 'LOCAL_USER'

export class LocalStorageClass {
  static getStorage<T>(name: LocalStorageName, defaultValue: T) {
    try {
      const data = localStorage.getItem(name)
      if (!data) {
        LocalStorageClass.setStorage(name, defaultValue)
        return defaultValue
      }
      const jsonData = JSON.parse(
        CryptoJS.AES.decrypt(data, 'NOZMA_6969').toString(CryptoJS.enc.Utf8) ??
          {}
      )
      return jsonData
    } catch (error) {
      console.error(error)
      return defaultValue
    }
  }

  static setStorage<T>(name: LocalStorageName, value: T) {
    try {
      const jsonData = CryptoJS.AES.encrypt( 
        JSON.stringify(value),
        'NOZMA_6969'
      ).toString()
      localStorage.setItem(name, jsonData)
    } catch (error) {
      console.error(error)
      return value
    }
  }

  static removeStorage<T>(name: LocalStorageName) {
    try {
      localStorage.removeItem(name)
    } catch (error) {
      console.error(error)
    }
  }
}
