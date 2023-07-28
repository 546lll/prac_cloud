<template>
   <div class="SearchSuggest">
    <!-- 标题 -->
    <div class="item1 box" @click="toSearch(keyword)">搜索 “{{ keyword }}”</div>
    <!-- 搜索建议 -->
    <div
      class="item box"
      @click="toSearch(item.title)"
      :class="{ borderClass: index !== list.length }"
      v-for="(item, index) in list"
      :key="index"
    >
      <i class="iconfont icon-sousuo"></i>
      {{ item.title }}
    </div>
  </div>
</template>

<script>
import { searchSuggest } from '@/api/search.js'
import { debounce } from '@/utils/common/common.js'

export default {
  name: 'SearchSuggest',
  props: ['keyword', 'isShow'],
  data () {
    return {
      list: [],
      title: this.keyword // 上一次的关键词
    }
  },
  methods: {
    // 跳转搜索结果
    toSearch (keyword) {
      this.$emit('toRenovate') // 传递事件
      this.$router.push('/discover/search/searchDetail/' + keyword)
    },
    // 获取搜索建议
    async getSuggest () {
      // 如果搜索内容发生改变
      if (this.isShow && this.keyword != '' && this.keyword != this.title) {
        this.list = []
        const { data: res } = await searchSuggest(this.keyword, 'mobile')
        if (res.result.allMatch) {
          this.list = res.result.allMatch.map(item => {
            return {
              title: item.keyword
            }
          })
        }
      }
    }
  },
  watch: {
    keyword () {
      // 作防抖处理
      const func = debounce(this.getSuggest, 1000)
      func()
    }
  }
}
</script>

<style lang="less" scoped>

.SearchSuggest {
  width: 90%;
  /* height: 400px; */
  background-color: #fff;
  position: fixed;
  top: 1.171771rem;
  z-index: 20;
  margin-left: 5%;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.281);
  .box {
    width: 100%;
    height: 1.331558rem;
    line-height: 1.331558rem;
    font-size: 0.412783rem;
    color: #8a8a8a;
    &.item {
      &.borderClass {
        box-sizing: border-box;
        border-bottom: 1px solid #ececec;
      }
      .iconfont {
        margin-left: 0.399467rem;
        margin-right: .133333rem;
        font-size: .373333rem;
      }
    }
    &.item1 {
      color: rgb(21, 117, 206) !important;
      box-sizing: border-box;
      text-indent: 0.399467rem;
      border-bottom: 1px solid #ececec;
    }
  }
}
</style>
