<template>
   <div class="DetailWhole">
    <!-- 歌曲 -->
    <div class="songs bbox" v-if="songs.length !== 0">
      <div class="title">单曲</div>
      <song-item :shouLeft="false" :songList="songs"></song-item>
      <whole-more
        v-if="songText !== undefined"
        :moreText="songText"
        @click.native="moreContent(1)"
      ></whole-more>
    </div>
    <!-- 专辑 -->
    <div class="album bbox" v-if="album.length !== 0">
      <div class="title">专辑</div>
      <div
        class="albumItem"
        @click="toAlbum(item.id)"
        v-for="(item, index) in album"
        :key="index"
      >
        <div class="left">
          <img class="img" :src="item.picUrl" alt="" />
          <img class="black" src="https://img.coolcr.cn/2021/03/08/2b7d972a3ad72.png" alt="" />
        </div>
        <div class="right">
          <div class="box">
            <div class="name">{{ item.name }}</div>
            <div class="detail">
              {{ item.artist }} {{ item.publishTime | getTime("YYYY.MM.DD") }}
            </div>
          </div>
        </div>
      </div>
      <whole-more
        v-if="albumText !== undefined"
        :moreText="albumText"
        @click.native="moreContent(4)"
      ></whole-more>
    </div>
    <!-- 歌单 -->
    <div class="sheet bbox" v-if="sheets.length !== 0">
      <div class="title">歌单</div>
      <div
        class="sheetItem"
        @click="toSheet(item.id)"
        v-for="(item, index) in sheets"
        :key="index"
      >
        <div class="sleft">
          <img :src="item.coverImgUrl" alt="" />
        </div>
        <div class="sright">
          <div class="box">
            <div class="stitle">{{ item.name }}</div>
            <div class="sheetdetail">
              {{ item.trackCount + "首 " }}{{ "by " + item.creator + "，"
              }}{{ "播放" + item.playCount + "次" }}
            </div>
          </div>
        </div>
      </div>
      <whole-more
        v-if="sheetText !== undefined"
        :moreText="sheetText"
        @click.native="moreContent(5)"
      ></whole-more>
    </div>
    <!-- 视频 -->
    <div class="video bbox" v-if="videos.length !== 0">
      <div class="title">视频</div>
      <div class="videoItem" v-for="(item, index) in videos" :key="index">
        <div class="vleft">
          <img :src="item.coverUrl" alt="" />
          <div class="count">▷ {{ item.playTime }}</div>
        </div>
        <div class="vright">
          <div class="vbox">
            <div class="vtitle">{{ item.title }}</div>
            <div class="videoDetail">
              {{ item.durationms + " by " }}{{ item.creator }}
            </div>
          </div>
        </div>
      </div>
      <whole-more
        v-if="videosText !== undefined"
        :moreText="videosText"
        @click.native="moreContent(2)"
      ></whole-more>
    </div>
    <!-- 相关搜索 -->
    <div class="sim_query bbox" v-if="sim_query.length !== 0">
      <div class="title">相关搜索</div>
      <div class="sim_box">
        <div class="simItem" v-for="(item, index) in sim_query" :key="index">
        {{ item }}
      </div>
      </div>
      <div style="clear:both"></div>
    </div>
    <!-- 话题-->
    <div class="talk bbox" v-if="talks.length !== 0">
      <div class="title">主题</div>
      <div class="talkItem" v-for="(item, index) in talks" :key="index">
        <div class="tleft">
          <img :src="item.coverUrl" alt="" />
        </div>
        <div class="tright">
          <div class="tbox">
            <div class="ttitle"># {{ item.talkName }}</div>
            <div class="talkDetail">
              {{ item.follows + "人关注 "
              }}{{ " " + item.participations + "人参与" }}
            </div>
          </div>
        </div>
      </div>
      <whole-more
        v-if="talksText !== undefined"
        :moreText="talksText"
        @click.native="moreContent(0)"
      ></whole-more>
    </div>
    <!-- 歌手 -->
    <div class="artist bbox" v-if="artist.length !== 0">
      <div class="title">歌手</div>
      <div
        class="artistItem"
        @click="toDetail(item.accountId)"
        v-for="(item, index) in artist"
        :key="index"
      >
        <div class="aleft">
          <img :src="item.picUrl" alt="" />
        </div>
        <div class="aright">
          {{ item.name
          }}<span class="a1" v-if="item.alia.length !== 0">
            ({{ item.alia[0] }})</span
          >
        </div>
      </div>
      <whole-more
        v-if="artistText !== undefined"
        :moreText="artistText"
        @click.native="moreContent(3)"
      ></whole-more>
    </div>
    <!-- 电台 -->
    <div class="djRadio bbox" v-if="djRadio.length !== 0">
      <div class="title">电台</div>
      <div
        class="djItem"
        @click="toDjradio(item.id)"
        v-for="(item, index) in djRadio"
        :key="index"
      >
        <div class="dleft">
          <img :src="item.picUrl" alt="" />
        </div>
        <div class="dright">
          <div class="dbox">
            <div class="dname">{{ item.name }}</div>
            <div class="dnickname">{{ item.nickname }}</div>
          </div>
        </div>
      </div>
      <whole-more
        v-if="djRadioText !== undefined"
        :moreText="djRadioText"
        @click.native="moreContent(6)"
      ></whole-more>
    </div>
  </div>
