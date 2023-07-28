import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    commentId: 0, // 动态的threadId
    toggleInformation: 0, // 记录是否进入用户信息界面
    commentType: 0, // 评论种类：0-歌单，1-歌曲
    // 歌曲信息
    sheet: {
      sheetId: 0, // 歌单id
      userId: 0, // 创造者id
      nickname: '', // 创造用户名
      songListId: [], // 歌单歌曲列表
      trackCount: 1 // 歌曲数量
    },
    playSong: {
      currentIndex: 0, // 索引
      playNow: false, // 默认不播放音乐
      songId: 0, // 歌曲id
      linearIndex: 0, // 进度条位置
      isPlayEnd: false, // 判断是否播放结束
      songName: '', // 当前歌曲名称
      singers: '', // 目前歌曲演奏者
      picUrl: '', // 当前歌曲封面
      musicUrl: '', // 当前歌曲的url
      songTime: 0 // 当前歌曲的总秒数
    },
    navMusicDom: null, // 播放器
    isShowNav: true, // 是否要显示底部播放导航栏
    mode: 'xunhuan', // 默认循环播放
    // 登录状态
    isLogin: false, // 是否已登录
    playList: [], // 个人歌单
    profile: {} // 个人信息
  },
  getters: {
  },
  mutations: {
    // 切换上/下一首
    setSongIndex (state, num) {
      state.playSong.currentIndex += num
      if (state.playSong.currentIndex === state.sheet.trackCount) {
        state.playSong.currentIndex = 0
      } else if (state.playSong.currentIndex < 0) {
        state.playSong.currentIndex = state.sheet.trackCount - 1
      }
    },
    // 确认该id在歌单中的索引
    searchIndex (state, id) {
      state.playSong.currentIndex = state.sheet.songListId.indexOf(id)
    },
    // 打乱播放列表
    shuffle (state) {
      // console.log('之前的播放列表：', state.sheet.songListId)
      if (state.sheet.songListId.length > 0) {
        for (let i = 0; i < state.sheet.songListId.length; i++) {
          const j = Math.round(Math.random() * (state.sheet.songListId.length - 1 - i)) + i
          const temp = state.sheet.songListId[i]
          state.sheet.songListId[i] = state.sheet.songListId[j]
          state.sheet.songListId[j] = temp
        }
        // console.log('打乱后的播放列表：', state.sheet.songListId)
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
