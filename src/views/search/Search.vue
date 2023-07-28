<template>
  <div class="Search">
    <!-- 导航栏 -->
    <div class="nav">
      <!-- 返回键 -->
      <div class="left" @click="back">
        <i class="iconfont icon-fanhui"></i>
      </div>
      <!-- 搜索内容输入 -->
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
    <!-- 根据输入弹出的搜索建议 -->
    <transition>
      <search-suggest v-show="showSuggest" :keyword="searchContent" :isShow="showSuggest">
      </search-suggest>
    </transition>
    <!-- 热搜榜 -->
    <div class="bContent">
      <search-hot-detail></search-hot-detail>
    </div>
  </div>
</template>

<script>
import SearchHotDetail from './comps/SearchHotDetail.vue'
import SearchSuggest from './comps/SearchSuggest.vue'

import { getDefault, getSearchHot } from '@/api/search.js'

export default {
  name: 'Search',
  components: {
    SearchHotDetail,
    SearchSuggest
  },
  data () {
    return {
      searchContent: '', // 搜索内容
      showSuggest: false, // 搜索建议
      index: false // 只有改变输入内容时显示搜索建议
    }
  },
  watch: {
    // 监听输入内容
    searchContent () {
      if (this.searchContent == '') {
        this.showSuggest = false
      } else if (this.index) {
        this.showSuggest = true
      }
    }
  },
  methods: {
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
      if (this.searchContent != '') {
        this.$router.push('/discover/search/searchDetail/' + this.searchContent)
      } else {
        this.$toast.show('请输入搜索内容！', 1900)
      }
    },
    back () {
      this.$router.go(-1)
    }
  },
  created () {
    getDefault().then((res) => {
      this.searchContent = res.data.data.realkeyword
    })
  }
}
</script>

<style lang="less" scoped>
.v-enter {
  // 进入前的状态，
  opacity: 0;
  // 小-》大
  transform: scale(0.1);
}
.v-leave-to {
  // 退出后的状态，
  opacity: 0;
  // 大->小
  transform: scale(0.1);
}
.v-enter-active, .v-leave-active {
  /* 添加动画效果 */
  transition: all 0.2s linear;
}
.Search {
  width: 100%;
  background-color: #fff;
  position: relative;
  overflow: hidden;
  height: 95vh;
  z-index: 20;
  .nav {
    z-index: 21;
    position: fixed;
    width: 100%;
    height: 1.171771rem;
    background-color: #fff;
    display: flex;
    .left {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      iconfont {
        font-size: .4rem;
        color: #000;
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
        }
      }
    }
  }
  .bContent {
    position: relative;
    top: 45px;
    padding: 0.133156rem 0.372836rem 0.319574rem;
    margin-bottom: 45px;
    overflow-y: scroll;
  }
}
</style>
