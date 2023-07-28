<template>
  <div class="songbox" :style="{background: 'url(' + bgimg + ') no-repeat'}">
    <div class="PlaySong">
      <!-- 导航栏 -->
      <song-topnav
        @back='back'
        @fx='fx'
        :navTitle="navTitle"
        :authors="singers"
        :rightImg="true">
      </song-topnav>
      <!-- 旋转的CD,当前元素先完成过渡，新元素再进入-->
      <!-- 这里有问题， tranction中的数据没法同步更新,后面加载出来了？？不明白！！ -->
      <transition name="logo" mode="out-in">
        <!-- 点击跳转歌词，现在是旋转的乐曲 -->
        <div v-show="showLogo" @click="showLogo = false" class="logo">
          <!-- 旋转的内容 -->
          <div ref="guanp" class="guanp">
            <!-- CD -->
            <img
              class="img"
              src="@/assets/img/common/cd.png"
              alt=""
            />
            <!-- 封面 -->
            <div class="songImg">
              <img :src="bgimg" alt="" />
            </div>        
          </div>
        </div>
      </transition>
      <transition name="lyric" mode="out-in">
        <lyric-list
          @click.native="showLogo = true"
          v-show="!showLogo"
          class="lyric"
          :lyricText="lyricText"
          :lyricTime="lyricTime"
          :showLyric="!showLogo"
        ></lyric-list>
      </transition>
      <!-- 操作栏 -->
      <div class="PlaySongNav">
        <div class="navitem">
          <i class="iconfont icon-aixin"></i>
        </div>
        <div class="navitem">
          <i class="iconfont icon-xiazai"></i>
        </div>
        <div class="navitem">
          <i class="iconfont icon-changge"></i>
        </div>
        <div class="navitem" @click="ShowComment">
          <i class="iconfont icon-pinglun"></i>
        </div>
        <div class="navitem">
          <i class="iconfont icon-liebiao"></i>
        </div>
      </div>
      <!-- 播放进度栏 -->
      <div class="playbox">
        <!-- 播放时间 -->
        <div class="start">
          {{ '10' > minT ? '0' + minT : minT }}: {{ '10' > secondT ? '0' + secondT : secondT}}
        </div>
        <!-- 进度条 -->
        <div class="PlaySongTime">
          <van-slider
            class="box"
            v-model="value"
            active-color="#ee0a24"
            bar-height="3px"
            inactive-color="#cdcdcd"
            @change="onChange"
          >
            <template #button>
              <div class="custom-button"></div>
            </template>
          </van-slider>
        </div>
        <!-- 播放总时间 -->
        <div class="end">{{ songLength }}</div>
      </div>
      <!-- 播放切换栏 -->
      <bnav ref="bnav" @playBtn="playBtn" @nextBtn="changeSongBtn(1)" @lastBtn="changeSongBtn(-1)"></bnav>
      <!-- 分享组件 -->
      <van-share-sheet
        v-model="showShare"
        title="立即分享给好友"
        :options="options"
      ></van-share-sheet>
    </div>
  </div> 
</template>

<script>
import SongTopnav from '@/components/context/songTopNav/SongTopnav.vue'  // 顶部导航栏
import LyricList from '@/components/common/lyricList/LyricList.vue'  //歌词
import Bnav from './compsChild/PlaySongBnav.vue'  // 播放切换栏

import { getSongDetial, getSongUrl, getLyric } from '@/api/played';

