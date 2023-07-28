<template>
  <!-- 专辑/歌单详情页 -->
  <div class="SheetInfo">
    <!-- 导航页 -->
    <menu-nav
     ref="sheetMenuNav"
     class="nav"
     :showBlackImg="false"
     :navTitle="navTitle"
     backPath="-1"></menu-nav>
    <div class="box">
      <!-- 遮罩 -->
      <div ref="sheetDetailBox" class="zhezhao"></div>
      <!-- 背景, no-repeat平铺，仅使用一次 -->
      <div class="bimg" :style="{ background: 'url(' + sheetInfoContent.coverImgUrl + ') no-repeat'}"></div>
      <!-- 歌单显示内容 -->
      <div class="zbox">
        <!-- 歌单头部详情 -->
        <div class="top" v-if="isShow">
          <!-- 封面 -->
          <div class="img">
            <!-- 播放量，专辑的话就不需要这部分信息 -->
            <div class="bfl" v-if="isAlbum == 'false'">
              ▷ {{ sheetInfoContent.playCount }}
            </div>
            <img class :src="sheetInfoContent.coverImgUrl" alt="" />
          </div>
          <!-- 右边的详情盒子 -->
          <div class="rightBox">
            <!-- 名称 -->
            <div class="name">{{ sheetInfoContent.name }}</div>
            <!-- 如果是歌单 -->
            <div class="user" v-if="isAlbum == 'false'">
              <!-- 创造者的用户详情, >可以到达创造者的主页，没有实现这部分功能 -->
              <img class :src="sheetInfoContent.avatarUrl" alt="" />
              {{ sheetInfoContent.nickname }} ＞
            </div>
            <!-- 如果是专辑 -->
            <div class="user" v-else>
              <!-- 创造者的用户详情, >可以到达创造者的主页，没有实现 -->
              歌手：
              <span
                v-for="(item, index) in sheetInfoContent.nickname"
                :key="index"
              >
                {{ item.name }}
              </span>
            </div>
          </div>

        </div>
        <!-- 底部详情（评论什么的） -->
        <div class="bottom">
          <tabbar>
            <tabbaritem @click.native="showInfoComment">
              <i slot="item-icon" class="iconfont icon-pinglun"></i>
              <div class="item-text" slot="item-text">
                {{
                  sheetInfoContent.commentCount > 0
                    ? sheetInfoContent.commentCount
                    : "评论"
                }}
              </div>
            </tabbaritem>
            <tabbaritem>
              <i slot="item-icon" class="iconfont icon-fenxiang"></i>
              <div class="item-text" slot="item-text">
                {{
                  sheetInfoContent.shareCount > 0
                    ? sheetInfoContent.shareCount
                    : "分享"
                }}
              </div>
            </tabbaritem>
            <tabbaritem>
              <i slot="item-icon" class="iconfont icon-xiazai"></i>
              <div class="item-text" slot="item-text">下载</div>
            </tabbaritem>
            <tabbaritem>
              <i slot="item-icon" class="iconfont icon-liebiao"></i>
              <div class="item-text" slot="item-text">多选</div>
            </tabbaritem>
          </tabbar>
        </div>
      </div>
    </div>
    <!-- 播放导航页 -->
    <div ref="content" class="content">
      <sheet-nav :trackCount="trackCount" @playAll="playAll"></sheet-nav>
    </div>
    <!-- 歌曲列表 -->
    <div class="songItem">
      <song-item :songList="songList" @playSong="playSong"></song-item>
    </div>
  </div>
</template>

<script>
import MenuNav from '@/components/context/menuNav/MenuNav.vue'
import tabbar from '@/components/common/tabbar/tabbar.vue' // 导航栏
import tabbaritem from '@/components/common/tabbar/tabbaritem.vue'
import SheetNav from '@/components/context/sheetNav/SheetNav.vue'
import SongItem from '@/components/context/songItem/SongItem.vue'

import { toStringNum } from '@/utils/common/common.js' // 播放量转换

import { getPlayDetial } from '@/api/sheetInfo.js' // 获取歌单内容
import { getSongDetial } from '@/api/played.js' // 获取歌曲详情

