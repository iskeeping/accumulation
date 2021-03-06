/**
 * @param arr,parentId
 * @return children
 */

let findChildren = function (arr, parentId) {
  let children = []
  for (let i = 0; i < arr.length; i++) {
    let item = arr[i]
    if (item.parentId === parentId) {
      children.push(item)
    }
  }
  return children
}

/**
 * @param arr
 * @return tree structure
 */

let createTree = function (arr, rootId) {
  let children = findChildren(arr, rootId)
  if (children.length <= 0) {
    return
  }
  for (let i = 0; i < children.length; i++) {
    let childTree = createTree(arr, children[i].id)
    if (childTree) {
      children[i]['children'] = childTree
    }
  }
  return children
}

let arr = [
  {
    id: 1,
    parentId: 0,
    name: '根节点'
  },
  {
    id: 2,
    parentId: 1,
    name: '节点2'
  },
  {
    id: 3,
    parentId: 1,
    name: '节点3'
  },
  {
    id: 4,
    parentId: 1,
    name: '节点4'
  },
  {
    id: 5,
    parentId: 2,
    name: '节点5'
  },
  {
    id: 6,
    parentId: 2,
    name: '节点6'
  },
  {
    id: 7,
    parentId: 2,
    name: '节点7'
  }
]

let tree = createTree(arr, 0)
console.log(JSON.stringify(tree))
