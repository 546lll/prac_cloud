<template>
  <div class="Information">
    <!-- 顶部导航栏 -->
    <menu-nav
      ref="informationTonav"
      :showBlackImg="false"
      :rightImg="true"
      class="nav"
      :navTitle="navTitle"
      @openSub="openSub"
    ></menu-nav>
    <!-- 主页背景 -->
    <div class="topbox" v-if="profile != null">
      <!-- 背景 -->
      <div class="userBURL">
        <img :src="profile.backgroundUrl" alt="" />
      </div>
      <!-- 遮罩 -->
      <div class="zhez"></div>
      <!-- 用户基本信息展示 -->
      <div class="userDetail" v-if="!special">
        <!-- 用户头像 -->
        <div class="userImg">
          <img :src="profile.avatarUrl" alt="" />
          <div class="logo" v-if="profile.artistId">
            <i class="iconfont icon-logo"></i>
          </div>
        </div>
        <!-- 用户名 -->
        <div class="userName">
          {{ profile.nickname }}&nbsp;&nbsp;&nbsp;
          <!-- 会员标识 -->
          <img
            v-if="profile.vipType != 0"
            src="@/assets/img/common/vip1.svg"
            alt="" />
        </div>
        <div class="detail">
          <div class="follows" @click="follow(profile.userId)">
            关注 {{ profile.follows }}
          </div>
          <div class="followeds" @click="fansList(profile.userId)">
            粉丝 {{ profile.followeds }}
          </div>
        </div>
        <div class="createtime">
          <div v-if="profile.createTime == -1">
            {{ profile.description }}
          </div>
          <div v-else>
            从 {{ profile.createTime | getTime }} 开始来到网易云
          </div>
        </div>
      </div>
      <div v-else class="singerDetail">
        {{ profile.nickname }}
      </div>
    </div>
    <!-- 导航页,下滑时需要置顶 -->
    <div ref="informationNav" class="navbox">
      <tab-nav
       @tabToggle="tabToggle"
       :firstIndex="firstIndex"
       class="tabnav"
       :itemList="itemList"
       ref="inforTabnav">
       </tab-nav>
    </div>
    <!-- 主页 -->
    <home-page
      v-if="showHome"
      :artistId="profile.artistId"
      :identify="profile.identify"
      class="homepage"
      :count="profile.listenSongs"
    >
    </home-page>
    <!-- 动态 -->
    <dynamic
     v-if="showDynamic"
     class="dynamic"
     :userImg="profile.avatarUrl"
     :nickName="profile.nickname">
    </dynamic>
    <!-- 歌曲列表 -->
    <songs class="songs" :artistId="profile.artistId" v-if="showSongs"></songs>
    <!-- 专辑 -->
    <album class="album" :artistId="profile.artistId" v-if="showAlbum"></album>
    <!-- mv列表 -->
    <mv class="mv" :artistId="profile.artistId" v-if="showMv"></mv>
    <!-- 分享面板 -->
    <van-share-sheet
      v-model="showShare"
      title="立即分享给好友"
      :options="options"
    ></van-share-sheet>
  </div>
</template>

<script>
import MenuNav from '@/components/context/menuNav/MenuNav' // 顶部导航栏
import TabNav from '@/components/context/tabNav/TabNav.vue' // 中间的导航选择栏
import HomePage from './compChildren/HomePage.vue' // 主页
import dynamic from './compChildren/Dynamic.vue' // 动态
import songs from './compChildren/Songs.vue' // 歌曲列表
import album from './compChildren/Album.vue' // 专辑
import mv from '@/components/context/mv/Mv.vue' // MV

import { getUserDetail } from '@/api/user.js'
import { toStringNum } from '@/utils/common/common.js'

