<template>
  <div class="Login">
    <!-- 退出键 -->
    <div class="close" @click="close">
      <i class="iconfont icon-close"></i>
    </div>
    <!-- logo -->
    <div class="logo">
      <img src="@/assets/logo.png" alt="" ref="qr"/>
    </div>
    <!-- 登录操作 -->
    <div class="loginType" v-if="!doLogin">
      <!-- 二维码登录 -->
      <div @click="doLogin=true" class="qrLogin">
        <span>二维码登录</span>
      </div>
      <!-- 退出登录界面 -->
      <div class="tiyan" @click="close">
        <span>立即体验</span>
      </div>
      <p>提示：现在接口仅支持二维码登录</p>
      <!-- 其他登录方式
      <div class="list">
        <div class="item">
          <div class="box" @click="notice">
            <i class="iconfont icon-weixin"></i>
          </div>
        </div>
        <div class="item">
          <div class="box" @click="notice">
            <i class="iconfont icon-QQ"></i>
          </div>
        </div>
        <div class="item">
          <div class="box" @click="notice">
            <i class="iconfont icon-weibo"></i>
          </div>
        </div>
        <div class="item">
          <div class="box" @click="notice">
            <i class="iconfont icon-youxiang"></i>
          </div>
        </div>
      </div> -->
    </div>
    <div v-else class="qr-container">
      <div class="qr">
        <img :src="qrCodeImg" alt="" />
      </div>
      <p>提示：请使用网易云音乐APP扫码登录！</p>
    </div>
  </div>
</template>

<script>
import { getQrCodeKey, getQrCode, checkQrCode, getLoginStatus } from '@/api/login.js'
import { getTimeStamp } from '@/utils/common/common.js'
import { getUserDetail, getUserPlayList } from '@/api/user.js' // 用户信息

export default {
  name: 'Login',
  data () {
    return {
      doLogin: false, // 是否要进行二维码登录
      qrCodeImg: '', // 生成的二维码图片
      key: '', // 生成的key
      timer: null // 轮询的定时器
    }
  },
  methods: {
    // 退出登录页
    close () {
      this.clearChecker() // 停止定时器
      this.$router.push('/')
    },
    // 初始化二维码并检查二维码状态
    async init () {
      await this.getQrCodeKey()
      await this.getQrCode()
      await this.checkQrCode()
    },
    // 生成key
    async getQrCodeKey () {
      const { data: res } = await getQrCodeKey()
      this.key = res.data.unikey
    },
    // 根据生成的key生成二维码
    async getQrCode () {
      const { data: res } = await getQrCode(this.key, getTimeStamp(), true)
      this.qrCodeImg = res.data.qrimg
    },
    // 轮询查询二维码（每隔5秒）
    async checkQrCode () {
      // 设置定时器
      this.timer = setInterval(async () => {
        // 如果已处于登录状态或者定时器已清空，不往下执行
        // console.log(this.timer)
        if (!this.timer || this.$store.state.isLogin) return

        const { data: statusRes } = await checkQrCode(this.key, getTimeStamp())
        // 如果二维码过期， 停止计时，重新获取二维码
        // console.log(statusRes)
        if (statusRes.code === 800) {
          alert('二维码已过期,请重新获取')
          this.clearChecker()
          await this.init()
        }
        // 授权成功
        if (statusRes.code == 803) {
          this.clearChecker()
          this.getAccountInfo(statusRes)
        }
      }, 5000)
    },
    // 获取账户信息
    async getAccountInfo (statusRes) {
      const { data: loginRes } = await getLoginStatus(statusRes.cookie) // 获取账户下信息
      const { userId, nickname, avatarUrl, backgroundUrl } = loginRes.data.profile // 解构对象
      this.$store.state.profile = { userId, nickname, avatarUrl, backgroundUrl } // 赋给新对象
      window.localStorage.setItem('profile', JSON.stringify(this.$store.state.profile)) // 将个人信息保存下来
      // const res = await getAccountInfo() // 这个接口获取不到profile
      // 如果登录成功
      if (loginRes.data.code == 200) {
        this.$store.state.isLogin = true
        this.$store.state.profile = loginRes.data.profile // 保存用户信息
        // 获取用户基本信息
        const { data: detail } = await getUserDetail(this.$store.state.profile.userId)
        this.$store.state.profile.level = detail.level
        this.$store.state.profile.listenSongs = detail.listenSongs
        // 获取用户歌单
        const { data: list } = await getUserPlayList(this.$store.state.profile.userId)
        this.$store.state.playList = list.playlist.map(item => {
          return {
            coverImgUrl: item.coverImgUrl,
            name: item.name,
            id: item.id,
            playCount: item.playCount,
            trackCount: item.trackCount,
            creator: item.creator.nickname
          }
        })
        this.$store.state.profile = JSON.parse(JSON.stringify(this.$store.state.profile))
        alert('授权登录成功！')
        this.$router.go(-1)
      }
    },
    // 清除定时器
    clearChecker () {
      clearInterval(this.timer)
      this.timer = null
    }
    // notice () {
    //   this.$toast.show('项目开发中...', 1900)
    // }
  },
  watch: {
    doLogin (newval, oldval) {
      if (newval) {
        // 获取二维码
        this.init()
      } else {
        this.clearChecker() // 防止有定时器
      }
    }
  }
}
</script>

