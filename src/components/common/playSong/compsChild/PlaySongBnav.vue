<template>
  <div class="PlaySongBnav">
    <div class="item img1">
      <i class="iconfont" :class="'icon-' + modes[modeIndex]" @click="modeChange"></i>
    </div>
    <div class="item img1" @click="lastSong">
      <i class="iconfont icon-shangyishou"></i>
    </div>
    <div class="item img2" @click="playSong">
      <i class="iconfont" :class="playIcon"></i>
    </div>
    <div class="item img1" @click="nextSong">
      <i class="iconfont icon-xiayishou"></i>
    </div>
    <div class="item img1">
      <i class="iconfont icon-liebiao"></i>
    </div>
  </div>
</template>

<script>

export default {
  name: 'PlaySongBnav',
  data () {
    return {
      modes: ['xunhuan', 'shuffle', 'repeatOnce'], 
      modeIndex: 0
    }
  },
  methods: {
    // 切换模式：循环，随机和单曲循环
    modeChange () {
      this.modeIndex ++ 
      if (this.modeIndex > 2) this.modeIndex = 0
      if (this.$store.state.sheet.songListId.length <= 0) {
        this.modeIndex = 2
        this.$toast.show('请选择合适的歌单,接下来的模式为单曲循环模式', 2000)
      }
      this.$store.state.mode = this.modes[this.modeIndex] // 将模式保存下来
      // 随机模式打乱跟单列表
      if (this.$store.state.mode == 'shuffle') {
        this.$store.commit('shuffle')
        // 重新更新一下索引
        this.$store.commit('searchIndex', this.$store.state.playSong.songId)
      }
    },
    playSong () {
      this.$emit('playBtn')
    },
    lastSong () {
      this.$emit('lastBtn')
    },
    nextSong () {
      this.$emit('nextBtn')
    }
    /*
    // 播放状态下，图片显示暂停,这些通过父组件来调动
    playingImg() {
      this.playIcon = 'icon-gequtingzhi'
    },
    // 暂停状态下，图片显示播放
    endImg() {
      this.playIcon = 'icon-gequbofang'
    },
    */
  },
  computed: {
    playIcon () {
      return this.$store.state.playSong.playNow ? 'icon-gequtingzhi' : 'icon-gequbofang'
    }
  }
}
</script>

<style lang="less" scoped>
// @import url('http:////at.alicdn.com/t/c/font_4139840_k5dogr4yyjl.css');
.PlaySongBnav {
  width: 100%;
  height: 2.666667rem;
  /* background-color: red; */
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  text-align: center;
  .item {
    flex: 1;
    &.img1 {
      margin-top: .533333rem;
      color: #fff;
      .iconfont{
        font-size: 0.8333rem;
      }
    }
    &.img2 {
      margin-top: .293333rem;
      .iconfont{
        color: #fff;
        font-size: 1.066667rem;
        position: relative;
        top: .266667rem;
      }
    }
  }
}
</style>
