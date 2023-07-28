<template>
  <div class="sheetItem">
    <div class="left">
      <!-- 没有封面 -->
      <div
       v-if="showDiv"
       :style="{ backgroundColor: showDivColor }"
       class="noSheet">
       <i class="iconfont" :style="{ color: iconColor }" :class="showImg"></i>
      </div>
      <img v-else class="sheetImg" :src="sheetImg" alt="" />
    </div>
    <div class="center">
      <div class="centerbox">
        <div class="title">{{ title }}</div>
        <div class="count">{{ songCount }}{{ playCount }}</div>
      </div>
    </div>
    <div class="right" v-if="isRight"></div>
  </div>
</template>

<script>
import '@/assets/icon/Information.css'
export default {
  name: 'sheetItem',
  props: {
    // 没有封面的时候展示图标
    showDiv: {
      type: Boolean,
      default: false
    },
    // 图标的背景颜色
    showDivColor: {
      type: String,
      default: 'red'
    },
    // 图标颜色
    iconColor: {
      type: String,
      default: 'white'
    },
    // 图标样式
    showImg: {
      type: String,
      default: ''
    },
    // 封面是图片
    sheetImg: {
      type: String,
      default: ''
    },
    // 标题
    title: {
      type: String,
      default: ''
    },
    // 歌曲数量
    songCount: {
      type: String,
      default: ''
    },
    // 播放量
    playCount: {
      type: String,
      default: ''
    },
    // 是否展示右侧内容
    isRight: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="less" scoped>
.sheetItem {
  width: 100%;
  height: 1.198402rem;
  display: flex;
  margin-bottom: 0.213049rem;
  .left {
    flex: 1.3;
    .sheetImg {
      height: 1.198402rem;
      width: 1.198402rem;
      border-radius: 8px;
    }
    .noSheet {
      border-radius: .213333rem;
      height: 1.198402rem;
      width: 1.198402rem;
      display: flex;
      align-items: center;
      justify-content: center;
      .iconfont{
        font-size: .533333rem;
      }
    }
  }
  .center {
    flex: 7;
    display: flex;
    align-items: center;
    .title {
      font-size: 0.372836rem;
      width: 7.190413rem;
      margin-bottom: .08rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .count {
      font-size: 0.319574rem;
      color: #919191;
      width: 7.190413rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .right {
    flex: 1.5;
  }
}
.img {
  width: 0.665779rem;
  margin-top: 0.319574rem;
}
</style>
