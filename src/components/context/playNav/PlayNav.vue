<template>
  <div class='bottomPlay' v-show="$store.state.isShowNav">
    <!-- audio元素 -->
    <audio ref='navAudio' id="navMusic" :src="$store.state.playSong.musicUrl"></audio>
    <!-- 音乐标签 -->
    <div class='cd'>
      <img :src="$store.state.playSong.picUrl || img" alt="暂无封面" />
    </div>
    <!-- 歌曲信息 -->
    <div class='text' @click="playDetail">
      <!-- 歌名 -->
      <div class='item top'>
        {{ $store.state.playSong.songName === "" ? "" : $store.state.playSong.songName }}
      </div>
      <!-- 作者 -->
      <div class='item bottom'>
        {{ $store.state.playSong.singers === "" ? "暂无歌手" : $store.state.playSong.singers }}
      </div>
    </div>
    <!-- 播放按钮 -->
    <div class='play' @click='isPlaySong'>
      <i class='iconfont' :class="isPlay"></i>
    </div>
    <!-- 播放列表 -->
    <div class="list">
      <i class="iconfont icon-liebiao"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlayNav',
  data () {
    return {
      img: require('@/assets/music.png'),
      songName: '测试歌曲',
      singer: '歌手'
    }
  },
  methods: {
    playDetail () {
      if (this.$store.state.playSong.songId > 0) {
        this.$router.push('/playSong/' + this.$store.state.playSong.songId)
      } else {
        return this.$toast.show('暂无播放歌曲', 1900)
      }
    },
    // 底部播放栏
    isPlaySong () {
      if (!this.$store.state.playSong.musicUrl) {
        return this.$toast.show('暂无播放歌曲', 1900)
      }
      if (this.$store.state.playSong.playNow) {
        // 暂停
        this.$store.state.playSong.playNow = false
        this.$store.state.navMusicDom.pause()
      } else {
        // 播放
        this.$store.state.playSong.playNow = true
        this.$store.state.navMusicDom.play()
      }
      console.log(this.$store.state.playSong.playNow)
    }
  },
  computed: {
    isPlay () {
      return this.$store.state.playSong.playNow ? 'icon-gequtingzhi' : 'icon-gequbofang'
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.$store.state.navMusicDom = document.getElementById('navMusic') // 保存播放器
      // 监听播放时间
      this.$store.state.navMusicDom.addEventListener('play', () => {
        this.$store.state.playSong.playNow = true
      })
      // 监听暂停事件
      this.$store.state.navMusicDom.addEventListener('pause', () => {
        this.$store.state.playSong.playNow = false
      })
      // 监听播放结束事件
      this.$store.state.navMusicDom.addEventListener('ended', () => {
        this.$store.state.playSong.playNow = false
      })
    })
  }
}
</script>

<style lang="less" scoped>
.bottomPlay {
  width: 100%;
  height: 45px;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
  position: fixed;
  z-index: 48;
  bottom: 0;
  display: flex;
  align-items: center;
  .cd {
    flex: 1;
    height: 100%;
    width: 40.5px;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 32px;
      height: 32px;
      overflow: hidden;
      border-radius: 50%;
    }
  }
  .text {
    flex: 4.4;
    width: 6.396538rem;
    font-size: 14px;
    .item {
      height: 17px;
      &.top {
        width: 220px;
        margin-top: 2px;
        margin-left: 0.266312rem;
        font-size: 15px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      &.bottom {
        width: 220px;
        font-size: 13px;
        margin-left: 0.266312rem;
        color: #a0a0a0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  .play {
    flex: 0.8;
    width: 1.283622rem;
    display: flex;
    align-items: center;
    justify-content: center;
    .iconfont {
      position: relative;
      top: .013333rem;
      font-size: .633333rem;
    }
  }
  .list {
    flex: 0.8;
    width: 1.283622rem;
    display: flex;
    align-items: center;
    justify-content: center;
    .iconfont {
      position: relative;
      top: .013333rem;
      font-size: .633333rem;
    }
  }
}
</style>
