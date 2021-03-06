class mUtil {
  request(param) {
    return new Promise((resolve, reject) => {
      $.ajax({
        type: param.type || 'get',
        url: param.url || '',
        dataType: param.dataType || 'json',
        data: param.data || '',
        success: res => {
          if(res.status === 0) {
            typeof resolve === 'function' && resolve(res.data, res.msg)
          } else if(res.status === 10) {
            this.doLogin()
          } else {
            typeof reject === 'function' && reject(res.msg || res.data)
          }
        },
        error: err => {
          typeof reject === 'function' && reject(err.statusText)
        }
      })
    })
  }
  doLogin() {
    window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname)
  }
  // 获取url参数
  getUrlParam(name) {
    // xxxx.com?param=123&param1=34
    let queryString = window.location.search.split('?')[1] || '',
        reg = new RegExp('(^|&)' + name + '=([^&])(&|$)*'),
        result = queryString.match(reg)
    console.log(result)
    return result ? decodeURIComponent(result[2]) : null
  }
  // 错误提示
  errorTips(errMsg) {
    alert(errMsg || '好像哪里不对了~')
  }
  // 成功提示
  successTips(successMsg) {
    alert(successMsg || '操作成功~')
  }
  setStorage(name, data) {
    let dataType = typeof data
    // json对象
    if(dataType === 'object') {
      window.localStorage.setItem(name, JSON.stringify(data))
    // 基础类型
    } else if(['number', 'string', 'boolean'].indexOf(dataType) >= 0) {
      window.localStorage.setItem(name, data)
    } else {
      alert('该类型不支持本地存储')
    }
  }
  // 取出存储内容
  getStorage(name) {
    let data = window.localStorage.getItem(name)
    if(data) {
      return JSON.parse(data)
    } else {
      return ''
    }
  }
  // 删除本地存储
  deleteStorage(name) {
    window.localStorage.removeItem(name)
  }
}

export default mUtil