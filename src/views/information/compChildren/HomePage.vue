<template>
  <div class="homepage">
    <!-- 听歌排行 -->
    <sheet-item
     v-if="showSheet"
     title="听歌排行"
     :showDiv="true"
     showImg="icon-paihang"
     showDivColor="#ee5757"
     :songCount="`累计听歌${count}首`"
     iconColor="#fff"
     @click.native="playedList"
     ></sheet-item>
     <!-- 喜欢的音乐 -->
     <sheet-item
     v-if="showSheet"
     :title="likeSheet.name"
     :showDiv="true"
     showImg="icon-aixin"
     showDivColor="#ebcece"
     :songCount="`播放${likeSheet.playCount}次`"
     iconColor="#ff4b41"
     @click.native="sheet(likeSheet.id)"
     ></sheet-item>
     <!-- 创建的歌单 -->
     <div class="createSheet" v-if="createSheet.length">
      <!-- 标题 -->
      <div class="title">
        <span class="sp1">创建的歌单</span><span class="sp2">{{ createSheet.length }}个，被收藏{{ subscribedCount }}次</span>
      </div>
      <sheet-item
       v-for="(item, index) in createSheet"
       :key="index"
       :title="item.name"
       :sheetImg="item.coverImgUrl"
       :songCount="`${item.trackCount}首`"
       :playCount="`播放${item.playCount}次`"
       @click.native="sheet(item.id)">
       </sheet-item>
     </div>
     <!-- 收藏的歌单 -->
     <!-- 创建的歌单 -->
     <div class="subSheet" v-if="subSheet.length">
      <div class="title">
        <span class="sp1">收藏的歌单</span><span class="sp2">{{ subSheet.length }}个</span>
      </div>
      <sheet-item
       v-for="(item, index) in subSheet"
       :key="index"
       :title="item.name"
       :sheetImg="item.coverImgUrl"
       :songCount="`${item.trackCount}首，by${item.nickname}，`"
       :playCount="`播放${item.playCount}次`"
       @click.native="sheet(item.id)">
       </sheet-item>
     </div>
     <!-- 认证信息 -->
     <div class="attestation" v-if="identify">
      <span class="sp1">认证信息</span>
      <div class="indentifyBox">
        <img :src="identify.imageUrl" alt="" />
        <div>{{ identify.imageDesc }}</div>
      </div>
    </div>
     <!-- 歌手信息 -->
     <div class="singerDetail" v-if="artistId !== 0">
      <div
        v-if="singerDetail != null"
      >
        <span class="sp1">歌手信息</span>
        <div class="singerDesc" v-if="singerDetail.desc">
          简介： {{ singerDetail.desc }}
        </div>
        <div
          class="singerPrize"
          v-for="(item, index) in singerDetail.introduction"
          :key="index"
        >
          <div class="prizeTitle">{{ item.ti }}：</div>
          <div class="prizeContent">{{ item.txt }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sheetItem from './sheetItem.vue'

import { getUserPlayList } from '@/api/user.js'
import { getSingerDetail } from '@/api/singer.js'

import { toStringNum } from '@/utils/common/common.js'

export default {
  name: 'HomePage',
  props: {
    count: {
      type: Number,
      default: 0
    },
    artistId: {
      type: Number,
      default: 0
    },
    identify: {
      type: Object,
      default: null
    },
    nickname: {
      type: String,
      default: ''
    }
  },
  components: {
    sheetItem
  },
  data () {
    return {
      uid: 0, // 用户id
      showSheet: true, // 是否展示上面两块内容
      likeSheet: {}, // 喜欢的音乐
      createSheet: [], // 创建的歌单
      subSheet: [], // 收藏的歌单
      subscribedCount: 0, // 创建的歌单被收藏的总次数
      singerDetail: null // 歌手信息
    }
  },
  methods: {
    // 获取歌单
    async getSheetList () {
      this.uid = this.$route.params.uid
      const { data: res } = await getUserPlayList(this.uid)
      if (res.playlist.length) {
        this.likeSheet = {
          id: res.playlist[0].id, // 歌单id
          name: res.playlist[0].name, // 歌单名称
          playCount: res.playlist[0].playCount, // 歌单播放次数
          trackCount: res.playlist[0].trackCount // 歌单数量
        }
        for (let i = 1; i < res.playlist.length; i++) {
          if (res.playlist[i].creator.userId == this.uid) {
            // 用户创建的歌单
            this.createSheet.push({
              id: res.playlist[i].id, // 歌单id
              name: res.playlist[i].name, // 歌单名称
              playCount: toStringNum(res.playlist[i].playCount), // 歌单播放次数
              trackCount: res.playlist[i].trackCount, // 歌单数量
              coverImgUrl: res.playlist[i].coverImgUrl // 歌单封面
            })
            this.subscribedCount += res.playlist[i].subscribedCount
          } else {
            // 用户收藏的歌单
            this.subSheet.push({
              id: res.playlist[i].id, // 歌单id
              name: res.playlist[i].name, // 歌单名称
              playCount: toStringNum(res.playlist[i].playCount), // 歌单播放次数
              trackCount: res.playlist[i].trackCount, // 歌单数量
              coverImgUrl: res.playlist[i].coverImgUrl, // 歌单封面
              nickname: res.playlist[i].creator.nickname // 歌单创建者
            })
          }
        }
      } else {
        this.showSheet = false
      }
    },
    // 获取歌手信息
    async getSingerList () {
      if (this.artistId) {
        const { data: res } = await getSingerDetail(this.artistId)
        this.singerDetail = {
          desc: res.briefDesc, // 歌手简介
          introduction: res.introduction // 歌手荣誉
        }
      }
    },
    // 跳转到最近播放列表
    playedList () {
      this.$router.push('/played/' + this.uid)
    },
    // 跳转歌单
    sheet (id) {
      this.$router.push('/playDetail/' + id + '&' + false)
    }
  },
  created () {
    this.getSheetList()
  },
  mounted () {
    this.$loading.loadingShow()
    setTimeout(() => {
      this.getSingerList()
      this.$loading.loadingNo()
    }, 500)
  }
}
</script>

<style lang="less" scoped>
.homepage {
  padding: 0 15px 15px;
  margin-bottom: 45px;
  background-color: #fff;
  min-height: 7.856192rem;
  position: relative;
  .sp1 {
    font-size: .4rem;
  }
  /* z-index: 1; */
  .createSheet, .subSheet {
    width: 100%;
    margin-top: 0.798935rem;
    .title {
      margin-bottom: 10px;
      .sp2 {
        font-size: 0.346205rem;
        color: #929292;
        position: relative;
        left: 0.266312rem;
      }
    }
  }
  .attestation {
    margin-top: 0.532623rem;
    .indentifyBox {
      font-size: .346667rem;
      display: flex;
      align-items: center;
      margin-top: 0.266312rem;
      img {
        width: 0.665779rem;
        height: 0.665779rem;
        float: left;
        margin-right: 0.133156rem;
      }
    }
  }
  .singerDetail {
    margin-top: 0.532623rem;
    .singerDesc {
      font-size: .32rem;
      line-height: .453333rem;
      margin-top: 0.266312rem;
    }
    .singerPrize {
      margin-top: 0.532623rem;
      .prizeTitle {
        font-size: .4rem;
        margin-bottom: 0.266312rem;
      }
      .prizeContent {
        font-size: .32rem;
        line-height: .453333rem;
        color: #000;
      }
    }
  }
}
</style>
