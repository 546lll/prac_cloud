<template>
  <div class="lyricList">
    <div class="LyricListContent">
      <ul ref="list" v-if="lyricText.length">
        <li class="item" v-for="(item, index) in lyricText" :key="index">
          <div :class="{ active: index === activeIndex }" class="itemSpan">
            {{ item }}
          </div>
        </li>
      </ul>
      <div class="nolyric" v-else>暂时还没有歌词</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LyricList',
  props: {
    lyricText: {
      // 歌词内容
      type: Array,
      default: () => []
    },
    lyricTime: {
      // 歌词时间
      type: Array,
      default: () => []
    },
    showLyric: {
      // 是否显示歌词
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      activeIndex: 0, // 激活的歌词索引
      spansHeight: [], // 每句歌词需要移动的距离
      topHeight: 0, // 歌词初始高度
    }
  },
  watch: {
    // 通过监听showLyric判断歌词有没有被渲染完（要通过this.$nextTick，保证dom结构的更新）
    showLyric (cur) {
      if (cur) {
        // console.log('是不是该加载歌词了')
        this.$nextTick(() => {
          this.topHeight = document.getElementsByClassName('LyricListContent')[0].clientHeight * 0.45
          // console.log(this.spansHeight)
          // 如果歌词还未渲染，就清空spansHeight
          this.spansHeight = []
          if (this.lyricText.length) {
            // 计算出每个歌词需要移动的距离, 前缀和
            const spans = document.getElementsByClassName('itemSpan') // 每句歌词
            let last = 0
            for (let span of spans) {
              this.spansHeight.push(last)
              last = last + (span.clientHeight === 0 ? 0 : (span.clientHeight + 17)) // 如果遇到空歌词，就不动
            }
          }
        })
        this.seeked()
      }    
    }
  },
  methods: {
    // 更新歌词
    timeUpDate() {
      // let content = document.getElementsByClassName("LyricListContent")[0] // 歌词内容盒子
      if (this.lyricText && this.lyricText.length && this.showLyric) {
        // 如果现在播放的时间大于等于歌词时间，就滚动歌词
        if (this.$store.state.navMusicDom.currentTime >= this.lyricTime[this.activeIndex + 1] && this.activeIndex < this.lyricText.length) {
          let toTop = this.topHeight - this.spansHeight[this.activeIndex + 1] // 歌词top的位置
          this.$refs.list.style.top = toTop + 'px'
          this.activeIndex++ // 歌词下移
        }
      }
    },
    // 拖动进度条
    seeked () {
      if (this.showLyric && this.lyricText.length) {
        let seekIndex = this.lyricTime.filter(item => this.$store.state.navMusicDom.currentTime >= item).length // 改变进度条歌词应该停留的位置
        let toTop = this.topHeight - this.spansHeight[seekIndex] // 歌词top的位置
        if (this.$refs.list) this.$refs.list.style.top = toTop + 'px'
        this.activeIndex = seekIndex // 更新激活歌词的索引
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      const spans = document.getElementsByClassName('itemSpan') // 每句歌词
      if (this.lyricText.length && !this.spansHeight.length) {
        // 计算出每个歌词需要移动的距离, 前缀和
        let last = 0
        for (let span of spans) {
          this.spansHeight.push(last)
          last = last + (span.clientHeight === 0 ? 0 : (span.clientHeight + 17))
        }
      }
      // 绑定timeupdate事件
      this.$store.state.navMusicDom.addEventListener('timeupdate', this.timeUpDate)
      // 如果歌曲播放完毕，则将歌词重置
      this.$EventBus.$on('playEnd', (playEnd) => {
        if (playEnd && this.$refs.list) {
          this.$refs.list.style.top = '45%'
        }
      })
      // 拖动进度条,触发seeked事件
      this.$store.state.navMusicDom.addEventListener('seeked', this.seeked)
    })
  },
  destroyed () {
    this.$store.state.navMusicDom.removeEventListener('timeupdate', this.timeUpDate)
    this.$store.state.navMusicDom.addEventListener('seeked', this.seeked)
  }
  
}
</script>

<style lang="less" scoped>
.lyricList {
  .LyricListContent {
    width: 80%;
    position: relative;
    top: 5%;
    overflow: hidden;
    margin: 0 auto;
    height: 90%;
    font-size: .346667rem;
    letter-spacing: .053333rem;
    color: #757575;
    ul {
      position: absolute;
      top: 45%;
      width: 100%;
      transition: 0.15s linear;
      .item {
        margin-top: 17px;
        text-align: center;
        .active {
          color: #fff;
        }
      }
    }
    .nolyric {
      position: absolute;
      top: 45%;
      left: 50%;
      text-align: center;
      font-size: 20px;
      color: #fff;
      transform: translate(-50%, -50%);
    }
  }
}
</style>
