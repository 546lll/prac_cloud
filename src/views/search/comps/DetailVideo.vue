<template>
  <div class="DetailVideo" v-if="!noDetail" ref="box">
    <div
      class="videoItem"
      @click="toVideo(item.id)"
      v-for="(item, index) in videoList"
      :key="index"
    >
      <div class="vleft">
        <img :src="item.coverUrl" alt="" />
        <div class="count">▷ {{ item.playTime }}</div>
      </div>
      <div class="vright">
        <div class="vbox">
          <div class="vtitle">{{ item.title }}</div>
          <div class="videoDetail">
            {{ item.durationms + " by " }}{{ item.creator }}
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="noDetail" v-else>
    没有更多视频了
  </div>
</template>

<script>
import { searchResult } from '@/api/search.js'
import { toStringNum, durationTime } from '@/utils/common/common.js'

export default {
  name: 'DetailVideo',
  props: ['keywords'],
  data () {
    return {
      offset: 0,
      videoList: [],
      more: true,
      noDetail: false
    }
  },
  methods: {
    // 获取数据
    async getVideos () {
      if (this.more) {
        const { data: res } = await searchResult(this.keywords, 20, this.offset * 20, 1014)
        if (res.result.videos) {
          this.videoList.push(...res.result.videos.map(item => {
            return {
              id: item.vid,
              title: item.title,
              durationms: durationTime(item.durationms),
              playTime: toStringNum(item.playTime),
              coverUrl: item.coverUrl,
              creator: item.creator[0].userName
            }
          }))
          this.offset++
          this.more = res.result.hasMore
        }
      } else {
        this.$toast.show('没有更多了:(', 1900)
      }
    },
    // 监听滚动事件
    linearScroll () {
      const box = this.$refs.box
      // 滚动条距离顶部的距离
      const scrollTop =
        box.scrollTop
      // 可视区的高度
      const clientHeight =
        box.clientHeight
      // 滚动条可滚动的高度
      const scrollHeight =
        box.scrollHeight
      if (scrollTop + clientHeight >= scrollHeight - 1) {
        this.$loading.loadingShow()
        setTimeout(() => {
          this.getVideos()
          this.$loading.loadingNo()
        }, 1000)
      }
    }
  },
  created () {
    this.$loading.loadingShow()
    this.getVideos()
  },
  mounted () {
    const box = this.$refs.box
    this.$nextTick(() => {
      if (box) box.addEventListener('scroll', this.linearScroll)
      this.$loading.loadingNo()
    })
  },
  deactivated () {
    const box = this.$refs.box
    if (box) box.removeEventListener('scroll', this.linearScroll)
  }
}
</script>

<style lang="less" scoped>
.DetailVideo {
  width: 100%;
  height: 100%;
  padding: 0.266312rem 0.372836rem;
  overflow-y: scroll;
  .videoItem {
    display: flex;
    height: 1.997337rem;
    margin-bottom: 0.213049rem;
    .vleft {
      flex: 4;
      position: relative;
      .count {
        position: absolute;
        right: 0.319574rem;
        top: 0;
        color: #fff;
        font-size: 0.319574rem;
      }
      img {
        width: 3.462051rem;
        height: 100%;
        border-radius: 0.133156rem;
      }
    }
    .vright {
      flex: 6;
      display: flex;
      align-items: center;
      .vtitle {
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        font-size: 0.346205rem;
      }
      .videoDetail {
        font-size: 0.319574rem;
        color: #a7a7a8;
      }
    }
  }
}
.noDetail {
  width: 100%;
  height: calc(100vh - 1.171771rem - 1.091877rem - 45px);
  margin-bottom: 0.133156rem;
  margin-top: calc(1.171771rem + 1.091877rem - 0.266312rem);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.532623rem;
  color: #a7a7a8;
}
</style>
