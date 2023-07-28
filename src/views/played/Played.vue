<template>
  <!-- 最近播放列表 -->
  <div class="Played">
    <menu-nav class="navbar" :navTitle="navTitle"></menu-nav>
    <div class="conscroll" ref="conscroll">
      <div class="box">
        <div class="topbox">
          <i class="iconfont icon-gequbofang" @click="playAll"></i>
          <div class="text">
            播放全部<span class="count">（共{{ songList.length }}首）</span>
          </div>
        </div>
        <song-item :songList="songList" @playSong="playSong"></song-item>
      </div>
    </div>
  </div>
</template>

<script>
import MenuNav from '@/components/context/menuNav/MenuNav.vue'
import SongItem from '@/components/context/songItem/SongItem.vue'

import { getPlayList } from '@/api/played.js'
export default {
  name: 'Played',
  components: {
    MenuNav,
    SongItem
  },
  props: ['id', 'nickname'],
  data () {
    return {
      navTitle: '最近播放',
      songList: [], // 歌曲列表
      songListId: [] // 歌曲id列表
    }
  },
  methods: {
    async getList () {
      const { data: res } = await getPlayList(this.id)
      // console.log(res)
      this.songList = res.allData.map(item => {
        return {
          mv: item.song.mv,
          songName: item.song.name,
          id: item.song.id,
          singer: item.song.ar,
          zhuanji: item.song.al.name,
          yuanc: item.song.alia
        }
      })
      this.songListId = res.allData.map(item => item.song.id)
      // console.log(this.songListId)
    },
    // 全部播放
    playAll () {
      if (this.songListId.length) {
        this.playSong(this.songListId[0])
      }
    },
    // 播放歌曲
    playSong (sid) {
      // 播放歌曲
      this.$router.push('/playSong/' + sid)
      // 这里还要存上歌单
      // 只有当打算播放歌曲的时候才会把该歌单存下来一样的歌单就不用存了
      if (this.$store.state.sheet.sheetId != this.id) {
        this.$store.state.sheet.sheetId = this.id // 保存歌单列表
        // 将歌单保存到state中
        this.$store.state.sheet.userId = this.id // 这是最近播放歌单,创造者id与歌单id是一个
        this.$store.state.sheet.nickname = '最近播放'
        this.$store.state.sheet.songListId = this.songListId
        this.$store.state.sheet.trackCount = this.songListId.length
        // console.log(this.$store.state.sheet)
      }
      this.$store.commit('searchIndex', sid)
      console.log(this.$store.state.sheet, this.$store.state.playSong.currentIndex)
    }
  },
  created () {
    this.getList()
  }
}
</script>

<style lang="less" scoped>
.navbar {
  position: fixed;
  top: 0;
  z-index: 20;
  background-color: #fff;
}
.conscroll {
    position: absolute;
    width: 100%;
    top: 45px;
    bottom: 45px;
    overflow-y: auto;
    box-sizing: border-box;
    .box {
      padding: .213333rem .426667rem;
      /* height: 300px; */
      background-color: #fff;
      .topbox {
        width: 100%;
        height: 1.066667rem;
        line-height: 1.066667rem;
        font-size: .4rem;
        display: flex;
        align-items: center;
        .icon-gequbofang {
          font-size: .48rem;
          color: var(--red);
        }
        .text {
          margin-left: .266667rem;
          .count {
            font-size: .346667rem;
            color: #999999;
          }
        }
      }
    }
}
</style>
