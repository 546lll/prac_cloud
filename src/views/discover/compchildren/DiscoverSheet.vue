<template>
  <!-- 热门歌单组件 -->
  <div class="discover-sheet">
    <div class="topTitle">
      <div class="left">懂你的精选歌单</div>
      <div class="right">
        <div class="btn" @click="Sheet">查看更多</div>
      </div>
    </div>
    <!-- 可滚动的歌单,这里的歌单可以是轮播图（未实现） -->
    <div class="mui-content">
      <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
        <div class="mui-scroll">
          <!--这里放置真实显示的DOM内容-->
          <div
              @click="toSheet(item.id)"
              v-for="(item, index) in sheetList"
              :key="index"
              class="mui-control-item"
              href="#item1mobile"
            >
              <!-- 点击播放暂时播放不了,但是可以切换图标 -->
              <sheet-item :sheetItem="item"></sheet-item>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getHotSheet } from '@/api/discover.js'
import SheetItem from '@/components/context/sheetItem/SheetItem.vue'
import { toStringNum } from '@/utils/common/common.js'

export default {
  name: 'DiscoverSheet',
  components: {
    SheetItem
  },
  data () {
    return {
      offset: -1,
      sheetList: null
    }
  },
  methods: {
    // 跳到歌单广场
    Sheet () {
      this.$router.push('/discover/moreSheet')
    },
    // 获取指定歌单列表
    async getInitialSheet () {
      const { data: res } = await getHotSheet('hot', '全部', 6, this.offset * 6)
      this.sheetList = res.playlists.slice(0, 6).map(item => {
        return {
          id: item.id,
          rcmdtext: item.name,
          desc: item.description,
          picUrl: item.coverImgUrl,
          playCount: toStringNum(item.playCount)
        }
      })
    },
    // 跳到歌单列表
    toSheet (id) {
      this.$router.push('/playDetail/' + id + '&' + false)
    }
  },
  created () {
    this.getInitialSheet()
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
.discover-sheet {
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