<style lang="less" scoped>
.Login {
  background-color: #bd3126;
  position: absolute;
  overflow: hidden;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 51;
  .close {
    margin-top: 0.399467rem;
    .icon-close {
      font-size: 0.533333rem;
      color: #fff;
      margin-left: 0.399467rem;
    }
  }
  .logo {
    width: 1.704394rem;
    height: 1.704394rem;
    position: absolute;
    left: 50%;
    top: 30%;
    transform: translate(-50%, -50%);
    img {
      height: 100%;
      filter: grayscale(100%) brightness(400%); // 让图标变白
    }
  }
  .loginType{
    position: absolute;
    top: 75%;
    left: 50%;
    transform: translate(-50%, -50%);
    .qrLogin {
      width: 6.994407rem;
      height: 1.065246rem;
      background-color: #fff;
      margin: 0 auto 0.532623rem;
      border-radius: 1.065246rem;
      text-align: center;
      line-height: 1.065246rem;
      font-size: 0.4rem;
      color: #da231b;
    }
    .tiyan {
      width: 100%;
      height: 1.066667rem;
      margin: 0.532623rem auto;
      border-radius: 1.066667rem;
      text-align: center;
      line-height: 1.066667rem;
      font-size: 0.373333rem;
      color: #fff;
      box-sizing: border-box;
      border: 1px solid rgb(221, 221, 221, 0.8);
    }
    p {
      margin: 0.532623rem auto;
      text-align: center;
      color: white;
      white-space: nowrap;
    }
    // .list {
    //   width: 100%;
    //   height: 1.331558rem;
    //   margin: 0 auto;
    //   display: flex;
    //   .item {
    //     flex: 1;
    //     text-align: center;
    //     display: flex;
    //     align-items: center;
    //     .box {
    //       width: 1.065246rem;
    //       height: 1.065246rem;
    //       border-radius: 50%;
    //       border: 1px solid rgba(255, 255, 255, 0.644);
    //       margin: auto;
    //       display: flex;
    //       align-items: center;
    //       justify-content: center;
    //       .iconfont {
    //         color: rgba(255, 255, 255, 0.856);
    //         font-size: .426667rem;
    //       }
    //     }
    //   }
    // }
  }
  .qr-container {
    text-align: center;
    position: absolute;
    top: 65%;
    left: 50%;
    transform: translate(-50%, -50%);
    .qr {
      height: 3.6rem;
      img {
        height: 100%;
      }
    }
    p {
      margin: 0.532623rem auto;
      color: white;
      white-space: nowrap;
    }
  }
}
</style>
