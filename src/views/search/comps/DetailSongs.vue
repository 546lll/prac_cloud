<template>
  <div class="DetailSongs" ref="box">
    <div class="topbox">
      <i class="iconfont icon-gequbofang"></i>
      播放全部
    </div>
    <song-item :songList="songs"></song-item>
  </div>
</template>

<script>
import SongItem from '@/components/context/songItem/SongItem.vue'
import { searchResult } from '@/api/search'

export default {
  name: 'DetailSongs',
  props: ['keywords'],
  components: {
    SongItem
  },
  data () {
    return {
      songs: [],
      offset: 0,
      more: true // 判断更多数据
    }
  },
  methods: {
    async getSongs () {
      if (this.more) {
        const { data: res } = await searchResult(this.keywords, 30, this.offset * 30, 1)
        if (res.result.songs) {
          this.songs.push(...res.result.songs.map(item => {
            return {
              id: item.id,
              songName: item.name,
              yuanc: [],
              singer: item.artists,
              zhuanji: item.album.name,
              mv: item.mvid
            }
          }))
          this.offset++
        }
        this.more = res.result.hasMore
      } else {
        this.$toast.show('没有更多了:(', 1900)
      }
    },
    // 监听滚动事件
    linearScroll () {
      const box = this.$refs.box
      // 滚动条距离顶部的距离
      const scrollTop =
        box.scrollTop
      // 可视区的高度
      const clientHeight =
        box.clientHeight
      // 滚动条可滚动的高度
      const scrollHeight =
        box.scrollHeight
      if (scrollTop + clientHeight >= scrollHeight - 1) {
        this.$loading.loadingShow()
        setTimeout(() => {
          this.getSongs()
          this.$loading.loadingNo()
        }, 1000)
      }
    }
  },
  created () {
    this.$loading.loadingShow()
    this.getSongs()
  },
  mounted () {
    const box = this.$refs.box
    this.$nextTick(() => {
      box.addEventListener('scroll', this.linearScroll)
      this.$loading.loadingNo()
    })
  },
  deactivated () {
    const box = this.$refs.box
    box.removeEventListener('scroll', this.linearScroll)
  }
}
</script>

<style lang="less" scoped>
.DetailSongs {
  padding: 0.266312rem 0.372836rem;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  .topbox {
    height: 0.665779rem;
    font-size: 0.426099rem;
    margin-bottom: 0.133156rem;
    display: flex;
    align-items: center;
    .iconfont {
      font-size: .4rem;
      margin-right: .133333rem;
      color: var(--red);
    }
  }
}
</style>
