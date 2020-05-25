/**
 * @function 克隆方法
 * @param {Array} arr 
 * @returns {Array}
 */
const clone = (arr) => {
    try {
        return JSON.parse(JSON.stringify(arr))
    } catch (e) {
        console.log(e)
    }
}
/**
 * @function 找出所有的组合（没有去重）
 * @param {Array} arr 
 * @returns {Array} res
 */
const createAll = (arr) => {
    const len = arr.length
    let res = []
    if (len < 3) {
        return res
    }
    let arr1 = clone(arr)
    for (let i = 0; i < arr1.length; i++) {
        let arr2 = clone(arr)
        arr2.splice(i, 1)
        for (let j = 0; j < arr2.length; j++) {
            let arr3 = clone(arr)
            arr3.splice(i, 1)
            arr3.splice(j, 1)
            for (let k = 0; k < arr3.length; k++) {
                let tempArr = []
                tempArr[0] = arr1[i]
                tempArr[1] = arr2[j]
                tempArr[2] = arr3[k]
                res.push(tempArr)
            }
        }
    }
    return res
}
/**
 * @function 找出所有的组合（没有去重） 这一版，优化了，减少了内存占用
 * @param {Array} arr 
 * @returns {Array} res
 */
const createAll1 = (arr) => {
    const len = arr.length
    let res = []
    if (len < 3) {
        return res
    }
    let arr1 = clone(arr)
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length; j++) {
            if (j == i) {
                continue
            }
            for (let k = 0; k < arr.length; k++) {
                if (k == i || k == j) {
                    continue
                }
                let tempArr = []
                tempArr[0] = arr[i]
                tempArr[1] = arr[j]
                tempArr[2] = arr[k]
                res.push(tempArr)
            }
        }
    }
    return res
}
/**
 * @function 生成json
 * @param {Array} res 
 * @returns {Object} json
 */
const createJson = (res) => {
    let json = {}
    for (let i = 0; i < res.length; i++) {
        let item = res[i]
        let num = item.reduce((total, currentValue) => {
            total += currentValue
            return total
        })
        if (typeof json[num] === 'undefined') {
            json[num] = [item]
        } else {
            json[num].push(item)
        }
    }
    return json
}
/**
 * @function 生成key
 * @param {Object} json 
 * @param {Number} n 
 */
const createKey = (json, n) => {
    let key
    let keys = Object.keys(json).sort((v1, v2) => {
        return v1 - v2
    })
    let len = keys.length
    for (let i = 0; i < len; i++) {
        if (keys[i] == n) {
            key = n
            break
        }
        if (i > 0) {
            let tempKeyStart = keys[i - 1]
            let tempKeyEnd = keys[i]
            if (tempKeyStart < n && n < tempKeyEnd) {
                if (n - tempKeyStart > tempKeyEnd - n) {
                    key = tempKeyEnd
                } else {
                    key = tempKeyStart
                }
                break
            }
        }
        if (i === len - 1) {
            if (typeof key === 'undefined') {
                if (Math.abs(keys[0] - n) > Math.abs(keys[len - 1] - n)) {
                    key = keys[len - 1]
                } else {
                    key = keys[0]
                }
            }
        }
    }
    return key
}
/**
 * @function 实现一个算法getClosest3Nums，从数组中找出3个元素，使这三个元素之和最接近于给定的数n。
 * @param {Number} n 
 * @param {Array} arr 
 * @returns {Array} array
 */
const getClosest3Nums = (n, arr) => {
    let array = []
    // let res = createAll(arr)
    let res = createAll1(arr)
    let json = createJson(res)
    let key = createKey(json, n)
    if (typeof json[key] != 'undefined') {
        array = json[key]
    }
    return array
}

//求值
// const result = getClosest3Nums(0, [1, -1, -2, -3, 0, 2, 1])
const result = getClosest3Nums(0, [1, -1, 0])
console.log(result)