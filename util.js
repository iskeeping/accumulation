const Util = function () {
  this.version = '1.0'
}

Util.prototype = {
  isEmpty: function (field) {
    //判断值是否为空
    if (typeof field == 'undefined' || ('' + field).trim() == '') {
      return true
    }
    return false
  },
  isNumber: function (field) {
    //判断值是否为数字
    let fieldV = parseFloat(field)
    if (typeof field !== 'undefined' && isNaN(fieldV) === false && field == fieldV) {
      return true
    }
    return false
  },
  isPhone: function (phone) {
    // 手机号校验
    let reg = /^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/
    return reg.test(phone)
  },
  clone: function (jsonObj) {
    // 深度克隆
    try {
      return JSON.parse(JSON.stringify(jsonObj))
    } catch (e) {
      return {}
    }
  },
  toFixed: function (num, decimal) {
    // 数字保留num 保留decimal位小数 并进行四舍五入
    function _round(num, decimal) {
      if (isNaN(num)) {
        return 0
      }
      const p1 = Math.pow(10, decimal + 1)
      const p2 = Math.pow(10, decimal)
      return Math.round(num * p1 / 10) / p2
    }

    return _round(num, decimal).toFixed(decimal)
  },
  createYMD: function (timestamp) {
    // 根据时间戳获取年月日 如果没有时间戳 则获取当前的时间戳
    let date
    if (isNaN(timestamp)) {
      date = new Date()
    } else {
      date = new Date(timestamp)
    }
    let y = date.getFullYear()
    let m = date.getMonth() + 1
    let d = date.getDate()
    return [y, m, d].join('.')
  },
  requestTry: function (promise, totalCount) {
    /***
     * @param promise 返回值是Promise实例的函数
     * @param totalCount 异步操作或者异步请求重试总次数
     */
    // 重试某个异步操作多少次
    // 最少一次
    // 最多time次
    function _delay(second = 1000) {
      // 延迟second
      return new Promise((resolve) => {
        setTimeout(function () {
          resolve()
        }, second)
      })
    }

    function _recursion(promise, resolve, reject, count, totalCount) {
      //异步递归逻辑
      _delay().then(() => {
        promise().then((res) => {
          resolve(res)
        }).catch((err) => {
          if (count > totalCount) {
            reject(err)
            return
          }
          _recursion(promise, resolve, reject, count + 1, totalCount)
        })
      })
    }

    return new Promise((resolve, reject) => {
      let count = 1
      promise().then((res) => {
        resolve(res)
      }).catch((err) => {
        if (count > totalCount) {
          reject(err)
          return
        }
        _recursion(promise, resolve, reject, count + 2, totalCount)
      })
    })
  }
}
