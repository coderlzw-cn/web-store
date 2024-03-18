import CryptoJS from 'crypto-js'

type StorageType = 'sessionStorage' | 'localStorage'

interface EncryptedStorageData<K, V> {
  key: K
  value: V
  type: StorageType
  expire?: number
  encrypt: true
  secretKey: string
}

interface UnencryptedStorageData<K, V> {
  key: K
  value: V
  type: StorageType
  expire?: number
  encrypt?: false
  secretKey?: never
}

type StorageData<K, V> = EncryptedStorageData<K, V> | UnencryptedStorageData<K, V>

interface StorageDataWithTime {
  value: unknown
  expire?: number
  time?: number
}

/**
 * 存储值到本地
 * @param data
 */
export const setStorage = <V = unknown, K extends string = never>(data: StorageData<K, V>): void => {
  const {
    key,
    value,
    type,
    expire,
    encrypt = false,
    secretKey
  } = data
  if (expire != null && isNaN(expire)) throw new Error('expire must be a number')
  if (expire != null && expire <= 0) throw new Error('expire must be greater than 0')
  const storageData = (expire != null)
    ? {
        value,
        time: Date.now(),
        expire
      }
    : { value }

  let stringValue: string
  if (encrypt) {
    if (secretKey == null) {
      throw new Error('secretKey must be provided when encrypt is true')
    }
    const string = JSON.stringify(storageData)
    stringValue = CryptoJS.AES.encrypt(string, secretKey).toString()
  } else {
    stringValue = JSON.stringify(storageData)
  }

  window[type].setItem(key, stringValue)
}

/**
 * 获取本地存储的值
 * @param key
 * @param type
 * @param secretKey
 */
export const getStorage = <V = unknown, K extends string = string>({
  key,
  type,
  secretKey
}: {
  key: K
  secretKey?: string
  type: StorageType
}): V | null => {
  const storageValue = window[type].getItem(key)
  if (storageValue === null) return null
  let jsonData: StorageDataWithTime
  try {
    let decryptedValue = storageValue
    if (secretKey != null) {
      const bytes = CryptoJS.AES.decrypt(storageValue, secretKey)
      decryptedValue = bytes.toString(CryptoJS.enc.Utf8)
    }
    jsonData = JSON.parse(decryptedValue) as StorageDataWithTime
  } catch (e) {
    return storageValue as V
  }
  const nowTime = Date.now()

  // 如果存有过期时间，过期删除
  if ((jsonData.expire != null) && (jsonData.time != null) && jsonData.expire < nowTime - jsonData.time) {
    window[type].removeItem(key)
    return null
  } else {
    return jsonData.value as V
  }
}

// 获取所有值
export const getAllStorage = (type: StorageType): Record<string, never> => {
  const storage = window[type]
  const storageObject: Record<string, never> = {}
  for (let i = 0; i < storage.length; i++) {
    const key = window[type].key(i)
    if (key != null) {
      // storageObject[key] = getStorage({ key, type })
      console.log('hello')
    }
  }
  return storageObject
}

export const removeStorage = ({
  key,
  type
}: { key: string, type: StorageType }): void => {
  window[type].removeItem(key)
}

export const clearStorage = (type: StorageType): void => {
  window[type].clear()
}
