declare global {
  var Person: string // 声明全局变量
  function request(url: RequestInfo, options: RequestInit): Promise<Response> // 声明全局方法
  var foo: string
}

global.Person = '222'
global.request = (url: RequestInfo, options?: RequestInit) => {
  // eslint-disable-next-line no-console
  console.log(url, options)
  return fetch(url, options)
}
export default global
