<template>
  <div class="songs">
    <div class="topbox">
      <div class="left">{{ title }}歌曲 ({{ this.songs.length }})</div>
      <div class="right">
        <div class="toggle" @click="toggle">
          <i class="iconfont" :class="icon"></i>{{ toggleTitle }}
        </div>
      </div>
    </div>
    <div>
      <song-item :songList="songs" @playSong="playSong"></song-item>
    </div>
  </div>
</template>

<script>
import SongItem from '@/components/context/songItem/SongItem.vue'

import { getSongsList } from '@/api/singer.js'

export default {
  name: 'Songs',
  props: ['artistId'],
  components: {
    SongItem
  },
  data () {
    return {
      songs: [], // 歌曲列表
      icon: 'icon-shijianpaihang',
      index: 0, // 切换歌曲排列
      toggleTitle: '按时间排列', // 排序方式
      title: '最新' // 热门、最新
    }
  },
  methods: {
    async getSongs (order) {
      const { data: res } = await getSongsList(this.artistId, order, 50)
      this.songs = res.songs.map(item => {
        return {
          mv: item.mv,
          songName: item.name,
          id: item.id,
          singer: item.ar,
          zhuanji: item.al.name,
          yuanc: item.alia
        }
      })
    },
    toggle () {
      if (this.index === 0) {
        this.songs = []
        this.getSongs('hot')
        this.toggleTitle = '按热度排列'
        this.icon = 'icon-redupaihang'
        this.title = '热门'
        this.index = 1
      } else {
        this.songs = []
        this.getSongs('time')
        this.toggleTitle = '按时间排列'
        this.icon = 'icon-shijianpaihang'
        this.title = '最新'
        this.index = 0
      }
    },
    playSong (sid) {
      // 播放歌曲, 这里没有把歌单存下来
      this.$router.push('/playSong/' + sid)
    }
  },
  created () {
    this.getSongs('time')
  }
}
</script>

<style lang="less" scoped>
.songs {
  padding: 0 0.399467rem 0.399467rem;
  margin-bottom: 45px;
  background-color: #fff;
  min-height: 12.4rem;
  position: relative;
  z-index: -1;
  .topbox {
    width: 100%;
    font-size: 0.426099rem;
    margin-bottom: 0.133156rem;
    height: 0.665779rem;
    line-height: 0.665779rem;
    display: flex;
    .left {
      flex: 1;
      font-size: .4rem;
    }
    .right {
      flex: 1;
      .toggle {
        font-size: 0.346205rem;
        line-height: 0.665779rem;
        float: right;
        .iconfont {
          font-size: .32rem;
          margin-right: .106667rem;
        }
      }
    }
  }
}
</style>
