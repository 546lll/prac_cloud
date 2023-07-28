<template>
  <div class="MyMessage">
    <div class="MyMessage2">
      <!-- 登录状态的用户卡片 -->
      <my-message-user
       class="user"
       v-if="$store.state.profile.userId"
       @click.native="information">
      </my-message-user>
      <!-- 未登录状态的用户卡片 -->
      <my-message-login
        class="login"
        v-else
        @toLogin="toLogin">
      </my-message-login>
      <!-- 菜单 -->
      <my-message-menu></my-message-menu>
      <!-- 我喜欢 -->
      <my-message-love class="loveBox" @click.native="toLove"></my-message-love>
    </div>
    <!-- 歌单操作栏 -->
    <tab-control
     id="tabCon"
     ref="tab"
     :title="title"
     @tabGoods="tabGoods">
    </tab-control>
    <!-- 歌单列表 -->
    <div class="MyMessage3">
      <my-message-list ref="songSheet"></my-message-list>
    </div>
  </div>
</template>

<script>
import MyMessageList from './comps/MyMessageList.vue'
import MyMessageLove from './comps/MyMessageLove.vue'
import MyMessageMenu from './comps/MyMessageMenu.vue'
import MyMessageLogin from './comps/MyMessageLogin.vue'
import MyMessageUser from './comps/MyMessageUser.vue'
import TabControl from '@/components/common/tabControl/TabControl.vue'

import '@/assets/icon/MyMessage.css' // 我的页面字体图标

// import { getUserDetail, getUserPlayList } from '@/api/user.js' // 用户信息

export default {
  name: 'MyMessage',
  components: {
    MyMessageList,
    MyMessageLogin,
    MyMessageLove,
    MyMessageUser,
    MyMessageMenu,
    TabControl
  },
  data () {
    return {
      title: ['创建歌单', '收藏歌单', '歌单助手'],
      totop: 0, // 操作栏距离顶部的距离
      colltop: 0 // 收藏歌单距离顶部的距离
    }
  },
  methods: {
    // 转到个人信息页面
    information () {
      this.$router.push('/Information/' + this.$store.state.profile.userId)
    },
    // 转到登录状态
    toLogin () {
      this.$router.push('/login')
    },
    // 转到喜欢歌单上
    toLove () {
      this.$router.push('/playDetail/' + this.$store.state.playList[0].id + '&' + false)
    },
    // 歌单操作
    tabGoods (index) {
      switch (index) {
        case 0:
          // this.$refs.tab.$el.style =
          //   'position: fixed; left: 0; right: 0; top: 37px; background-color: #fff; z-index: 10;'
          // this.$refs.songSheet.$el.style = 'margin-top: ' + this.$refs.tab.$el.clientHeight + 'px'
          // 屏幕滚动
          window.scrollTo(0, this.totop)
          break
        case 1:
          window.scrollTo(0, this.colltop)
          break
        default:
          break
      }
    },
    // 滚动处理事件
    linearScoll () {
      // window.scrollTo这个滚动总是差一点，所以这里设置一个偏差
      if (pageYOffset >= this.totop - 1) {
        this.$refs.tab.$el.style =
          'position: fixed; left: 0; right: 0; top: 37px; background-color: #fff; z-index: 10;'
        this.$refs.songSheet.$el.style = 'margin-top: ' + this.$refs.tab.$el.clientHeight + 'px'
      } else if (pageYOffset < this.totop) {
        this.$refs.tab.$el.style =
          'position: static; backgroundColor: transparent'
        this.$refs.songSheet.$el.style = 'margin-top: 0px'
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.totop = this.$refs.tab.$el.offsetTop // 歌单操作栏距离顶部的距离
      this.colltop = this.$refs.songSheet.$el.offsetTop + this.$refs.songSheet.$refs.collection.offsetTop - this.$refs.tab.$el.clientHeight
      document.addEventListener('scroll', this.linearScoll)
    })
  },
  created () {
    // this.getInformation()
  },
  deactivated () {
    document.removeEventListener('scroll', this.linearScoll)
  }
}
</script>

<style lang="less" scoped>
.MyMessage2 {
  margin-top: 1.171771rem;
  height: 100%;
  padding: 20px 15px 0;
  overflow: scroll;
  .user{
    background-color: #fff;
    box-shadow: var(--boxshaow);
  }
  .login{
    background-color: #fff;
    box-shadow: var(--boxshaow);
  }
}
#tabCon{
    margin-top: .133333rem;
  }
  .MyMessage3{
    height: 100%;
    padding: .133156rem .399467rem .532623rem;
    margin-bottom: 1.198402rem;
  }
</style>
