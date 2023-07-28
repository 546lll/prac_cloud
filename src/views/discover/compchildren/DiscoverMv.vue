<template>
  <div class="discover-mv">
    <div class="topTitle">
      <div class="left">最新MV</div>
      <div class="right"></div>
    </div>
    <div class="mui-content" style="">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll">
          <div
          @click="toMv(item.id)"
            v-for="(item, index) in mvList"
            :key="index"
            class="mui-control-item"
            href="#item1mobile"
          >
            <div class="itemBox">
              <div class="topBox">
                <!-- MV封面 -->
                <img :src="item.cover" alt="">
                <!-- MV播放数量 -->
                <div class="count">▷ {{item.playCount}}</div>
              </div>
              <!-- Mv相关信息 -->
              <div class="bottomBox">
                <div class="name"><span>{{item.name}}</span></div>
                <div class="artistName"><span>{{item.artistName}}</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { toStringNum } from '@/utils/common/common.js'
import { getNewMv } from '@/api/discover.js'
export default {
  name: 'DiscoverMv',
  data () {
    return {
      mvList: null
    }
  },
  methods: {
    async getInitialList () {
      const { data: res } = await getNewMv('', 6)
      this.mvList = res.data.map(item => {
        return {
          id: item.id,
          name: item.name, // mv名称
          cover: item.cover, // mv封面
          artistName: item.artistName, // 创作者
          playCount: toStringNum(item.playCount) // 播放量
        }
      })
    },
    toMv () {
    }
  },
  created () {
    this.getInitialList()
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
.discover-mv {
  margin-top: .319574rem;
  .topTitle {
    display: flex;
    padding: 0 0.319574rem;
    .left {
      flex: 1;
      font-size: 0.426099rem;
      font-weight: 550;
    }
    .right {
      flex: 1;
    }
  }
  .mui-content{
    background-color: #fafafa;
    #sliderSegmentedControl {
      height: 4.101198rem;
      .mui-control-item {
        padding: 0.213049rem 0.186418rem 0.399467rem !important;
        color: #000 !important;
        .itemBox {
          width: 4.260985rem;
          height: 3.462051rem;
          border-radius: .213049rem;
          overflow: hidden;
          position: relative;
          background-color: #fff;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.185);
          .topBox {
            width: 100%;
            height: 68%;
            img {
              width: 100%;
              height: 100%;
            }
            .count{
              height: .532623rem;
              line-height: .532623rem;
              position: absolute;
              right: .266312rem;
              top: .133156rem;
              font-size: .319574rem;
              color: #fff;
            }
          }
          .bottomBox {
            width: 92%;
            height: 32%;
              margin: auto;
            .name {
              margin-top: .079893rem;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              width: 3.861518rem;
              height: 50%;
              line-height: .532623rem;
              span{
                display: inline-block;
                text-align: left;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                width: 3.861518rem;
                font-size: .372836rem;
              }
            }
            .artistName{
              width: 3.861518rem;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              height: 40%;
              line-height: .426099rem;
              font-size: .319574rem;
              color: rgb(151, 151, 151);
              span{
                  float: left;
              }
            }
          }
        }
      }
    }

  }
}
</style>
