/**
 * @description:  直接调用  debounce((e)=>fun(e))("测试")
 * @param {*}
 * @return {*}
 */
const debounce = (fun: Function, delay = 500): any => {
  let timer = null
  return function () {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fun.apply(this, arguments)
      clearTimeout(timer)
    }, delay)
  }
}
export default debounce
