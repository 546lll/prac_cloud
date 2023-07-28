<template>
  <div class='discover'>
    <!-- 轮播图 -->
    <discover-swiper style='margin-top: 54px'></discover-swiper>
    <!-- 滑动导航栏 -->
    <div class="mui-content">
      <!-- 区域滚动 -->
      <div id="slider" class="mui-slider">
        <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
      <!-- 显示的真实内容 -->
          <div class="mui-scroll">
            <a class="mui-control-item" @click="recommandSong">
              <div class="img">
                <i class="iconfont icon-rili"></i>
              </div>
              <span>每日推荐</span>
            </a>
            <a class="mui-control-item">
              <div class="img">
                <i class="iconfont icon-fm"></i>
              </div>
              <span>私人FM</span>
            </a>
            <a class="mui-control-item">
              <div class="img">
                <i class="iconfont icon-gedan"></i>
              </div>
              <span>歌单</span>
            </a>
            <a class="mui-control-item">
              <div class="img">
                <i class="iconfont icon-paihang"></i>
              </div>
              <span>排行榜</span>
            </a>

            <a class="mui-control-item">
              <div class="img">
                <i class="iconfont icon-zhibo"></i>
              </div>
              <span>直播</span>
            </a>
            <a class="mui-control-item">
              <div class="img">
                <i class="iconfont icon-zhuanji"></i>
              </div>
              <span>数字专辑</span>
            </a>
            <a class="mui-control-item">
              <div class="img">
                <i class="iconfont icon-liaotian"></i>
              </div>
              <span>唱聊</span>
            </a>
            <a class="mui-control-item">
              <div class="img">
                <i class="iconfont icon-youxi1"></i>
              </div>
              <span>游戏专区</span>
            </a>
          </div>
        </div>
      </div>
    </div>
    <!-- 热门歌单 -->
    <discover-sheet></discover-sheet>
    <!-- 新歌速递 -->
    <discover-songtop></discover-songtop>
    <!-- 电台节目 -->
    <discover-program></discover-program>
    <!-- 最新MV -->
    <discover-mv></discover-mv>
    <!-- 新碟上架 -->
    <discover-album></discover-album>
    <!-- 热门歌手 -->
    <discover-hotsinger></discover-hotsinger>
  </div>
</template>

<script>
import DiscoverSwiper from './compchildren/DiscoverSwiper.vue' // 轮播图组件
import DiscoverSheet from './compchildren/DiscoverSheet.vue' // 热门歌单
import DiscoverSongtop from './compchildren/DiscoverSongtop.vue' // 新歌速递
import DiscoverProgram from './compchildren/DiscoverProgram.vue' // 电台节目
import DiscoverMv from './compchildren/DiscoverMv.vue' // 最新MV
import DiscoverAlbum from './compchildren/DiscoverAlbum.vue' // 新碟上架
import DiscoverHotsinger from './compchildren/DiscoverHotsinger.vue' // 电台节目

import '@/assets/icon/Discover.css' // 字体图标
import '@/assets/icon/RadioStation.css' // 字体图标

export default {
  name: 'Discover',
  components: {
    DiscoverSwiper,
    DiscoverSheet,
    DiscoverSongtop,
    DiscoverProgram,
    DiscoverMv,
    DiscoverAlbum,
    DiscoverHotsinger

  },
  data () {
    return {
    }
  },
  methods: {
    recommandSong () {}
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
.discover {
  touch-action: none;
  margin-bottom: 55px;
  .mui-content {
    margin-top: 0.399467rem;
    margin-bottom: 0.399467rem;
    background-color: #fafafa;
  }
}
#slider {
  height: 1.864181rem;
  #sliderSegmentedControl {
    height: 100%;
    .mui-scroll {
      .mui-control-item {
        color: #000 !important;
        padding: 0 0.399467rem !important;
        text-align: center;
        font-size: 0.332889rem;
        height: 1.864181rem;
        span {
          position: relative;
          top: -8px;
        }
        .img {
          width: 1.198402rem;
          height: 1.198402rem;
          border-radius: 50%;
          background-image: linear-gradient(to right, #d84e4e, red);
          margin: 0 auto;
          text-align: center;
          margin-bottom: 0.133156rem;
          display: flex;
          align-items: center;
          justify-content: center;

          .iconfont {
            color: #fff;
            font-size: 0.48rem;
          }
        }
      }
    }
  }
}
</style>
