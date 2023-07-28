<template>
  <div class="discover-program">
    <div class="topTitle">
      <div class="left">{{ title }}</div>
      <div class="right"><div class="btn" @click="moreProgram">查看更多</div></div>
    </div>
    <div class="mui-content">
      <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
        <div class="mui-scroll">
          <!--这里放置真实显示的DOM内容-->
          <div
              @click="toProgram(item.id)"
              v-for="(item, index) in programList"
              :key="index"
              class="mui-control-item"
              href="#item1mobile"
            >
              <!-- 点击播放暂时播放不了,但是可以切换图标 -->
              <sheet-item :showCount="false" :sheetItem="item" :isSheet="false"></sheet-item>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SheetItem from '@/components/context/sheetItem/SheetItem.vue'
import { getProgram } from '@/api/discover.js'
export default {
  name: 'DiscoverProgram',
  components: {
    SheetItem
  },
  data () {
    return {
      title: '',
      programList: []
    }
  },
  methods: {
    async getInitialLIst () {
      const { data: res } = await getProgram()
      this.title = res.name
      this.programList = res.programs.map(item => {
        return {
          picUrl: item.coverUrl, // 封面
          id: item.id, // id
          name: item.name, // 标题
          desc: item.radio.desc // 介绍
        }
      })
    },
    // 更多电台
    moreProgram () {

    },
    // 到达电台首页
    toProgram () {

    }
  },
  created () {
    this.getInitialLIst()
  },
  mounted () {
    // 初始化scroll控件
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
  }
}
</script>

<style lang="less" scoped>
.discover-program {
  margin-top: 0.532623rem;
  .topTitle {
    width: 100%;
    display: flex;
    padding: 0 0.319574rem;
    .left {
      flex: 1;
      font-size: 0.426099rem;
      font-weight: 550;
      line-height: 0.665779rem;
    }
    .right {
      flex: 1;
      .btn {
        float: right;
        width: 1.864181rem;
        height: 0.585885rem;
        font-size: 0.319574rem;
        /* padding: .053262rem .159787rem; */
        border-radius: 0.585885rem;
        text-align: center;
        line-height: 0.585885rem;
        border: 1px solid #919090;
      }
    }
  }
  .mui-content {
    background-color: #fafafa;
    #sliderSegmentedControl {
      height: 3.866667rem;
    }
    .mui-control-item {
      padding: 0.213049rem 0.186418rem 0.399467rem !important;
      &.mui-active {
        color: inherit;
        border-bottom: 0;
      }
    }
  }

}
</style>
