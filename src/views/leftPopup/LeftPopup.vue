<template>
  <div class='LeftPopup'>
    <van-popup
     ref='popup'
     class='popupBox'
     v-model='show'
     position='left'
     :style="{ width: '85%', height: '100%' }">
      <!-- 头部信息 -->
      <div class='topbox'>
        <!-- 已登录的用户信息 -->
        <div class='user' v-if='$store.state.profile.userId' @click="information">
          <div class='userImg'>
            <img :src='$store.state.profile.avatarUrl' alt='' />
          </div>
          <div class='userDetail'>
            <div class='text'>{{ $store.state.profile.nickname }}</div>
          </div>
          <i class='iconfont icon-gengduo'></i>
        </div>
        <!-- 未登录 -->
        <div class='login' v-else @click="toLogin">
          <i class='iconfont icon-yonghu'></i>
          <span class='text'>未登录</span>
          <i class='iconfont icon-gengduo'></i>
        </div>
      </div>
      <!-- 内容 -->
      <div class='content'>
        <div class='box1'>
          <div class='boxContent'>
            <div class='left'>
              <div class='icon'>
                <i class='iconfont topIcon icon-yunbei'></i>
              </div>
              <div class='text'>
                <div class='textTitle'>云贝中心</div>
                <div class='tag'>签到</div>
              </div>
            </div>
            <div class='right'>
              <div class='icon'>
                <i class='iconfont topIcon icon-xiaoxi'></i>
              </div>
              <div class='text'>
                <div class='textTitle'>消息中心</div>
                <div class='desc'>{{ message }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class='box2'>
          <div class='box2Content'>
            <div class='icon'>
              <i class='iconfont icon-chuanzuo'></i>
            </div>
            <div style='margin-left: 0.213049rem' class='textTitle'>创作者中心</div>
          </div>
        </div>
        <popup-item title='音乐服务' :itemList='itemList1'></popup-item>
        <popup-item title='其他' :itemList='itemList2'></popup-item>
        <popup-item :showTitle='false' :itemList='itemList3'></popup-item>
        <div class="logout" @click="logout" v-if='$store.state.profile.userId'>退出登录</div>
        <div class="logout" @click="show=false" v-else>关闭</div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import PopupItem from './comps/PopupItem.vue'
import '@/assets/icon/LeftPopup.css' // 左侧抽屉字体图标

export default {
  name: 'LeftPopup',
  components: {
    PopupItem
  },
  data () {
    return {
      show: false,
      message: '点击查看新消息',
      itemList1: [
        { icon: 'icon-tingge', text: '听歌识曲' },
        { icon: 'icon-piao', text: '云村有票' },
        { icon: 'icon-shangcheng', text: '商城' },
        { icon: 'icon-youxi', text: '游戏专区' },
        { icon: 'icon-lingsheng', text: '口袋彩铃' }
      ],
      itemList2: [
        { icon: 'icon-zhuanban', text: '个性装扮' },
        { icon: 'icon-dingshi', text: '定时关闭' },
        { icon: 'icon-saoyisao', text: '扫一扫' },
        { icon: 'icon-leftxiazai', text: '边听边存' },
        { icon: 'icon-liuliang', text: '在线听歌免流量' },
        { icon: 'icon-heimingdan', text: '音乐黑名单' },
        { icon: 'icon-dunpai1', text: '青少年模式' },
        { icon: 'icon-naozhong', text: '音乐闹钟' }
      ],
      itemList3: [
        { icon: 'icon-dingdan', text: '我的订单' },
        { icon: 'icon-youhuiquan', text: '优惠券' },
        { icon: 'icon-bangzhu', text: '帮助与反馈' },
        { icon: 'icon-guanyu', text: '关于' }
      ]
    }
  },
  methods: {
    // 跳转登录页面
    toLogin () {
      this.show = false
      this.$router.push('/login')
    },
    // 跳转个人页面
    information () {
      this.show = false
      this.$router.push('/Information/' + localStorage.getItem('userId'))
    },
    // 登出
    logout () {
      if (window.localStorage.getItem('profile')) {
        // 清空本地缓存
        window.localStorage.removeItem('profile')
        // 清空项目保存的state
        this.$store.state.profile = {}
        this.$store.state.playList = []
        this.$store.state.isLogin = false
      }
    }
  },
  mounted () {
    this.$EventBus.$on('openPopup', () => {
      this.show = true
    })
  }
}
</script>

<style lang='less' scoped>
.popupBox {
  background-color: rgb(235, 235, 235);
  .topbox {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    padding: 0.479361rem 0.399467rem;
    .login {
      width: 100%;
      height: 1.2rem;
      display: flex;
      align-items: center;
      position: relative;
      .text {
        font-size: .4rem;
        margin-left: 10px;
        line-height: 1.2rem;
        color: var(--fontColor);
      }
      .icon-gengduo {
        position: absolute;
        right: .133333rem;
        font-size: .4rem;
        color: var(--fontColor);
      }
      .icon-yonghu{
        margin-left: .133333rem;
        position: relative;
        top: .026667rem;
        color: var(--red);
        font-size: 1.2rem;
      }
    }
    .user {
      width: 100%;
      height: 1.2rem;
      position: relative;
      display: flex;
      align-items: center;
      .userImg {
        width: 1.2rem;
        height: 1.2rem;
        border-radius: 50%;
        float: left;
        margin-left: .266667rem;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          float: left;
        }
      }
      .userDetail{
        margin-left: .266667rem;
        margin-right: .266667rem;
        .text {
          font-size: .373333rem;
          margin-bottom: .106667rem;
        }
      }
    }
  }
  .content {
    width: 100%;
    padding: 0.479361rem 0.399467rem;
    position: absolute;
    top: 1.15rem;
    left: 0;
    right: 0;
    .box1 {
      margin-top: 0.266312rem;
      width: 100%;
      height: 1.997337rem;
      background-color: #fff;
      border-radius: 0.266312rem;
      display: flex;
      align-items: center;
      .boxContent {
        width: 90%;
        height: 80%;
        margin: 0 auto;
        display: flex;
        .left {
          box-sizing: border-box;
          border-right: 1px solid #e6e6e6;
          flex: 1;
          display: flex;
          align-items: center;
        }
        .right {
          flex: 1;
          display: flex;
          align-items: center;
          margin-left: 0.213049rem;
        }
        .text {
          margin-left: 0.213049rem;
          .textTitle {
            font-weight: 400;
            font-size: .373333rem;
            height: .533333rem;
            display: flex;
            align-items: center;
          }
          .desc {
            font-size: 0.319574rem;
            color: #c5c5c5;
            height: .4rem;
            display: flex;
            align-items: center;
          }
          .tag {
            height: 0.479361rem;
            line-height: 0.426099rem;
            margin-top: 0.053262rem;
            padding: 0 0.213049rem;
            float: left;
            color: red;
            border: 1px solid red;
            border-radius: 0.532623rem;
            font-size: .266667rem;
            transform: scale(0.9);
          }
        }
      }
    }
    .box2 {
      width: 100%;
      height: 1.59787rem;
      border-radius: 0.266312rem;
      display: flex;
      margin-top: 0.399467rem;
      align-items: center;
      background-color: #fff;
      .box2Content {
        width: 90%;
        height: 80%;
        margin: 0 auto;
        display: flex;
        align-items: center;
      }
    }
    .logout {
      position: relative;
      width: 100%;
      background-color: #fff;
      margin-top: 0.399467rem;
      border-radius: 0.266312rem;
      color: #FF4B41;
      font-size: 0.446205rem;
      height: 1.065246rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
    }
    .icon {
      width: 0.798935rem;
      height: 0.798935rem;
      background-color: #c5c5c5;
      display: flex;
      align-items: center;
      justify-content: center;
      .iconfont{
        color: #fff;
        font-size: .426667rem;
        &.topIcon{
          font-size: .346667rem;
        }
      }
    }
  }
}
</style>
