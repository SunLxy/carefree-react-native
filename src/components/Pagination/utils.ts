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
  // 始终取当前页的前后两个 第一个数和最后一个数
  const totalSize = Math.ceil(total / pageSize)
  const middle: (number | string)[] = [page]
  let i = 0
  while (i < around) {
    i++
    if (page - i) {
      middle.unshift(page - i)
    }
    if (page + i) {
      middle.push(page + i)
    }
  }
  // 判断首位是否是 1
  if (middle[0] !== 1) {
    middle.unshift(...[1, '···'])
  }
  // 判断最后一位是否是 totalSize
  if (middle[middle.length - 1] !== totalSize) {
    middle.push(...['···', totalSize])
  }
  return middle
}