export default {
  name: 'Information',
  props: ['uid'],
  components: {
    MenuNav,
    TabNav,
    HomePage,
    dynamic,
    songs,
    album,
    mv
  },
  data () {
    return {
      navTitle: '',
      showShare: false,
      navToTop: 0, // 导航栏距离顶部的距离
      options: [
        [
          { name: '微信', icon: 'wechat' },
          { name: '微博', icon: 'weibo' },
          { name: 'QQ', icon: 'qq' }
        ],
        [
          { name: '复制链接', icon: 'link' },
          { name: '分享海报', icon: 'poster' },
          { name: '二维码', icon: 'qrcode' }
        ]
      ],
      profile: {}, // 用户信息
      special: false, // 是否是歌手
      itemList: ['主页', '动态'], // 导航item
      firstIndex: 0, // 导航栏索引
      showHome: true, // 是否展示主页
      showDynamic: false, // 是否展示动态
      showSongs: false, // 显示/隐藏歌曲
      showAlbum: false, // 显示/隐藏专辑
      showMv: false // 显示/隐藏mv
    }
  },
  methods: {
    // 分享主页
    openSub () {
      // console.log('分享了吗')
      this.showShare = true
    },
    // 获取用户基本信息
    async userDetail () {
      const { data: res } = await getUserDetail(this.uid)
      this.profile = {
        userId: res.profile.userId, // 用户id
        level: res.level, // 用户等级
        listenSongs: res.listenSongs, // 用户累计播放歌曲
        avatarUrl: res.profile.avatarUrl, // 用户头像
        nickname: res.profile.nickname, // 用户昵称
        follows: res.profile.follows, // 用户关注
        followeds: toStringNum(res.profile.followeds), // 用户粉丝
        gender: res.profile.gender, // 性别
        backgroundUrl: res.profile.backgroundUrl, // 背景图片
        createTime: res.profile.createTime, // 创建时间
        artistId: res.profile.artistId || null, // 歌手id
        vipType: res.profile.vipType, // 是否会员
        description: res.profile.description, // 描述
        identify: res.identify || null // 认证信息
      }
      // console.log(this.profile)
      // 判断是否是歌手
      if (this.profile.artistId != null) {
        this.itemList.splice(1, 0, '歌曲', '专辑', 'MV')
        // 数据更新但是视图没有来得及更新，因此需要使用this.$nextTick继续下步的操作
        this.$nextTick(() => {
          this.$refs.inforTabnav.tabItem(0)
        })
      }
    },
    tabToggle (index) {
      // 页面切换
      if (this.itemList.length == 5) {
        switch (index) {
          case 0:
            this.showHome = true
            this.showSongs = false
            this.showAlbum = false
            this.showMv = false
            this.showDynamic = false
            break
          case 1:
            this.showHome = false
            this.showSongs = true
            this.showAlbum = false
            this.showMv = false
            this.showDynamic = false
            break
          case 2:
            this.showHome = false
            this.showSongs = false
            this.showAlbum = true
            this.showMv = false
            this.showDynamic = false
            break
          case 3:
            this.showHome = false
            this.showSongs = false
            this.showAlbum = false
            this.showMv = true
            this.showDynamic = false
            break
          case 4:
            this.showHome = false
            this.showSongs = false
            this.showAlbum = false
            this.showMv = false
            this.showDynamic = true
            break
          default:
            break
        }
      } else {
        switch (index) {
          case 0:
            this.showHome = true
            this.showDynamic = false
            break
          case 1:
            this.showDynamic = true
            this.showHome = false
            break
          default:
            break
        }
      }
    },
    // 关注列表
    follow (id) {
      this.$router.push('/follow/' + id)
    },
    // 粉丝列表
    fansList (id) {
      this.$router.push('/fansList/' + id)
    },
    // 滚动事件
    linearScroll () {
      const nav = this.$refs.informationNav // 页面切换盒子
      const topnav = this.$refs.informationTonav.$el // 顶部导航栏
      // 如果滚动高度大于主页背景高度
      if (window.pageYOffset >= this.navToTop) {
        nav.style = 'background-color: rgba(0,0,0,1); position: fixed; left: 0; right: 0; top: 64px; z-index: 1'
        topnav.style = 'background-color: rgba(0,0,0,1)'
        this.navTitle = this.profile.nickname
      } else {
        nav.style = 'background-color: rgba(0,0,0,0); position: static'
        topnav.style = 'background-color: rgba(0,0,0,0)'
        this.navTitle = ''
      }
    }
  },
  created () {
    this.userDetail()
  },
  mounted () {
    this.$nextTick(() => {
      this.navToTop = this.$refs.informationNav.offsetTop - 44 // 保存导航栏距离顶部的距离
      document.addEventListener('scroll', this.linearScroll) // 监听事件
    })
  },
  destroyed () {
    // 清除事件
    document.removeEventListener('scroll', this.linearScroll)
  }
}
</script>

<style lang="less" scoped>
.Information {
  width: 100%;
  position: relative;
  background-color: #fff;
  z-index: 20;
  .nav {
  /* background-color: #fff; */
    background-color: transparent;
    /* position: flex; */
    color: #fff;
    position: fixed;
    z-index: 21;
    top: 0;
    border: 0;
  transition: all 0.4s linear;
  }
  .topbox {
    width: 100%;
    height: 7.466667rem;
    /* height: 7.989348rem; */
    position: relative;
    z-index: 1;
    .userBURL {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      filter: blur(5px);
      img {
        width: 100%;
        height: 100%;
      }
    }
    .zhez {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      z-index: 2;
      background-color: rgba(0, 0, 0, 0.5);
    }
    .userDetail {
      padding: .4rem .4rem 0;
      position: absolute;
      top: 23%;
      z-index: 3;
      .userImg {
        width: 1.997337rem;
        height: 1.997337rem;
        position: relative;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
        .logo {
          position: absolute;
          bottom: 0.053262rem;
          right: 0.133156rem;
          width: 0.479361rem;
          height: 0.479361rem;
          border-radius: 50%;
          background-color: #da231b;
          display: flex;
          align-items: center;
          justify-content: center;
          .iconfont {
            font-size: .32rem;
            color: #fff;
          }
        }
      }
      .userName {
        font-size: 0.426099rem;
        margin-top: 0.399467rem;
        color: #fff;
        position: relative;
        img {
          height: 25px;
          position: absolute;
          top: -0.053262rem;
        }
      }
      .detail {
        font-size: 0.346205rem;
        color: #adadad;
        height: .266667rem;
        margin-top: 0.266312rem;
        .follows {
          float: left;
          height: 10px;
          line-height: 10px;
          padding-right: 10px;
          border-right: 1px solid #adadad;
        }
        .followeds {
          float: left;
          height: 10px;
          line-height: 10px;
          margin-left: 10px;
        }
      }
      .createtime {
        height: 0.532623rem;
        font-size: .346667rem;
        line-height: 0.532623rem;
        color: #adadad;
        margin-top: 0.266312rem;
      }
    }
    .singerDetail{
      width: 80%;
      height: 1.065246rem;
      margin: 0 5%;
      color: #fff;
      font-size: .532623rem;
      font-weight: 550;
      position: absolute;
      bottom: 1.331558rem;
      z-index: 3;
      line-height: 1.065246rem;
    }
  }
  .navbox {
    transition: all 0.4s linear;
    width: 100%;
    margin-top: -20px;
    .tabnav {
      position: relative;
      height: 1.171771rem;
      z-index: 20;
      border-top-left-radius: 0.399467rem;
      border-top-right-radius: 0.399467rem;
      background-color: #fff !important;
    }
  }
  .homepage {
    padding-top: 0.266312rem;
    min-height: 12.4rem;
  }
}
</style>
