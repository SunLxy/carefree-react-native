/**
 * @description: 获取分页展示数据
 * @param {number} page 当前页数
 * @param {number} pageSize 每页总数
 * @param {number} total 总数
 * @param {number} around 当前范围展示
 * @return {*}
 */
export const getShowList = (
  page: number,
  pageSize: number,
  total: number,
  around: number,
) => {
  const totalSize = Math.ceil(total / pageSize)

  //  确保个数对的 默认 around + 1 + 2 +2  = ？

  const sumCount = around + 1 + 2 + 2
  // 1. 如果总数 就是 sumCount 直接返回个数值
  if (sumCount >= totalSize) {
    return Array.from({ length: sumCount }).map((_, inde) => inde + 1)
  }

  // 距离后面多少
  const next = totalSize - page
  // 距离前面多少
  const pre = page - 1
  let sum = 0
  // 1. 判断 前面距离  与 around 对比
  let preDot = true // 加不加 ···
  if (pre <= around) {
    preDot = false
    sum = sum + (around - pre) + 1
  }

  // 2. 判断后面距离  与 around 对比
  let nextDot = true // 加不加 ···
  if (next <= around) {
    nextDot = false
    sum = sum + (around - next) + 1
  }
  // 如果存在余数 则进行加数

  let arounds = around + sum

  // 始终取当前页的前后两个 第一个数和最后一个数
  const middle: (number | string)[] = [page]
  let i = 0
  while (i < arounds) {
    i++
    if (page - i > 1) {
      middle.unshift(page - i)
    }
    if (page + i < totalSize) {
      middle.push(page + i)
    }
  }

  if (preDot) {
    if (middle[0] === 2) {
      middle.unshift(1)
    } else {
      middle.unshift(1, '···')
    }
  } else {
    if (middle[0] !== 1) {
      middle.unshift(1)
    }
  }
  if (nextDot) {
    if (middle[middle.length - 1] === totalSize - 1) {
      middle.push(totalSize)
    } else {
      middle.push('···', totalSize)
    }
  } else {
    if (middle[middle.length - 1] !== totalSize) {
      middle.push(totalSize)
    }
  }
  return middle
}