export default {
  name: 'SheetInfo',
  props: ['id', 'isAlbum'],
  data () {
    return {
      navTitle: '歌单',
      sheetInfoContent: {},
      isShow: true, // 是否展示歌单详情
      songListId: [], // 歌单歌曲id
      trackCount: 0, // 歌曲数量
      songList: [], // 歌曲列表
      top: 999 // 播放导航栏距离顶部的距离
    }
  },
  components: {
    MenuNav,
    tabbar,
    tabbaritem,
    SheetNav,
    SongItem
  },
  methods: {
    // 显示评论
    showInfoComment () {
      this.$store.state.commentType = 0 // 歌单评论，存入state
      this.$router.push('/playComment/' + this.id + '&' + false)
    },
    // 播放全部，从第一首开始
    playAll () {
      if (this.songListId.length) {
        this.playSong(this.songListId[0])
      }
    },
    // 播放歌曲
    playSong (sid) {
      this.$router.push('/playSong/' + sid)
      // 只有当打算播放歌曲的时候才会把该歌单存下来一样的歌单就不用存了
      if (this.$store.state.sheet.sheetId != this.id) {
        this.$store.state.sheet.sheetId = this.id // 保存歌单列表
        // 将歌单保存到state中
        this.$store.state.sheet.userId = this.sheetInfoContent.userId
        this.$store.state.sheet.nickname = this.sheetInfoContent.nickname
        this.$store.state.sheet.songListId = this.songListId
        this.$store.state.sheet.trackCount = this.sheetInfoContent.trackCount
      }
      this.$store.commit('searchIndex', sid)
    },
    // 获取歌单详情
    async getSheet () {
      const { data: res } = await getPlayDetial(this.id)
      const sheet = res.playlist
      this.sheetInfoContent = {
        commentCount: sheet.commentCount, // 歌但评论数
        coverImgUrl: sheet.coverImgUrl, // 封面
        name: sheet.name, // 名称
        playCount: toStringNum(sheet.playCount), // 播放量
        shareCount: sheet.shareCount, // 分享数
        trackCount: sheet.trackCount, // 歌曲数量
        avatarUrl: sheet.creator.avatarUrl, // 创造者的用户头像
        nickname: sheet.creator.nickname, // 创造者的用户名
        userId: sheet.creator.userId // 创造者的用户id
      }
      this.songListId = sheet.trackIds.map(item => item.id) // 歌曲id
      this.trackCount = sheet.trackCount // 歌曲数量
      // 获取歌单歌曲列表
      // 只放前50个，这里需要加一个滚动监听
      const { data: songs } = await getSongDetial(this.songListId.slice(0, 50).toString())
      this.songList = songs.songs.map(item => {
        return {
          mv: item.mv,
          songName: item.name,
          id: item.id,
          singer: item.ar,
          zhuanji: item.al.name,
          yuanc: item.alia
        }
      })
      // 遮罩的高度，即刚开始导航栏据顶部的高度
    },
    // 监听滚动
    linearScroll () {
      // window.pageYOffset，滚动条垂直方向滚动的像素
      // 如果遮罩的位置全部划走了，就将导航栏制定\
      if (window.pageYOffset >= this.top) {
        this.$refs.content.style = 'position: fixed; top: 43px; left: 0; right: 0;'
      } else if (window.pageYOffset < this.top) {
        this.$refs.content.style = 'position: relative;'
      }
      // console.log(window.pageYOffset, this.top)
    }
  },
  created () {
    this.getSheet()
  },
  mounted () {
    // 绑定滚动事件
    this.$nextTick(() => {
      this.top = this.$refs.sheetDetailBox.clientHeight
      document.addEventListener('scroll', this.linearScroll)
    })
  },
  destroyed () {
    document.removeEventListener('scroll', this.linearScroll)
  }
}
</script>

<style lang="less" scoped>

.SheetInfo {
  top: 0;
  position: relative;
  background-color: rgba(0, 0, 0, 0.8);
  margin-bottom: 40px;
  .nav {
  /* background-color: #fff; */
    background-color: rgba(0, 0, 0);
    /* position: flex; */
    color: #fff;
    position: relative;
    position: fixed;
    z-index: 20;
    top: 0;
  }
  .box {
    margin-top: 45px;
    padding: 0.533333rem 0.4rem 0.213333rem;
    /* height: 6.4rem; */
    position: relative;
    z-index: 15;
    .zhezhao {
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.7);
      position: fixed;
      position: absolute;
      top: -0.026667rem;
      left: 0;
      z-index: 10;
    }
    .bimg {
      width: 100%;
      top: 0;
      left: 0;
      height: 100%;
      padding: 0;
      position: absolute;
      filter: blur(5px);
      background-size:cover !important; // 全部填充
    }
    .zbox {
      width: 100%;
      height: 90%;
      padding: 0;
      position: relative;
      z-index: 15;
      .top {
        width: 100%;
        height: 3.195739rem;
        .img {
          width: 35%;
          height: 100%;
          border-radius: 0.133333rem;
          overflow: hidden;
          /* margin-right: .532623rem; */
          float: left;
          position: relative;
          .bfl {
            position: absolute;
            font-size: 0.32rem;
            color: #fff;
            right: 0.133333rem;
            top: 0.133333rem;
            font-weight: 300;
          }
          img {
            width: 100%;
            height: 100%;
          }
        }
        .rightBox {
          width: 60%;
          height: 100%;
          float: left;
          .name {
            width: 4.793609rem;
            float: right;
            height: 0.533333rem;
            line-height: 0.533333rem;
            /* margin-right: .665779rem; */
            position: relative;
            color: #fff;
            top: 0.186667rem;
            font-size: 0.532623rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .user {
            line-height: 0.8rem;
            height: 0.8rem;
            width: 4.793609rem;
            float: right;
            /* margin-right: .665779rem; */
            margin-top: 0.399467rem;
            font-size: 0.346667rem;
            color: rgb(243, 243, 243);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            img {
              width: 0.8rem;
              height: 0.8rem;
              border-radius: 50%;
              float: left;
              margin-right: .186667rem;
            }
          }
        }
      }
      .bottom{
        width: 100%;
        height: 1.6rem;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: .133333rem;
        .item-text {
          color: #fff;
          text-align: center;
          margin-top: .08rem;
        }
      }
    }

  }
  .content {
    background-color: #000;
    width: 100%;
    padding: 0;
    position: relative;
    z-index: 18;
  }
  .songItem {
    min-height: 8.521971rem;
    padding: 0px 16px 8px;
    background-color: #fff;
  }
}
.iconfont{
  color: #Fff;
  font-size: .666667rem;
  margin-top: .133333rem;
}
</style>
