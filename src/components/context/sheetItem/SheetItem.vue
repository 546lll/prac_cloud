<template>
  <!-- 发现页面歌单/电台组件 -->
  <div class="SheetItem">
    <!-- 歌单封面 -->
    <div class="topImg">
      <img class="fmian" :src="sheetItem.picUrl" alt="">
      <!-- 播放数 -->
      <div class="count" v-if="showCount">▷ {{ sheetItem.playCount }}</div>
      <!-- 是否展示播放按钮 -->
      <div class="toPlay" v-if="showImg">
        <!-- 是否要播放歌单（未实现） -->
        <div class="pImg" @click="isPlaying=!isPlaying">
          <i class="iconfont icon-shouyebofang"  v-if="!isPlaying"></i>
          <svg t="1686106037377" class="icon" v-else viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4048" width="200" height="200"><path d="M499.354012 1023.998a76.287926 76.287926 0 0 1-76.083925-76.082926V76.082926A76.287926 76.287926 0 0 1 499.354012 0a76.287926 76.287926 0 0 1 76.133926 76.082926v871.934148A76.287926 76.287926 0 0 1 499.354012 1023.999z m346.519662 0a76.287926 76.287926 0 0 1-76.081926-76.082926v-340.889667a76.287926 76.287926 0 0 1 76.082926-76.082925 76.287926 76.287926 0 0 1 76.082926 76.083925v340.990667A76.287926 76.287926 0 0 1 845.874674 1023.999z m-692.989323 0A76.287926 76.287926 0 0 1 76.800425 947.915074V415.333594a76.287926 76.287926 0 0 1 76.083926-76.082925 76.287926 76.287926 0 0 1 76.082925 76.082925v532.68348A76.339925 76.339925 0 0 1 152.884351 1023.999z" fill="#d81e05" p-id="4049" class="custom-cursor-on-hover"></path></svg>
        </div>
      </div>
    </div>
    <!-- 歌单内容 -->
    <!-- isSheet=true歌单组件 -->
    <div class="sheetName" v-if="isSheet">
      {{ sheetItem.rcmdtext }}
    </div>
    <!-- 歌单描述 -->
    <div class="programbox" v-else>
        <p>{{ sheetItem.desc }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SheetItem',
  props: {
    // 歌单
    sheetItem: {
      type: Object,
      default: () => {} // 对象或数组默认值必须以函数形式表示
    },
    // 是否展示播放数量
    showCount: {
      type: Boolean,
      default: true
    },
    // 是否展示播放按键
    showImg: {
      type: Boolean,
      default: true
    },
    // 是否展示歌单详情
    isSheet: {
      type: Boolean,
      default: true
    },
    isSheetPlaying: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isPlaying: this.isSheetPlaying
    }
  }
}
</script>

<style lang="less" scoped>
.SheetItem {
  width: 2.663116rem;
  .topImg {
    width: 100%;
    height: 2.663116rem;
    border-radius: 7px;
    overflow: hidden;
    position: relative;
    .fmian {
      width: 100%;
      height: 100%;
    }
    .count {
      position: absolute;
      height: 0.532623rem;
      line-height: 0.532623rem;
      right: 0.133156rem;
      top: 0;
      color: #fff;
      font-size: 0.319574rem;
    }
    .toPlay{
      position: absolute;
      right: .133156rem;
      bottom: .133156rem;
      width: .665779rem;
      height: .665779rem;
      background-color: rgba(255, 255, 255, 0.664);
      border-radius: 50%;
      display: flex;
      align-items: center;
      box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.335);
      .pImg{
        width: .45273rem;
        height: .45273rem;
        margin: auto;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
  .sheetName{
    width: 100%;
    margin-top: 2px;
    font-size: .332889rem;
    line-height: .533333rem !important;
    text-overflow: -o-ellipsis-lastline !important;
    overflow: hidden !important;
    display: -webkit-box !important;
    -webkit-line-clamp: 3 !important;
    -webkit-box-orient: vertical !important;
  }
  .programbox{
    min-height: .798935rem;
    .proName{
      width: 100%;
      font-size: .372836rem;
      height: .399467rem;
      line-height: .399467rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin-top: .133156rem;
      color: #000 !important;
    }
  }

}
</style>
