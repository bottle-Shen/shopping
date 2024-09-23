// utils/request.js 封装 axios 模块
// 封装axios用于发送请求
import axios from 'axios'
import { Toast } from 'vant'
import store from '@/store'
// 创建一个新的axios实例
const request = axios.create({
  // https://apifox.com/apidoc/shared-12ab6b18-adc2-444c-ad11-0e60f5693f66/doc-2221080
//   url: 'http://smart-shop.itheima.net/index.php?s=/api',
  // `url` 是用于请求的服务器 URL
  // 如果没有指定 method，请求将默认使用 get 方法。
  // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
  // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
  baseURL: 'http://smart-shop.itheima.net/index.php?s=/api',
  // `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
  // 如果请求话费了超过 `timeout` 的时间，请求将被中断
  timeout: 5000,
  headers: {
    platform: 'H5'
  }
})
// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做什么
  Toast.loading({
    message: '请求中...',
    forbidClick: true,
    loadingType: 'spinner',
    duration: 0
  })
  const token = store.getters.token
  if (token) {
    config.headers['Access-Token'] = token
    config.headers.platform = 'H5'
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
// 添加响应拦截器
request.interceptors.response.use(function (response) {
  const res = response.data
  if (res.status !== 200) {
    Toast(res.message)
    return Promise.reject(res.message)
  } else {
    // 清除 loading 中的效果
    Toast.clear()
  }
  // 对响应数据做点什么
  return res
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})
export default request
