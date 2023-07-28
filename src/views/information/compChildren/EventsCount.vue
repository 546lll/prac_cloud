<template>
  <div class="eventsCount">
    <div class="content">
      <div class="left">
        <i class="iconfont icon-fenxiang"></i>
        {{ shareCount == 0 ? '转发' : shareCount }}
      </div>
      <div class="center" @click="showComment">
        <i class="iconfont icon-pinglun"></i>
        {{ commentLength == 0 ? '评论' : commentLength }}
      </div>
      <div class="right">
        <i class="iconfont icon-zan"></i>
        {{ likedCount == 0 ? '赞' : likedCount }}
      </div>
    </div>
    <!-- 评论盒子 -->
    <comment-box ref="commentList"></comment-box>
  </div>
</template>

<script>
import CommentBox from '@/components/context/commentBox/CommentBox.vue'

export default {
  name: 'EventsCount',
  props: ['shareCount', 'commentLength', 'likedCount', 'threadId'],
  components: {
    CommentBox
  },
  beforeRouteUpdate (to, from, next) {
    if (to.fullPath != from.fullPath) {
      this.$refs.commmentList.show = false // 收回评论盒子
      next()
    }
  },
  methods: {
    showComment () {
      this.$emit('sComment') // 向上响应事件
      this.$refs.commentList.show = true
    }
  }
}
</script>

<style lang="less" scoped>

.eventsCount {
  width: 100%;
  height: 0.665779rem;
  display: flex;
  align-items: center;
  margin-top: 0.399467rem;
  .content {
    display: flex;
    text-align: center;
    width: 100%;
    height: 85%;
    font-size: 0.346205rem;
    color: var(--fontColor);
    .iconfont {
      font-size: .32rem;
      color: var(--fontColor);
    }
    .left {
      flex: 1;
      line-height: 0.559254rem;
    }
    .center {
      flex: 1;
      line-height: 0.559254rem;
    }
    .right {
      flex: 1;
      line-height: 0.559254rem;
    }
  }
}
</style>
