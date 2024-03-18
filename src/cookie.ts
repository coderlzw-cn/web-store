interface Cookie {
  key: string // 键
  value: string // 值
  expires?: string // 过期时间
  maxAge?: number // 最大存活时间
  path?: string // 路径
  domain?: string // 域
  secure?: boolean // 安全
}

export const setCookie = (cookie: Cookie): void => {
  let str = cookie.key + '=' + cookie.value
  if (cookie.expires != null) {
    str += ';expires=' + new Date(cookie.expires).toUTCString()
  }
  if (cookie.maxAge != null) {
    str += ';max-age=' + cookie.maxAge
  }
  if (cookie.path != null) {
    str += ';path=' + cookie.path
  }
  if (cookie.domain != null) {
    str += ';domain=' + cookie.domain
  }
  if (cookie.secure === true) {
    str += ';secure'
  }
  document.cookie = str
}

export const getCookie = (key: string): string | null => {
  const arr = document.cookie.split('; ')
  for (let i = 0; i < arr.length; i++) {
    const arr2 = arr[i].split('=')
    if (arr2[0] === key) {
      return arr2[1]
    }
  }
  return null
}

export const removeCookie = (key: string): void => {
  setCookie({
    key,
    value: '0',
    expires: '1970-01-01 00:00:00'
  })
}

export const clearCookie = (): void => {
  const keys = document.cookie.match(/[^ =;]+(?==)/g)
  if (keys != null) {
    for (let i = keys.length; (i--) !== 0;) document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
  }
}
