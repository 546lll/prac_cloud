import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入样式

import '@/assets/css/base.css' // 全局css样式
import '@/assets/icon/Common.css' // 公共字体图标
import '@/assets/icon/Login.css' // 登录页面字体图标
// 引入 mui 基本css样式
import '@/assets/mui/css/mui.css'
import mui from '@/assets/mui/js/mui.min.js' // 引入 mui js 文件


import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(Element)

import { Swipe, SwipeItem, Loading, Slider, ShareSheet, ActionSheet, Popup } from 'vant' // 轮播图组件

import 'vant/lib/index.css'

Vue.use(Loading) // 加载动画
Vue.use(Swipe) // 安装组件
Vue.use(SwipeItem)
Vue.use(Slider) // 滑动条
Vue.use(ShareSheet) // 分享组件
Vue.use(ActionSheet)  // 动作面板
Vue.use(Popup) // 弹出层


Vue.prototype.mui = mui

// 加载效果
import loading from '@/components/common/Loading'
Vue.use(loading)

// 引入 toast 组件
import toast from '@/components/common/toast'
Vue.use(toast)  // 安装 toast 组件

// 图片懒加载
import VueLazyLoad from 'vue-lazyload'
// 安装 VueLazyLoad
Vue.use(VueLazyLoad)
Vue.use(VueLazyLoad, {
  // preLoad: 1.3,   //预加载的宽高比
  // error: 'dist/error.png',//图片加载失败时使用的图片源
  loading: require('./assets/img/default.png'),//图片加载的路径
  // loading:require('./assets/mo.png'),
  // attempt: 1,
  // listenEvents:['scroll','wheel','mousewheel','resize','animationend','transitionend','touchmove'], //你想让vue监听的事件
})

Vue.prototype.$EventBus = new Vue() // 创建全局的事件总线
Vue.config.productionTip = false

import moment from 'moment'
// 全局过滤器
// 更改时间格式，从原始类型变换
Vue.filter('getTime', function(date, pattern="YYYY年MM月DD日"){
  // 调用 moment 方法传入时间 获取指定的时间
  // 调用 format 格式化时间
  return moment(date).format(pattern)
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
