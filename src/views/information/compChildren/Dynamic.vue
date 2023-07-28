<template>
  <div class="dynamic" v-if="eventList.length">
    <div class="eventBox" v-for="(item, index) in eventList" :key="index">
      <forward-dynamic
       v-if="item.type == 22"
       :threadId="item.threadId"
       :commentLength="item.commentLength"
       :likedCount="item.likedCount"
       :shareCount="item.shareCount"
       :events="item.events"
       :time="item.eventTime"
       :userImg="userImg"
       :nickName="nickName"
       :pics="item.pics">
      </forward-dynamic>
    </div>
  </div>
  <div v-else class="noEvent">暂时还没有动态哦</div>
</template>

<script>
import { getUserEvent } from '@/api/user.js'

import ForwardDynamic from './ForwardDynamic.vue'

export default {
  name: 'Dynamic',
  props: ['userImg', 'nickName'],
  components: {
    ForwardDynamic
  },
  data () {
    return {
      eventList: [], // 动态数组
      lastTime: -1, // 分页参数
      moreEvent: true // 是否有更多动态
    }
  },
  methods: {
    async getEventList () {
      if (this.moreEvent) {
        const { data: res } = await getUserEvent(this.$route.params.uid, 30, this.lastTime)
        this.eventList = res.events.map(item => {
          return {
            events: JSON.parse(item.json), // 分享类型
            type: item.type, // 分享类型
            // 类型分类
            // 18 分享单曲
            // 19 分享专辑
            // 17 分享电台节目
            // 28 分享电台
            // 22 转发
            // 39 发布视频
            // 13 分享歌单
            // 35 动态
            // 24 分享专栏文章
            // 41、21 分享视频 / mv
            // 31 分享评论
            eventTime: item.eventTime, // 发表时间
            commentLength: item.info.commentCount, // 评论数量
            likedCount: item.info.likedCount, // 点赞数量
            shareCount: item.info.shareCount, // 分享数量
            pics: item.pics, // 图片数组
            threadId: item.info.commentThread.id // 动态评论id
          }
        })
        this.moreEvent = res.more
        this.lastTime = res.lasttime
      } else {
        this.$toast.show('没有更多动态了~', 1900)
      }
    }
  },
  created () {
    this.getEventList()
  }
}
</script>

<style lang="less" scoped>
.dynamic {
  width: 100%;
  min-height: 12.4rem;
  padding: 0 15px 15px;
  margin-bottom: 1.198402rem;
  position: relative;
  .eventBox {
    padding-bottom: 0.266312rem;
  }
}
.noEvent {
  width: 100%;
  min-height: 12.4rem;
  text-align: center;
  line-height: 7.989348rem;
  color: #8b8b8b;
  font-size: 0.399467rem;
}
</style>
