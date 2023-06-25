// 获取cookie
export function getCookie(name) {
  const strcookie = document.cookie // 获取cookie字符串
  const arrcookie = strcookie.split('; ') // 分割
  // 遍历匹配
  // tslint:disable-next-line: prefer-for-of
  for (let i = 0; i < arrcookie.length; i++) {
    const arr = arrcookie[i].split('=')
    if (arr[0] === name) {
      return arr[1]
    }
  }

  return ''
}

// 设置cookie
export function setCookie(name, value, day = 0, path = '/') {
  const d = new Date()
  if (day === 0) {
    window.document.cookie = name + '=' + value + ';path=' + path + ';'
  } else {
    d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * day)
    window.document.cookie = name + '=' + value + ';path=' + path + ';expires=' + d.toUTCString()
  }
}

/**
 * 删除cookie 使cookie过期
 * @param name 需要删除的cookie的key
 * @param path 指定cookie的path
 */
export function deleteCookie(name, path = '/') {
  const value = getCookie(name)
  if (value !== null) {
    const d = new Date()
    d.setTime(d.getTime() - 1)
    window.document.cookie = name + '=' + value + ';path=' + path + ';expires=' + d.toUTCString()
  }
}