export default {
  name: 'PlaySong',
  props: [ 'sid' ],
  components: {
    SongTopnav,
    LyricList,
    Bnav
  },
  data () {
    return {
      navTitle: '', //歌曲标题
      id: '', // 歌曲id
      bgimg: '', // 封面图
      songUrl: '', //音乐url
      singers: '', // 歌手
      showLogo: true, // 是否展示唱片/歌词
      songLength: '00:00', // 歌曲总时间长度,00:00形式的
      songTime: 62, // 歌曲总秒数
      minT: 0, // 左侧进度条时间的分钟位
      secondT: 0, // 左侧进度条时间的秒钟位
      value: 0, // 进度上的值
      cTime: 0, // 实时秒数
      showShare: false, // 是否分享
      rotateDeg: 0, // 封面旋转角度
      lyricText: [], // 歌词列表
      lyricTime: [], //歌词时间列表
      options: [
        [
          { name: '微信', icon: 'wechat' },
          { name: '朋友圈', icon: 'wechat-moments' },
          { name: '微博', icon: 'weibo' },
          { name: 'QQ', icon: 'qq' },
        ],
        [
          { name: '复制链接', icon: 'link' },
          { name: '分享海报', icon: 'poster' },
          { name: '二维码', icon: 'qrcode' },
          { name: '小程序码', icon: 'weapp-qrcode' },
        ],
      ],
      // 定时器
      timeS: null, // 计算时间的定时器
      rotateLogo: null // 封面旋转的定时器
    }
  },
  methods: {
    // 获取歌曲信息
    async getSong () {
      // 获取歌曲信息
      this.showLogo = true
      if (this.$store.state.playSong.songId != this.sid) {
        // 新的歌曲
        // 切换歌曲
        // this.$store.state.playSong.playNow = false
        const { data: res } = await getSongDetial(this.sid)
        const song = res.songs[0]
        let singers = song.ar.map(item => item.name)
        singers = singers.join('/')  // 歌手
        
        // 存入到state中
        this.$store.state.playSong.songName = song.name // 歌曲名
        this.$store.state.playSong.singers = singers // 歌手
        this.$store.state.playSong.songId = song.id // 歌曲id
        this.$store.state.playSong.picUrl = song.al.picUrl // 歌曲封面
      
        // 获取歌曲url
        const { data: res1 } = await getSongUrl(song.id)
        this.$store.state.navMusicDom.src = res1.data[0].url // 歌曲url
        this.$store.state.playSong.musicUrl = res1.data[0].url // 歌曲url
        // 添加监听事件，通过canplay，获得duration
        this.$store.state.navMusicDom.addEventListener('canplay', () => {
          this.songTime = this.$store.state.navMusicDom.duration.toFixed(2)
          this.$store.state.playSong.songTime = this.songTime
          this.songLoad(this.songTime)
          // 实在是太吵了，安静一会
          // // 开始播放
          this.$store.state.playSong.playNow = true // 切换到播放状态
          this.$store.state.navMusicDom.play() // 播放音乐
          clearInterval(this.timeS) // 清除定时器，防止多个定时器
          this.timeS = setInterval(this.setInPLay, 1000) // 设置定时器
          clearInterval(this.rotateLogo)
          this.rotateLogo = setInterval(this.rotate, 50) // 设置旋转定时器
        })
      } else {
        this.songTime = this.$store.state.playSong.songTime
        this.songLoad(this.songTime) // 计算总时长
        
        // 计算歌曲现在的进度条
        this.value = this.$store.state.navMusicDom.currentTime *(100 / this.$store.state.navMusicDom.duration)
        this.cTime = this.$store.state.navMusicDom.currentTime // 记录实时秒数
        this.minT = Math.floor(this.cTime / 60)  // 计算显示时间
        this.secondT = (this.cTime % 60).toFixed(0)  // 计算显示时间
        clearInterval(this.timeS) // 清空定时器
        clearInterval(this.rotateLogo) // 清空定时器
          // 开启定时器
        if (this.$store.state.playSong.playNow) {
          this.timeS = setInterval(this.setInPLay, 1000) // 设置定时器
          this.rotateLogo = setInterval(this.rotate, 50)
        }
        if (this.value >= 100 ) {
          this.ended()
        }
      }
      this.id = this.$store.state.playSong.songId // 歌曲id
      this.bgimg = this.$store.state.playSong.picUrl // 歌曲封面
      this.singers = this.$store.state.playSong.singers // 歌手
      this.navTitle = this.$store.state.playSong.songName // 歌曲名
      // 加载歌词
      const { data: res2 } = await getLyric(this.$store.state.playSong.songId)
      if (res2.lrc) {
        this.changeLyric(res2.lrc)
      }
    },
    // 调整歌词
    async changeLyric (lrc) {
      // 提取歌词
      let text = lrc.lyric
      let reg1 = /(?<=\[)(.*)(?=\])/g // 时间的正则表达式
      let time = text.match(reg1) // match 选中匹配成功的内容
      let reg2 = /(?<=\])(.*)(?=\n)/g // 歌词的正则表达式
      let lyric = text.match(reg2) // 把时间去掉
      this.lyricText = lyric // 获取歌词
      
      // 整理下每句歌词到达的时间位置
      for (let i = 0; i < time.length; i++) {
        time[i] = parseInt(time[i].slice(0, 2)) * 60 + parseFloat(time[i].slice(3, 8), 2) // 计算秒数
      }
      this.lyricTime = time
      let num = 0.15
      for (let i = 0; i < this.lyricTime.length; i++) {
        if (this.lyricTime[i] === 0) this.lyricTime[i] = 0.15 // 首句起始时间+0.15,避免歌词滚动出错
        // 检查是否有非数值存在设置为0
        if (isNaN(this.lyricTime[i])) {
          this.lyricTime.splice(i, 1, (num += 0.15))
        }
        // 如果有不同歌词在相同时间出现或者顺序混乱
        if ((i < this.lyricTime.length - 1) && 
            (this.lyricTime[i] === this.lyricTime[i + 1] || this.lyricTime[i] >= this.lyricTime[i + 1])
        ) {
          this.lyricTime.splice(i + 1, 1, this.lyricTime[i + 1] + 0.5)
        }
      }
    },
    // 退出播放界面
    back () {
      // 如果有歌单，退回到歌单详情页，没有就返回发现页
      /*
      if (this.$store.state.sheet.sheetId > 0) {
        this.$router.push('/playDetail/' + this.$store.state.sheet.sheetId + '&' + false)
      } else {
        this.$router.push('/')
      }
      */
      //  console.log(this.$route)
     this.$router.go(-1)
    },
    // 分享
    fx () {
      this.showShare=true
    },
    // 清空左侧时间
    clearTime () {
      this.minT = 0
      this.secondT = 0
    },
    // 播放/暂停键
    playBtn () {
      // 暂停音乐
      if (this.$store.state.playSong.playNow) {
        this.$store.state.playSong.playNow = false // 切换到暂停状态
        this.$store.state.navMusicDom.pause() // 触发暂停事件
        clearInterval(this.timeS) // 暂停时间
        clearInterval(this.rotateLogo) // 暂停旋转
        // 暂停封面旋转和定时器
        /*
        // 当歌曲完全播放结束后,没有添加切换歌曲功能，那就重新播放
        if (this.value >= 100) {
          // this.$refs.guanp.style.transform = 'rotate(0deg)' // 是封面旋转重置
          this.$store.state.playSong.currentTime = 0 // 重置播放时间
          this.$refs.bnav.playingImg()  // 切换图标
          this.value = 0 // 清空进度条
          this.clearTime() // 清空左侧时间
          // 重新播放音乐
          this.timeS = setInterval(this.setInPLay, 1000) // 开始计算时间（每隔一秒）
          this.play() // 触发播放事件
        */
        } else {
          // 切换到播放
          // 将要结束
          if (this.value >= 99.5) {
            this.end()
          }
          this.$store.state.playSong.playNow = true // 切换到播放状态
          this.$store.state.navMusicDom.play() // 播放音乐
          clearInterval(this.timeS) // 清除定时器，防止多个定时器
          this.timeS = setInterval(this.setInPLay, 1000) // 设置定时器
          clearInterval(this.rotateLogo)
          this.rotateLogo = setInterval(this.rotate, 50) // 设置旋转定时器
        }
    },
    // 切换歌曲
    // num:-1，上一曲, 1，下一曲
    changeSongBtn (num) {
      // 切断这首
      this.interrupt()
      // 查找切换歌曲的索引
      this.$store.commit('setSongIndex', num)
      if (this.$store.state.sheet.songListId.length) {
        let sid = this.$store.state.sheet.songListId[this.$store.state.playSong.currentIndex]
        // console.log(`该播放${num}一首了`, sid)
        this.$router.replace('/playSong/' + sid)
      } else {
        return this.$toast.show('请选择歌单', 2000)
      }
      // 重新获取歌曲，哈希地址改变了，但是没有跳转
      // this.getSong()

    },
    // 计算播放时间
    setInPLay () {
      this.secondT++
      this.cTime++
      if (this.secondT > 59) {
        this.secondT = 0
        this.minT++
      }
      // 计算进度条
      this.value = this.value + 100/this.songTime
      if (this.value >= 100) {
        // console.log('播放完成了吗')
        this.ended()
      }
    },
    // 封面旋转
    rotate () {
      this.rotateDeg += 1
      if (this.$refs.guanp) {
        this.$refs.guanp.style.transform = 'rotate(' + this.rotateDeg +'deg)'
      }
    },
    // 加载时间
    songLoad (songTime) {
      // 秒
      let second = parseInt(this.songTime % 60)
      second = second < 10 ? '0' + second : second
      // 分
      let min = Math.floor(this.songTime / 60)
      min = min < 10 ? '0' + min : min
      this.songLength = min + ':' + second // 总秒数
    },
    // 拖动进度条
    onChange (value) {
      this.setTime(value)
    },
    // 根据进度条改变此时的播放秒数
    setTime (value) {
      // 先暂停定时器
      clearInterval(this.rotateLogo)
      clearInterval(this.timeS)
      
      this.$store.state.navMusicDom.pause() // 短时暂停一下
      this.$store.state.navMusicDom.currentTime = value * (this.songTime / 100).toFixed(2) // 歌曲跳转到多少时间

      this.cTime = this.$store.state.navMusicDom.currentTime // 记录实时秒数
      this.minT = Math.floor(this.cTime / 60)  // 计算显示时间
      this.secondT = (this.cTime % 60).toFixed(0)  // 计算显示时间

      this.$store.state.navMusicDom.play() //
      // this.$store.state.playSong.playNow = true
      // console.log(this.$store.state.playSong.playNow)
      // 开启定时器
      this.timeS = setInterval(this.setInPLay, 1000) // 设置定时器
      this.rotateLogo = setInterval(this.rotate, 50)
      if (this.value >= 100 ) {
        this.ended()
      } 
    },
    playSong() {
      clearInterval(this.timeS); // 清除定时器
      clearInterval(this.rotateLogo) // 清除定时器
      this.timeS = setInterval(this.setInPLay, 1000) // 设置定时器
      this.rotateLogo = setInterval(this.rotate, 50) // 设置旋转
    },
    pauseSong() {
      clearInterval(this.timeS) // 清除定时器
      clearInterval(this.rotateLogo)
    },
    // 被切断的结束回调函数
    interrupt () {
      this.$store.state.navMusicDom.pause() // 改变了进度条后，歌曲不能正常结束，可能是因为拖动进度条后时间小数点不精确的原因
      // console.log('打断一下')
      this.$store.state.playSong.playNow = false // 切换状态
      clearInterval(this.timeS) // 清空定时器
      clearInterval(this.rotateLogo) // 清空定时器
      this.value = 0 // 清空进度条
      this.clearTime() // 清空左侧时间
      this.$store.state.navMusicDom.currentTime = 0 // 清空歌曲的已播放时间
      if (this.$refs.guanp) this.$refs.guanp.style.transform = 'rotate(0deg)' // 重置CD
      this.$EventBus.$emit('playEnd', true)
    },
    // 结束回调函数，要考虑模式
    ended () {
      this.$store.state.navMusicDom.pause() // 改变了进度条后，歌曲不能正常结束，可能是因为拖动进度条后时间小数点不精确的原因
      // console.log('要播放完了吗')
      this.$store.state.playSong.playNow = false // 切换状态
      clearInterval(this.timeS) // 清空定时器
      clearInterval(this.rotateLogo) // 清空定时器
      this.value = 0 // 清空进度条
      this.clearTime() // 清空左侧时间
      this.$store.state.navMusicDom.currentTime = 0 // 清空歌曲的已播放时间
      if (this.$refs.guanp) this.$refs.guanp.style.transform = 'rotate(0deg)' // 重置CD
      this.$EventBus.$emit('playEnd', true)
      // 随机/循环
      if (this.$store.state.mode != 'repeatOnce') {
        this.$store.commit('setSongIndex', 1)
        if (this.$store.state.sheet.songListId.length) {
          let sid = this.$store.state.sheet.songListId[this.$store.state.playSong.currentIndex]
          // console.log(sid)
          this.$router.replace('/playSong/' + sid)
          // 重新获取歌曲，哈希地址改变了，但是没有跳转
          this.getSong()
        }
      } else {
         // 如果模式为单曲循环开始播放
        this.$store.state.playSong.playNow = true // 切换到播放状态
        this.$store.state.navMusicDom.play() // 播放音乐
        clearInterval(this.timeS) // 清除定时器，防止多个定时器
        this.timeS = setInterval(this.setInPLay, 1000) // 设置定时器
        clearInterval(this.rotateLogo)
        this.rotateLogo = setInterval(this.rotate, 50) // 设置旋转定时器
      }
    },
    ShowComment () {
      this.$store.state.commentType = 1
      this.$router.push('/playComment/' + this.id + '&' + false)
    }
  },
  created () {
    this.getSong()
  },
  mounted () {
    this.$nextTick(() => {
      // 绑定监听事件
      this.$store.state.navMusicDom.addEventListener('play', this.playSong)
      this.$store.state.navMusicDom.addEventListener('pause', this.pauseSong)
      this.$store.state.navMusicDom.addEventListener('ended', this.ended)
    })
  },
  destroyed () {
    clearInterval(this.timeS) // 暂停时间
    this.$store.state.navMusicDom.removeEventListener('play', this.playSong)
    this.$store.state.navMusicDom.removeEventListener('pause', this.pauseSong)
    this.$store.state.navMusicDom.removeEventListener('ended', this.ended)
  },
  // 组件复用的解决方案
  // 针对同一个组件被复用使用的钩子函数
  // 解决方案： 1、beforeRouteUpdate,这种方法有问题，路由更新的时候获取的上一次路由的数据
  // beforeRouteUpdate (to, from, next) {
  //   if (to.params.sid != from.params.sid) {
  //     next()
  //     this.getSong()
  //   }
  // }
  // 2.使用watch方法
  watch: {
    '$route': function(to, from) {
      if (to.params.sid != from.params.sid) {
        this.getSong()
      }
    } 
  }
}
</script>

