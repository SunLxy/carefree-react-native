declare global {
  function request(url: RequestInfo, options: RequestInit): Promise<Response> // 声明全局方法
}
export default global
