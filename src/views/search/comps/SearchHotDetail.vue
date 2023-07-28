<template>
   <div class="HotDetail">
    <!-- 标题 -->
    <div class="topbox">
      <div class="left">热搜榜</div>
      <div class="right">
        <!-- <div class="btn">
          <i class="iconfont icon-bofang"></i>
          播放全部
        </div> -->
      </div>
    </div>
    <!-- 热搜棒列表 -->
    <div class="bottomBox">
      <div
        class="item"
        v-for="(item, index) in itemList"
        :key="index"
        :class="{ topSearch: index <= 2 }"
      >
        <div class="leftBox">
          <div class="ranking" :class="{ color: index <= 2 }">
            {{ index + 1 }}
          </div>
          <div class="text" @click="toSearch(item.searchWord)">{{ item.searchWord }}</div>
        </div>
      </div>
    </div>
    <!-- 今日热搜 -->
    <div class="hotList">
      <div class="topbox">
        <div class="left">今日热搜</div>
        <div class="right"></div>
      </div>
      <div class="bottomBox">
        <div
          class="item"
          v-for="(item, index) in hotList"
          :key="index"
          :class="{ topSearch: index <= 2 }"
        >
          <div class="leftBox">
            <div class="ranking" :class="{ color: index <= 2 }">
              {{ index + 1 }}
            </div>
            <div class="text" @click="toSearch(item.first)">{{ item.first }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getHotDetail, getSearchHot } from '@/api/search.js'

export default {
  name: 'SearchHotDetail',
  data () {
    return {
      itemList: [], // 歌曲热搜榜
      hotList: [] // 热搜
    }
  },
  methods: {
    toSearch (word) {
      this.$router.push('/discover/search/searchDetail/' + word)
    }
  },
  created () {
    getHotDetail().then((res) => {
      this.itemList = res.data.data.map(item => {
        return {
          searchWord: item.searchWord // 搜索内容
        }
      })
    })
    getSearchHot().then((res) => {
      this.hotList = res.data.result.hots.map(item => {
        return {
          first: item.first
        }
      })
    })
  }
}
</script>

<style lang="less" scoped>
.HotDetail {
  width: 100%;
  .topbox {
    width: 100%;
    height: 1.331558rem;
    display: flex;
    border-bottom: 1px solid #e6e6e6;
    .left {
      flex: 1;
      font-size: 0.372836rem;
      font-weight: 550;
      letter-spacing: 1px;
      line-height: 1.331558rem;
    }
    .right {
      flex: 1;
      display: flex;
      align-items: center;
      position: relative;
      .btn {
        height: 0.665779rem;
        width: 2.396804rem;
        float: right;
        border: 1px solid #afafaf;
        border-radius: 0.665779rem;
        text-align: center;
        font-size: .32rem;
        position: absolute;
        right: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        .iconfont {
          font-size: .32rem;
          margin-right: .106667rem;
        }
      }
    }
  }
  .bottomBox {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-top: 0.266312rem;
    border-bottom: 1px solid #e6e6e6;
    .item {
      width: 50%;
      height: 0.665779rem;
      line-height: 0.665779rem;
      font-size: 0.372836rem;
      position: relative;
      margin-bottom: 0.266312rem;
      &.topSearch {
        font-weight: 550;
      }
      .ranking {
        width: 10%;
        height: 100%;
        float: left;
        margin-right: 0.133156rem;
        color: #afafaf;
        &.color {
          color: red !important;
        }
      }
      .text {
        width: 3.994674rem;
        height: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        float: left;
      }
    }
  }
}
</style>
