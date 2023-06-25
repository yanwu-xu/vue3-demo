import _ from 'lodash'
/**
 * 获取url中的参数值
 * @param name 参数名称
 */
export function getQueryString(name) {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  const r = window.location.search.substr(1).match(reg)
  if (r != null) {
    return unescape(r[2])
  }
  return null
}
/**
 * 删除url中的指定参数并返回新url
 * @param url 需要截取的url
 * @param ref 需要删除的参数名称
 */
export function delQueryString(url, ref, isEnCode = false) {
  let str = ''
  let newUrl = ''
  let hash = ''
  if (url.indexOf('#') !== -1) {
    hash = url.substr(url.indexOf('#'))
    url = url.split(hash)[0]
  }
  if (url.indexOf('?') !== -1) {
    str = url.substr(url.indexOf('?') + 1)
  } else {
    newUrl = url
  }

  let returnurl = ''
  if (str.indexOf('&') !== -1) {
    const arr = str.split('&')
    if (!arr.length) return
    let index
    for (index in arr) {
      if (arr[index].split('=')[0] !== ref) {
        returnurl = returnurl + arr[index].split('=')[0] + '=' + arr[index].split('=')[1] + '&'
      }
    }
    newUrl = url.substr(0, url.indexOf('?')) + '?' + returnurl.substr(0, returnurl.length - 1)
  } else {
    const arr = str.split('=')
    if (arr[0] === ref) {
      newUrl = url.substr(0, url.indexOf('?'))
    } else {
      newUrl = url
    }
  }
  newUrl = newUrl + hash
  return isEnCode ? encodeURIComponent(newUrl) : newUrl
}

export function getBase64(files) {
  return new Promise((resolve, reject) => {
    try {
      const file = files
      // 判断是否是图片类型
      /* if (!/image\/\w+/.test(file.type)) {
        alert("只能选择图片");
        return false;
    } */
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = function () {
        resolve(this.result)
        // resolve(this.result.substring(this.result.indexOf(',') + 1))
      }
    } catch (error) {
      reject(error)
    }
  })
}

export function queryParams(params) {
  let paramStr = ''
  Object.keys(params).forEach(item => {
    if (paramStr === '') {
      paramStr = `${item}=${params[item]}`
    } else {
      paramStr = `${paramStr}&${item}=${params[item]}`
    }
  })
  return paramStr
}

// 遍历子应用路由
export function mapRoutes(routes, matched = []) {
  routes.forEach(i => {
    const { enTitle, zhTitle, title } = i.meta || {}
    i.matched = [_.cloneDeep(i), ...matched]
    i.meta = {
      ...(i.meta || {}),
      newTitle: (localStorage.getItem('lang') === 'en_US' ? enTitle : zhTitle) || title,
    }
    if (i.children?.length) {
      mapRoutes(i.children, i.matched)
    }
  })

  return routes
}