<style lang="less" scoped>
.songbox {
  height: 95%;
  position: relative;
  z-index: 52;
  overflow-x: hidden;
  .PlaySong {
    color: #fff;
    position: relative;
    z-index: 50;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.9);
    .logo {
      width: 100%;
      height: 70%;
      /* background-color: red; */
      .guanp {
        width: 320px;
        height: 320px;
        margin: 0 auto;
        position: relative;
        top: 13%;
        .img {
          width: 320px;
          height: 320px;
        }
        .songImg {
          width: 155px;
          height: 155px;
          position: absolute;
          top: 76px;
          left: 84px;
          border-radius: 50%;
          overflow: hidden;
          img {
            width: 102%;
            height: 102%;
            background-color: red;
          }
        }
      }
    }
    .lyric {
      height: 70%;
    }
    .PlaySongNav {
      width: 100%;
      height: 30px;
      display: flex;
      .navitem {
        text-align: center;
        flex: 1;
        .iconfont {
          font-size: 0.346667rem;
          color: #fff;
        }
      }
    }
    .playbox {
      display: flex;
      margin-top: 6px;
      background-color: rgba(0, 0, 0, 0.8);
      .start {
        font-size: 10px;
        line-height: 40px;
        text-align: center;
        flex: 1;  
      }
      .PlaySongTime {
        height: 40px;
        flex: 6;
        .box {
          position: relative;
          top: 18px;
          float: left;
          .custom-button {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            color: #fff;
            background-color: #ee0a24;
          }
        }
      }
      .end {
        font-size: 10px;
        line-height: 40px;
        text-align: center;
        flex: 1;
      }
    }
  } 
}
.v-enter {
  opacity: 0;
  /* 进来的时候从右 */
  transform: translateX(100%);
}
.v-leave-to {
  opacity: 0;
  /* 离开的时候向左 */
  transform: translateX(-100%);
  position: absolute;
}
</style>
