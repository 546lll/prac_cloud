<template>
  <div class="SearchHP">
    <!-- 导航 -->
    <div class="nav">
      <div class="left" @click="back">
        <i class="iconfont icon-fanhui"></i>
      </div>
      <div class="right">
        <div class="sous">
          <input
            @focus="toFocus"
            @blur="toBlur"
            @keyup.enter="toSearch"
            v-model="searchContent"
            :placeholder="searchContent"
            type="text"
          />
        </div>
      </div>
    </div>
    <!-- 搜索建议 -->
    <transition>
      <search-suggest
        class="suggestBox"
        v-show="showSuggest"
        :keyword="searchContent"
        @toRenovate='toRenovate'
        :isShow="showSuggest">
      </search-suggest>
    </transition>
    <!-- 滚动菜单栏 ，选中的菜单位置不会变动，需要手动拉-->
    <div class="snav">
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
    <div class="contentbox">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import SearchSuggest from './SearchSuggest.vue' // 搜索建议

import { Move } from '@/utils/common/tool'

export default {
  name: 'SearchDetail',
  props: ['keywords'],
  components: {
    SearchSuggest
  },
  data () {
    return {
      showSuggest: false, // 是否展示搜索建议栏
      searchContent: '', // 搜索内容
      itemList: [ // 菜单
        '综合',
        '单曲',
        '视频',
        '歌手',
        '专辑',
        '歌单',
        '主播电台',
        'MV',
        '用户'
      ],
      tabIndex: 0, // 默认菜单索引
      index: false, // 判断是否改变了搜索内容
      lastContent: '' // 上一次的搜索内容
    }
  },
  methods: {
    // 返回
    back () {
      this.$router.go(-1)
    },
    // 输入获得焦点时
    toFocus () {
      if (this.searchContent != '') {
        this.index = true
        this.showSuggest = true
      } else {
        this.index = false
        this.showSuggest = false
      }
    },
    // 失去焦点时
    toBlur () {
      this.index = false
      this.showSuggest = false
    },
    toSearch () {
      // 如果内容发生变化了才转路由
      if (this.searchContent != this.lastContent) {
        // 这里只改变搜索内容，搜索的菜单不变
        const path = this.$route.fullPath.split('/').slice(0, 5).join('/')
        this.$router.replace(path + '/' + this.searchContent)
        this.lastContent = this.searchContent
      }
    },
    changeIndex (index) {
      this.tabIndex = index
      const span = document.getElementsByClassName('spItem')[index]
      const bottomBor = document.getElementById('border')
      // 更改样式
      bottomBor.style.width = span.offsetWidth + 'px'
      // 切换时的边框移动动画
      // 移动元素，修改样式， 移动目的地， 速度
      Move(bottomBor, 'left', span.offsetLeft, 35)
    },
    // 切换菜单
    tabItem (index) {
      this.changeIndex(index)
      // 跳转路由
      switch (index) {
        case 0: // 综合
          this.$router.replace(
            '/discover/search/searchDetail/whole/' + this.keywords)
          break
        case 1: // 单曲
          this.$router.replace(
            '/discover/search/searchDetail/song/' + this.keywords)
          break
        case 2: // 视频
          this.$router.replace(
            '/discover/search/searchDetail/video/' + this.keywords)
          break
        case 3: // 歌手
          this.$router.replace(
            '/discover/search/searchDetail/singer/' + this.keywords)
          break
        case 4: // 专辑
          this.$router.replace(
            '/discover/search/searchDetail/album/' + this.keywords)
          break
        case 5: // 歌单
          this.$router.replace(
            '/discover/search/searchDetail/sheet/' + this.keywords)
          break
        case 6: // 主播电台
          this.$router.replace(
            '/discover/search/searchDetail/radio/' + this.keywords)
          break
        case 7: // MV
          this.$router.replace(
            '/discover/search/searchDetail/mv/' + this.keywords)
          break
        case 8: // 用户
          this.$router.replace(
            '/discover/search/searchDetail/user/' + this.keywords)
          break
        default:
          break
      }
    },
    // 搜索
    toRenovate () {

    }
  },
  created () {
    this.searchContent = this.keywords
    this.lastContent = this.keywords
  },
  // 改变路由时更改Index和重新渲染数据
  watch: {
    $route: function (to, from) {
      if (to.fullPath != from.fullPath) {
        this.searchContent = this.keywords
        this.lastContent = this.keywords
      }
      if (to.fullPath.split('/')[4] != from.fullPath.split('/')[4]) {
        // 如果菜单定向改变了，改变索引
        if (to.fullPath.includes('song')) {
          this.changeIndex(1)
        } else if (to.fullPath.includes('video')) {
          this.changeIndex(2)
        } else if (to.fullPath.includes('singer')) {
          this.changeIndex(3)
        } else if (to.fullPath.includes('album')) {
          this.changeIndex(4)
        } else if (to.fullPath.includes('sheet')) {
          this.changeIndex(5)
        } else if (to.fullPath.includes('radio')) {
          this.changeIndex(6)
        } else if (to.fullPath.includes('mv')) {
          this.changeIndex(7)
        } else if (to.fullPath.includes('user')) {
          this.changeIndex(8)
        } else {
          this.changeIndex(0)
        }
      }
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
        this.tabItem(this.tabIndex)
      }, 1000)
    })
  }
}
</script>

<style lang="less" scoped>
.mui-active {
  color: #000 !important;
  border-bottom: none;
}

.v-enter {
  opacity: 0;
  /* 进来的时候从小到大 */
  transform: scale(0.1);
}
.v-leave-to {
  opacity: 0;
  /* 离开的时候从大到小*/
  transform: scale(0.1);
}

/* 动画执行期间 */
.v-enter-active,
.v-leave-active {
  /* 添加动画效果 */
  transition: all 0.2s linear;
}
.SearchHP {
  width: 100%;
  background-color: #fff;
  position: relative;
  min-height: 100vh;
  z-index: 20;
  .nav {
    width: 100%;
    height: 1.171771rem;
    background-color: #fff;
    z-index: 20;
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    .left {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      .iconfont {
        font-size: .4rem;
      }
    }
    .right {
      flex: 9;
      display: flex;
      align-items: center;
      .sous {
        width: 90%;
        height: 80%;
        border-bottom: 1px solid rgb(190, 190, 190);
        margin-left: 0.266312rem;
        input {
          width: 100%;
          height: 100%;
          border: 0;
          padding: 0;
          font-size: 0.426099rem;
          color: rgb(133, 133, 133);
          margin: 0;
        }
      }
    }
  }
  .snav {
    position: fixed;
    top: 1.146667rem;
    left: 0;
    right: 0;
    z-index: 20;
    width: 100%;
    height: 1.091877rem;
    background-color: #fff;
    box-sizing: border-box;
    border-bottom: 1px solid #e6e6e6;
    display: flex;
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
  .suggestBox{
    top: 1.198402rem;
    position: absolute;
    z-index: 21 !important;
  }
  .contentbox {
    // padding: 0.266312rem 0.372836rem;
    position: absolute;
    top: 2.196804rem;
    left: 0;
    right:0;
    bottom: 45px;
  }
}
</style>
