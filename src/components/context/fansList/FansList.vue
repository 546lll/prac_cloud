<template>
  <div class="FansList">
    <menu-nav class="nav" :navTitle="navTitle"></menu-nav>
    <div class="content" v-if="FansArr.length">
      <div
        class="item"
        @click="information(item.userId)"
        v-for="(item, index) in FansArr"
        :key="index"
      >
        <div class="left">
          <img :src="item.avatarUrl" alt="" />
        </div>
        <div class="center">
          <span>{{ item.nickname }}</span>
          <img
            v-if="item.vipType !== 0"
            class="imgvip"
            src="@/assets/img/common/vip1.svg"
            alt=""
          />
        </div>
        <div class="right">
          <i class="iconfont icon-sandian"></i>
        </div>
      </div>
      <div class="tip" v-if="FansArr.length >= 100">下载APP查看更多</div>
    </div>
    <div v-else class="noFollowed">{{ no_text }}</div>
  </div>
</template>

<script>
import MenuNav from '@/components/context/menuNav/MenuNav.vue'
import { getUserFans } from '@/api/user.js'

export default {
  name: 'FansList',
  components: {
    MenuNav
  },
  props: ['id'],
  data () {
    return {
      navTitle: '粉丝',
      lasttime: -1,
      FansArr: [], // 粉丝列表
      no_text: '该用户暂无粉丝喔'
    }
  },
  methods: {
    async getFans () {
      const { data: res } = await getUserFans(this.id, 100, this.lasttime)
      if (res.code == 200) {
        this.FansArr = res.followeds.map(item => {
          return {
            nickname: item.nickname, // 昵称
            userId: item.userId, // 用户id
            avatarUrl: item.avatarUrl, // 用户头像
            vipType: item.vipType // 用户vip
          }
        })
      } else {
        this.no_text = '暂无法查看该用户的粉丝列表'
      }
      // console.log(this.FansArr)
    },
    information (id) {
      this.$router.push('/Information/' + id)
    }
  },
  created () {
    this.getFans()
  }
}
</script>

<style lang="less" scoped>
.FansList {
  width: 100%;
  height: 100vh;
  background-color: #fff;
  overflow: hidden;
  .nav {
    position: fixed;
    top: 0;
    z-index: 20;
    background-color: #fff;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
  }
  .content {
    position: absolute;
    width: 100%;
    top: 44px;
    bottom: 45px;
    background-color: #fff;
    padding: .213333rem .32rem;
    overflow-y: auto;
    .item {
      display: flex;
      width: 100%;
      padding: .266667rem 0 .266667rem;
      border-bottom: 1px solid #f0f0f0;
      .left {
        flex: 1.5;
        img {
          width: 1.331558rem;
          height: 1.331558rem;
          border-radius: 50%;
        }
      }
      .center {
        width: 6.284953rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        flex: 6.5;
        line-height: 1.331558rem;
        font-size: 0.426099rem;
        text-indent: 0.266312rem;
        .imgvip {
          width: 60px;
          height: 26px;
          margin-left: -14px;
          position: relative;
          top: 7px;
        }
      }
      .right {
        flex: 1.5;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        .iconfont {
          font-size: .48rem;
          position: absolute;
          right: 0;
        }
      }
    }
    .tip {
      width: 100%;
      height: 1.065246rem;
      line-height: 1.065246rem;
      text-align: center;
      font-size: 0.45273rem;
      color: #929292;
    }
  }
  .noFollowed {
    width: 100%;
    height: 100vh;
    text-align: center;
    font-size: 0.45273rem;
    color: rgb(133, 133, 133);
    line-height: 85vh;
  }
}
</style>