</template>

<script>
import { searchResult } from '@/api/search.js'
import { toStringNum, durationTime } from '@/utils/common/common.js'

import SongItem from '@/components/context/songItem/SongItem.vue'
import WholeMore from './WholeMore.vue'

export default {
  name: 'DetailWhole',
  props: ['keywords'],
  components: {
    SongItem,
    WholeMore
  },
  data () {
    return {
      offset: 0,
      album: [], // 专辑数据
      songs: [], // 歌曲数据
      sheets: [], // 歌单数据
      videos: [], // 视频数据
      talks: [], // 主题
      artist: [], // 歌手
      sim_query: [], // 相关搜索
      djRadio: [], // 电台数据
      songText: '',
      albumText: '',
      sheetText: '',
      videosText: '',
      talksText: '',
      artistText: '',
      djRadioText: ''
    }
  },
  methods: {
    // 歌单跳转
    toSheet (id) {
      this.$router.push('/playDetail/' + id + '&' + false)
    },
    // 专辑跳转
    toAlbum (id) {
      this.$router.push('/playDetail/' + id + '&' + true)
    },
    // 歌手跳转
    toDetail (id) {
      if (id !== null) {
        this.$router.push('/Information/' + id)
      } else {
        this.$toast.show('暂时获取不到歌手信息', 1900)
      }
    },
    // 电台跳转
    toDjradio (id) {},
    // 搜索的结果
    async getList () {
      const { data: res } = await searchResult(this.keywords, 30, this.offset * 30, 1018)
      // console.log(res)
      // 获取搜索的专辑
      if (res.result.album.albums) {
        this.albumText = res.result.album.moreText
        this.album = res.result.album.albums.map(item => {
          return {
            picUrl: item.picUrl,
            id: item.id,
            name: item.name,
            artist: item.artist.name,
            publishTime: item.publishTime
          }
        })
      }
      // 获取搜索到的歌曲
      if (res.result.song) {
        this.songText = res.result.song.moreText
        this.songs = res.result.song.songs.map(item => {
          return {
            id: item.id,
            songName: item.name,
            yuanc: [],
            singer: item.ar,
            zhuanji: item.al.name,
            mv: item.mv
          }
        })
      }
      // 获取搜索到的歌单
      if (res.result.playList) {
        this.sheetText = res.result.playList.moreText
        this.sheets = res.result.playList.playLists.map(item => {
          return {
            id: item.id,
            name: item.name,
            trackCount: item.trackCount,
            playCount: toStringNum(item.playCount),
            coverImgUrl: item.coverImgUrl,
            creator: item.creator.nickname
          }
        })
      }
      // 获取搜索到的视频
      if (res.result.video) {
        this.videosText = res.result.video.moreText
        this.videos = res.result.video.videos.map(item => {
          return {
            id: item.id,
            title: item.title,
            durationms: durationTime(item.durationms),
            playTime: toStringNum(item.playTime),
            coverUrl: item.coverUrl,
            creator: item.creator[0].userName
          }
        })
      }
      // 获取搜索到的讨论
      if (res.result.talk) {
        this.talksText = res.result.talk.moreText
        this.talks = res.result.talk.talks.map(item => {
          return {
            talkName: item.talkName,
            follows: toStringNum(item.follows), // 关注
            participations: toStringNum(item.participations), // 参与
            coverUrl: item.shareCover.url
          }
        })
      }
      // 获取搜索到的艺术家
      if (res.result.artist) {
        this.artistText = res.result.artist.moreText
        this.artist = res.result.artist.artists.map(item => {
          return {
            name: item.name,
            alia: item.alias,
            accountId: item.accountId || null,
            picUrl: item.picUrl
          }
        })
      }
      // 获取搜索到的d电台
      if (res.result.djRadio) {
        this.djRadioText = res.result.djRadio.moreText
        this.djRadio = res.result.djRadio.djRadios.map(item => {
          return {
            id: item.id,
            name: item.name,
            picUrl: item.picUrl,
            nickname: item.dj.nickname
          }
        })
      }
      // 相关搜索
      if (res.result.sim_query) {
        this.sim_query = res.result.sim_query.sim_querys.map(item => item.keyword)
      }
    },
    // 查看更多
    moreContent (index) {
      console.log('跳转啦', index)
      switch (index) {
        case 1: // 单曲
          this.$router.replace(
            '/discover/search/searchDetail/song/' + this.keywords
          )
          break
        case 2: // 视频
          this.$router.replace(
            '/discover/search/searchDetail/video/' + this.keywords
          )
          break
        case 3: // 歌手
          this.$router.replace(
            '/discover/search/searchDetail/singer/' + this.keywords
          )
          break
        case 4: // 专辑
          this.$router.replace(
            '/discover/search/searchDetail/album/' + this.keywords
          )
          break
        case 5: // 歌单
          this.$router.replace(
            '/discover/search/searchDetail/sheet/' + this.keywords
          )
          break
        case 6: // 主播电台
          this.$router.replace(
            '/discover/search/searchDetail/radio/' + this.keywords
          )
          break
        // case 7: // MV
        //   this.$router.replace(
        //     '/discover/search/searchDetail/mv/' + this.keywords
        //   )
        //   break
        // case 8: // 用户
        //   this.$router.replace(
        //     '/discover/search/searchDetail/user/' + this.keywords
        //   )
        //   break
        default:
          break
      }
    }
  },
  created () {
    this.$loading.loadingShow()
    this.getList()
  },
  mounted () {
    this.$nextTick(() => {
      this.$loading.loadingNo()
    })
  },
  // 解决组件复用的跳转问题
  watch: {
    $route: function (to, from) {
      if (to.params.keywords != from.params.keywords) {
        this.getList()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.DetailWhole {
  width: 100%;
  height: 100%;
  padding: 0.266312rem 0.372836rem;
  overflow-y: scroll;
  .bbox {
    margin-bottom: 0.532623rem;
    padding: 0.35rem 0.23rem;
    background-color: #f8f8f8;
    border-radius: 0.23rem;
    .title {
      width: 100%;
      height: 0.665779rem;
      line-height: 0.665779rem;
      font-size: .4rem;
      margin-bottom: 0.133156rem;
      clear: both;
    }
    .albumItem {
      width: 100%;
      height: 2.130493rem;
      display: flex;
      margin-bottom: 0.213049rem;
      .left {
        flex: 3;
        position: relative;
        .img {
          width: 2.130493rem;
          height: 2.130493rem;
          border-radius: 0.133156rem;
        }
        .black {
          position: absolute;
          width: 80%;
          height: 100%;
          right: .266667rem;
          z-index: -1;
        }
      }
      .right {
        flex: 7;
        display: flex;
        align-items: center;
        .box {
          margin-left: 0.106525rem;
          .name {
            font-size: 0.399467rem;
            line-height: .48rem;
            margin-bottom: .133333rem;
          }
          .detail {
            font-size: 0.319574rem;
            color: #a7a7a8;
          }
        }
      }
    }
    .sheetItem {
      height: 2.130493rem;
      display: flex;
      margin-bottom: 0.213049rem;
      width: 100%;
      .sleft {
        flex: 3;
        img {
          width: 2.130493rem;
          height: 2.130493rem;
          border-radius: 0.133156rem;
        }
      }
      .sright {
        flex: 7;
        display: flex;
        align-items: center;
        .box {
          margin-left: 0.106525rem;
          .stitle {
            width: 6.190413rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 0.372836rem;
            margin-left: 0.133156rem;
            margin-bottom: .133333rem;
          }
          .sheetdetail {
            width: 6.190413rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 0.319574rem;
            color: rgb(150, 150, 150);
            height: 0.399467rem;
            line-height: 0.399467rem;
            margin-left: 0.133156rem;
          }
        }
      }
    }
    .videoItem {
      display: flex;
      height: 1.997337rem;
      margin-bottom: 0.213049rem;
      .vleft {
        flex: 4;
        position: relative;
        .count {
          position: absolute;
          right: 0.319574rem;
          top: 0;
          color: #fff;
          font-size: 0.319574rem;
        }
        img {
          width: 3.462051rem;
          height: 100%;
          border-radius: 0.133156rem;
        }
      }
      .vright {
        flex: 6;
        display: flex;
        align-items: center;
        .vtitle {
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          font-size: 0.346205rem;
          margin-bottom: .133333rem;
        }
        .videoDetail {
          font-size: 0.319574rem;
          color: #a7a7a8;
        }
      }
    }
    &.sim_query {
      margin-bottom: 0.532623rem;
      .sim_box {
        display: flex;
        flex-wrap: wrap;
        justify-content: left;
        .simItem {
          float: left;
          padding: 0.133156rem .266667rem;
          font-size: .32rem;
          border-radius: 0.798935rem;
          margin-right: 0.186418rem;
          margin-bottom: 0.186418rem;
          background-color: rgb(253, 253, 253);
          box-shadow: 0 0 5px rgba(0, 0, 0, 0.158);
        }
      }
    }
    .talkItem {
      display: flex;
      height: 1.864181rem;
      margin-bottom: 0.213049rem;
      .tleft {
        flex: 2.3;
        img {
          width: 1.864181rem;
          height: 1.864181rem;
          border-radius: 0.133156rem;
        }
      }
      .tright {
        flex: 7.7;
        display: flex;
        align-items: center;
        .ttitle {
          font-size: 0.399467rem;
          margin-bottom: .133333rem;
        }
        .talkDetail {
          font-size: 0.319574rem;
          color: #a7a7a8;
        }
      }
    }
    .artistItem {
      display: flex;
      height: 2.130493rem;
      margin-bottom: .213333rem;
      .aleft {
        flex: 2.5;
        img {
          width: 2.130493rem;
          height: 2.130493rem;
          border-radius: 50%;
        }
      }
      .aright {
        flex: 7;
        line-height: 2.130493rem;
        font-size: 0.45273rem;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-all;
        .a1 {
          color: #a7a7a8;
        }
      }
    }
    .djItem {
      width: 100%;
      height: 2.130493rem;
      display: flex;
      margin-bottom: 0.213049rem;
      .dleft {
        flex: 2;
        img {
          width: 2.130493rem;
          height: 2.130493rem;
          border-radius: 0.133156rem;
        }
      }
      .dright {
        flex: 8;
        display: flex;
        align-items: center;
        .dbox {
          margin-left: 0.266312rem;
          .dname {
            width: 6.391478rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 0.399467rem;
            margin-bottom: .133333rem;
          }
          .dnickname {
            font-size: 0.319574rem;
            color: #a7a7a8;
          }
        }
      }
    }
  }
}
</style>
