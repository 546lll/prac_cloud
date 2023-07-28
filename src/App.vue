<template>
  <div id="app">
    <!-- 顶部导航栏 -->
    <music-navbar class="appnav"></music-navbar>
    <!-- 弹出界面 -->
    <left-popup></left-popup>
    <!-- 中间界面切换增加动画过渡 -->
    <transition mode="">
      <keep-alive
      exclude=
        "MoreSheet,SheetInfo,sheetInfoComment,Information,Follow,FansList,Discover,Search,SearchDetail,LeftPopup">
        <!-- 设置唯一的key组件不会被复用 -->
        <!-- <router-view :key="key"></router-view> -->
        <router-view></router-view>
      </keep-alive>
    </transition>
    <!-- 底部的播放栏 -->
    <play-nav></play-nav>
  </div>
</template>

<script>
import MusicNavbar from '@/components/context/musicNavbar/MusicNavbar.vue'
import PlayNav from '@/components/context/playNav/PlayNav.vue'
import LeftPopup from '@/views/leftPopup/LeftPopup.vue'

import { getUserDetail, getUserPlayList } from '@/api/user.js' // 用户信息

export default {
  name: 'App',
  components: {
    MusicNavbar,
    PlayNav,
    LeftPopup
  },
  methods: {
    // 如果浏览其中有本地缓存，获取用户信息
    async getInformation () {
      if (this.$store.state.profile.userId) {
      // 获取用户基本信息
        const { data: detail } = await getUserDetail(this.$store.state.profile.userId)
        this.$store.state.profile.level = detail.level
        this.$store.state.profile.listenSongs = detail.listenSongs
        // 获取用户歌单
        const { data: list } = await getUserPlayList(this.$store.state.profile.userId)
        this.$store.state.playList = list.playlist.map(item => {
          return {
            coverImgUrl: item.coverImgUrl,
            name: item.name,
            id: item.id,
            playCount: item.playCount,
            trackCount: item.trackCount,
            creator: item.creator.nickname
          }
        })

        // 层级太深了，直接改变对象某个属性的值，会导致组件没法实时更新
        this.$store.state.profile = JSON.parse(JSON.stringify(this.$store.state.profile))
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      if (localStorage.getItem('profile')) {
        this.$store.state.profile = JSON.parse(localStorage.getItem('profile'))
        this.getInformation()
      }
    })
  }
  // computed: {
  //   key () {
  //     return this.$route.name !== undefined ? this.$route.name + new Date() : this.$route + new Date()
  //   }
  // }
}
</script>

<style lang="less" scoped>
// 滚动条
::-webkit-scrollbar {
  display: none;
}

#app {
  overflow-x: hidden;
  background-color: #fafafa;
  .appnav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: #fff;
    box-shadow: 0 -3px 5px rgba(0, 0, 0, 0.7);
    z-index: 19; // 数字越大优先级越大
  }
  // 动画执行
  // 下一个界面进入的第一个状态，从右往左
  .v-enter {
    opacity: 0;
    transform: translateX(100%);
  }
  // 上一个界面退出的最后一个状态，
  .v-leave-to {
    opacity: 0;
    /* 离开的时候向左 */
    transform: translateX(-100%);
  }
  /* 动画执行期间 */
  .v-enter-active,
  .v-leave-active {
    /* 添加动画效果 */
    transition: all 0.2s linear;
  }
}

</style>
