<template>
  <div class="Follow">
    <menu-nav class="navbar" :navTitle="navTitle"></menu-nav>
    <div class="content" v-if="followList.length">
      <div
        class="item"
        @click="information(item.userId)"
        v-for="(item, index) in followList"
        :key="index"
      >
        <div class="left">
          <img :src="item.avatarUrl" alt="" />
        </div>
        <div class="center">
          <span class="name">{{ item.nickname }}</span>
          <img
            v-if="item.vipType !== 0"
            class="imgvip"
            src="@/assets/img/common/vip1.svg"
            alt=""
          />
          <!-- 自己的关注列表 -->
          <div
            class="btn"
            v-if="id == $store.state.profile.userId"
            @click.stop="isFollow(item.userId, index)"
            :class="{ isFollows: item.followBtn }">
            <i class="iconfont" :class="[item.followBtn ? 'icon-yiguanzhu' : 'icon-weiguanzhu']"></i>
            {{ item.btntext }}
          </div>
        </div>
        <!-- 其他操作 -->
        <div class="right">
          <i class="iconfont icon-sandian"></i>
        </div>
      </div>
    </div>
    <div v-else class="noFollow">{{ no_text }}</div>
  </div>
</template>

<script>
import MenuNav from '@/components/context/menuNav/MenuNav.vue'
import { getUserFollow } from '@/api/user.js' // 获取关注列表

export default {
  name: 'Follow',
  props: ['id'],
  components: {
    MenuNav
  },
  data () {
    return {
      followList: [], // 关注列表
      navTitle: '关注',
      no_text: '该用户还没有关注其他人哦~'
    }
  },
  methods: {
    async getList () {
      const { data: res } = await getUserFollow(this.id)
      if (res.code == 200) {
        this.followList = res.follow.map(item => {
          return {
            nickname: item.nickname,
            avatarUrl: item.avatarUrl,
            userId: item.userId,
            signature: item.signature,
            vipType: item.vipType,
            followBtn: false,
            btntext: '已关注'
          }
        })
      } else {
        this.no_text = '暂无法查看该用户的关注列表~'
      }
      // console.log(this.followList)
    },
    // 关注/取消关注，下面这个函数还未验证过，
    isFollow (index) {
      // followBtn 为 false 表示已关注
      // true 为 未关注
      if (this.followList[index].followBtn) {
        this.followList[index].btntext = '已关注'
        this.followList[index].followBtn = false
      } else {
        this.followList[index].btntext = '关注'
        this.followList[index].followBtn = true
      }
    },
    information (id) {
      this.$router.push('/Information/' + id)
    }
  },
  created () {
    this.getList()
  }
}
</script>

<style lang="less" scoped>

.Follow {
  /* height: 100vh; */
  height: 100vh;
  width: 100%;
  background-color: #fff;
  overflow: hidden;
  .navbar {
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
        .name {
          font-size: .4rem;
        }
        .imgvip {
          width: 60px;
          height: 26px;
          margin-left: -14px;
          position: relative;
          top: 7px;
        }
        .isFollows {
          background-color: #da231b !important;
          color: #fff !important;
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
  }
  .noFollow {
    width: 100%;
    height: 100vh;
    text-align: center;
    font-size: 0.45273rem;
    color: rgb(133, 133, 133);
    line-height: 85vh;
  }
}
</style>
