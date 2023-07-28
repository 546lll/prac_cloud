import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
// 解决编程式路由往同一地址跳转时会报错的情况
const originalPush = VueRouter.prototype.push
const originalReplace = VueRouter.prototype.replace

// push
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

// replace
VueRouter.prototype.replace = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject)
  return originalReplace.call(this, location).catch(err => err)
}

const routes = [
  { path: '/', redirect: '/discover' },
  // 发现
  { path: '/discover', name: 'discover', component: () => import('@/views/discover/Discover.vue') },
  { path: '/discover/moreSheet', name: 'moreSheet', component: () => import('@/views/discover/compchildren/moreComps/MoreSheet.vue') },
  // 我的
  {
    path: '/myMessage',
    name: 'myMessage',
    component: () => import('@/views/myMessage/MyMessage.vue')
  },
  // 云村
  {
    path: '/cloudVillage',
    name: 'cloudVillage',
    component: () => import('@/views/cloudVillage/CloudVillage.vue')
  },
  // 视频
  {
    path: '/video',
    name: 'video',
    component: () => import('@/views/video/Video.vue')
  },
  // 登录页
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/Login.vue')
  },
  // 搜索
  {
    path: '/discover/search',
    name: 'search',
    component: () => import('@/views/search/Search.vue')
  },
  // 搜索组件
  {
    path: '/discover/search/searchDetail/',
    component: () => import('@/views/search/comps/SearchDetail.vue'),
    props: true,
    children: [
      {
        path: ':keywords',
        redirect: 'whole/:keywords'
      },
      { // 综合
        path: 'whole/:keywords',
        component: () => import('@/views/search/comps/DetailWhole.vue'),
        props: true
      },
      { // 歌曲
        path: 'song/:keywords',
        component: () => import('@/views/search/comps/DetailSongs.vue'),
        props: true
      },
      { // 歌手
        path: 'singer/:keywords',
        component: () => import('@/views/search/comps/DetailSinger.vue'),
        props: true
      },
      { // 用户
        path: 'user/:keywords',
        component: () => import('@/views/search/comps/DetailUser.vue'),
        props: true
      },
      { // 专辑
        path: 'album/:keywords',
        component: () => import('@/views/search/comps/DetailAlbum.vue'),
        props: true
      },
      { // 歌单
        path: 'sheet/:keywords',
        component: () => import('@/views/search/comps/DetailSheet.vue'),
        props: true
      },
      { // 视频
        path: 'video/:keywords',
        component: () => import('@/views/search/comps/DetailVideo.vue'),
        props: true
      },
      { // 电台
        path: 'radio/:keywords',
        component: () => import('@/views/search/comps/DetailRadio.vue'),
        props: true
      },
      { // mv
        path: 'mv/:keywords',
        component: () => import('@/views/search/comps/DetailMv.vue'),
        props: true
      }
    ]
  },
  // 歌单详情
  {
    path: '/playDetail/:id&:isAlbum',
    name: 'sheetInfo',
    component: () => import('@/components/context/sheetInfo/SheetInfo.vue'),
    props: true
  },
  // 最近播放列表
  {
    path: '/played/:id',
    name: 'played',
    component: () => import('@/views/played/Played.vue'),
    props: true
  },
  // 播放界面
  {
    path: '/playSong/:sid',
    name: 'playSong',
    component: () => import('@/components/common/playSong/PlaySong.vue'),
    props: true
  },
  // 显示评论
  {
    path: '/playComment/:id&:isAlbum',
    name: 'playComment',
    component: () => import('@/components/common/commentList/CommentList.vue'),
    props: true
  },
  // 用户详情页
  {
    path: '/Information/:uid',
    name: 'information',
    component: () => import('@/views/information/Information.vue'),
    props: true
  },
  // 关注列表
  {
    path: '/follow/:id',
    name: 'follow',
    component: () => import('@/components/context/follow/Follow.vue'),
    props: true
  },
  // 粉丝列表
  {
    path: '/fansList/:id',
    name: 'fansList',
    component: () => import('@/components/context/fansList/FansList.vue'),
    props: true
  }
]

const router = new VueRouter({
  routes
})

export default router
