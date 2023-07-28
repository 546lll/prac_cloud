<template>
  <!-- 歌曲播放导航栏 -->
  <div class="SongTopnav">
    <!-- 返回键 -->
    <div class="left" @click="back">
      <i class="iconfont icon-fanhui"></i>
    </div>
    <!-- 歌曲名和歌手展示 -->
    <div class="center">
      <span class="name">{{ navTitle }}</span>
      <span class="author">{{ authors }}</span>
    </div>
    <!-- 分享键 -->
    <div class="right" @click="fenxiang">
      <i v-if="rightImg" class="iconfont icon-fenxiang"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SongTopnav',
  props: {
    navTitle: {
      type: String,
      default: '未名'
    },
    authors: {
      type: String,
      default: '佚名'
    },
    // 是否展示分享键
    rightImg: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    // 返回
    back () {
      this.$emit('back')
    },
    // 分享
    fenxiang () {
      this.$emit('fx')
    }
  }
}
</script>

<style lang="less" scoped>
.SongTopnav {
  width: 100%;
  height: 64px;
  display: flex;
  box-shadow: 0 -2px 5px rgba(163, 146, 146, 0.6) !important;
  border-bottom: 1.5px solid rgba(0, 0, 0, 0.1);
  .left {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    .icon-fanhui {
      font-size: 0.6rem;
    }
  }
  .center {
    flex: 7;
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;
    .name {
      text-align: center;
      width: 5.866667rem;
      font-size: 0.48rem;
      font-family: "Microsoft Yahei", Arial, Helvetica, sans-serif;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-bottom: .16rem;
      margin-top: 0.23rem;
    }
    .author {
      text-align: center;
      width: 5.866667rem;
      color: #868686;
      font-size: .36rem;
      font-family: Arial, Helvetica, sans-serif;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;  //忽略文本中所有的空白、换行符,不会自动换行，只有遇到<br>才会换行
    }
  }
  .right {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    .icon-fenxiang {
      font-size: 0.6rem;
    }
  }
}
</style>
