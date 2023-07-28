import axios from 'axios'
import Vue from 'vue'
import vuex from '../store/index'
import toast from '@/components/common/toast/index.js'

const http = axios.create({
  baseURL: '/api',
  timeout: 60000,
  withCredentials: true
})

// 请求拦截器
http.interceptors.request.use(function (config) {
  Vue.prototype.$loading.loadingShow() // 显示加载动画
  return config
}, function (err) {
  console.log(err)
  // return Promise.reject(err)
})
// 响应拦截器
http.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  Vue.prototype.$loading.loadingNo() // 隐藏动画
  const code = response.data.code
  if (code !== 200 && !(code >= 800 && code <= 803)) {
    toast.show('未知错误, 请打开控制台查看')
  }
  return response
}, function (err) {
  console.log([err])
  if (err.response.data.msg === '需要登录') {
    // cookie过期 退出登录
    // console.log(window.localStorage.getItem("userInfo"));
    // window.localStorage.setItem("userInfo", "");
    // 刷新页面
    // history.go(0)
    // 修改当前的登录状态
    vuex.state.isLogin = false
  } else {
    // console.log(err.response.data.msg);
    toast.show(err.response.data.message || '未知错误, 请打开控制台查看')
  }
})

export default http
