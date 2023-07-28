<template>
  <div class="MyMessageList">
    <!-- 创建的歌单 -->
    <div class="box" ref="mySheet">
      <div class="top">
        <div class="left">
          创建歌单({{ sheetList.length }})个
        </div>
        <!-- 添加歌单 -->
        <div class="center">
          <i class="iconfont icon-add"></i>
        </div>
        <!-- 其他操作 -->
        <div class="right">
          <i class="iconfont icon-sandian"></i>
        </div>
      </div>
      <!-- 歌单列表 -->
      <song-sheet v-if="sheetList.length" :songList="sheetList"></song-sheet>
    </div>
    <!-- 收藏的歌单 -->
    <div class="box2" ref="collection">
      <div class="top">
        <div class="left">收藏歌单({{ sheetCollection.length }})个</div>
        <div class="center">
          <i class="iconfont icon-add"></i>
        </div>
        <div class="right">
          <i class="iconfont icon-sandian"></i>
        </div>
      </div>
      <!-- 歌单列表 -->
      <song-sheet v-if="sheetCollection.length" :songList="sheetCollection"></song-sheet>
      <div class="nosheet" v-else>暂时还没有收藏歌单</div>
    </div>
  </div>
</template>

<script>
import SongSheet from '@/components/context/songSheet/SongSheet.vue'

export default {
  name: 'MyMessageList',
  components: {
    SongSheet
  },
  computed: {
    // 计算创建的歌单数量
    sheetList () {
      if (this.$store.state.playList) {
        return this.$store.state.playList.filter(
          (item) => item.creator === this.$store.state.profile.nickname
        ).slice(1, this.$store.state.playList.length)
      } else {
        return []
      }
    },
    // 收藏的歌单
    sheetCollection () {
      if (this.$store.state.playList) {
        return this.$store.state.playList.filter(
          (item) => item.creator !== this.$store.state.profile.nickname
        )
      } else {
        return []
      }
    }
  }
}
</script>

<style lang="less" scoped>
.MyMessageList {
  width: 100%;
  margin-top: 5px;
  .box {
    padding: .32rem .346667rem;
    border-radius: .213333rem;
    background-color: #fff;
    box-shadow: var(--boxshaow);
  }
  .box2 {
    padding: .32rem .346667rem;
    border-radius: .213333rem;
    background-color: #fff;
    margin-top: .4rem;
    box-shadow: var(--boxshaow);
    .nosheet{
      width: 100%;
      height: 1.065246rem;
      line-height: 1.065246rem;
      color: #9b9b9b;
      text-align: center;
      font-size: .346205rem;
    }
  }
  .top {
    width: 100%;
    display: flex;
    height: 25px;
    font-size: 13px;
    line-height: 25px;
    color: #9b9b9b;
    .left {
      flex: 4;
      font-size: .32rem;
    }
    .center {
      flex: 5;
      .icon-add {
        float: right;
        font-size: .426667rem;
      }
    }
    .right {
      flex: 1;
      display: flex;
      align-items: center;
      position: relative;
      .icon-sandian{
        position: absolute;
        right: 0;
        font-size: .426667rem;
      }
    }
  }
}
</style>
