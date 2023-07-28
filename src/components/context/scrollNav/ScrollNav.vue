<template>
  <!-- 滚动导航栏 -->
  <div class="TabNav">
    <div class="mui-content">
      <div
        id="sliderSegmentedControl"
          class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll">
          <a
            @click="tabItem(index)"
            class="mui-control-item"
            v-for="(item, index) in itemList"
            :key="index"
            :class="{ active: index === tabIndex }"
          >
            <div class="item" :key="index">
              <span class="spItem">{{ item }}</span>
            </div>
          </a>
          <!-- 分割线 -->
          <span id="border" class="bottomBor"></span>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import { Move } from '@/utils/common/tool'

export default {
  name: 'ScrollNav',
  props: {
    itemList: {
      type: Array,
      default: () => []
    },
    // 默认index
    firstIndex: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      tabIndex: 0
    }
  },
  methods: {
    // 切换歌单
    tabItem (index) {
      // 子传父
      this.$emit('tabToggle', index)
      this.tabIndex = index
      const span = document.getElementsByClassName('spItem')[index]
      const bottomBor = document.getElementById('border')
      // 更改样式
      bottomBor.style.width = span.offsetWidth + 'px'
      // 切换时的边框移动动画
      // 移动元素，修改样式， 移动目的地， 速度
      Move(bottomBor, 'left', span.offsetLeft, 35)
    }
  },
  mounted () {
    // 引入滑动模块
    // .mui-scroll-wrapper 表示需要进行滑动的区域
    this.mui('.mui-scroll-wrapper').scroll({
      deceleration: 0.0005 // flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    })
    this.mui('.mui-scroll-wrapper').scroll({
      bounce: true, // 是否回弹
      scrollY: false, // 是否竖向滚动
      scrollX: true, // 是否横向滚动
      startX: 0, // 初始化时滚动至x
      startY: 0, // 初始化时滚动至y
      indicators: true // 是否显示滚动条
    })

    // 等浏览器更新DOM之后再执行
    this.$nextTick(() => {
      setTimeout(() => {
        this.tabItem(this.firstIndex)
      }, 1000)
    })
  }
}
</script>

<style lang='less' scoped>
.mui-active {
  color: #000 !important;
  border-bottom: none;
}

.TabNav {
  width: 100%;
  height: 1.091877rem;
  background-color: #fff;
  box-sizing: border-box;
  border-bottom: 1px solid #e6e6e6;
  display: flex;
  position: relative;
  box-sizing: border-box;
  touch-action: none;
  .mui-content {
    background-color: transparent !important;
    height: 100% !important;
    #sliderSegmentedControl {
      height: 100%;
    .mui-scroll {
      height: 1.091877rem !important;
      .mui-control-item {
        height: 1.091877rem;
        padding: 0 0.399467rem !important;
        &.active {
          color: red !important;
        }
        .item {
          flex: 1;
          line-height: 1.171771rem;
          text-align: center;
          font-size: 0.372836rem;
          span {
            padding: 0.133156rem 0.266312rem 0.266312rem;
          }
        }
      }
      .bottomBor {
        width: 1.28rem;
        height: .053333rem !important;
        background-color: #da231b;
        position: absolute;
        bottom: .053333rem;
        padding: 0 !important;
      }
    }
    }
  }
}

</style>
