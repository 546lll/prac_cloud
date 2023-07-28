<template>
  <!-- 导航页：歌单广场 -->
  <div class="RadioStationNav">
    <!-- 返回按钮 -->
    <div class="left" @click="back">
      <!-- 不同的主题 -->
      <i v-if="showBlackImg" style="color: #000; font-size: .373333rem" class="iconfont icon-fanhui"></i>
      <i v-else style="color: #fff; font-size: .373333rem" class="iconfont icon-fanhui"></i>
    </div>
    <!-- 中间标题 -->
    <div class="center">{{ navTitle }}</div>
    <!-- 分享 -->
    <div class="right" @click="toSub">
      <i v-if="rightImg" class="iconfont icon-fenxiang"></i>
    </div>

  </div>
</template>

<script>
export default {
  name: 'MenuNav',
  props: {
    showBlackImg: {
      type: Boolean,
      default: true
    },
    rightImg: {
      type: Boolean,
      default: false
    },
    navTitle: {
      type: String,
      default: ''
    },
    // 返回路径
    backPath: {
      type: String,
      default: '-1'
    }
  },
  methods: {
    back () {
      if (this.backPath === '-1') {
        this.$router.go(-1)
      } else {
        this.$router.push(this.backPath)
      }
    },
    // 分享栏，先空着
    toSub () {
      if (this.rightImg) {
        this.$emit('openSub')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.RadioStationNav {
  width: 100%;
  height: 44px;
  /* font-size: .426667rem; */
  display: flex;
  /* border-bottom: 1.5px solid rgba(0, 0, 0, 0.1); */
  position: relative;
  z-index: 21;
  background-color: #fff;
  .left {
    flex: 1;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    .iconfont{
      font-size: .373333rem;
    }
  }
  .center {
    width: 7.456724rem;
    flex: 7;
    line-height: 44px;
    font-size: 18px;
    text-indent: 15px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .right {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    .icon-fenxiang {
      font-size: .373333rem;
    }
  }
}
</style>
