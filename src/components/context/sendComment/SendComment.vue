<template>
  <div class="SendComment">
    <div class="content">
      <div class="left">
        <input
          v-model="content"
          placeholder="写评论..."
          class="textContent"
          type="text"
          @keyup.enter="send"
          >
      </div>
      <div class="right">
        <i @click="send" class="iconfont icon-fasong"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { getComment, getDComment } from '@/api/comment.js'

export default {
  name: 'SendComment',
  props: {
    t: { // 1.发送 2.回复
      type: Number,
      default: 1
    },
    type: { // t: { 0-歌曲， 1-mv, 2-歌单， 3-专辑，4-电台，5-视频，6-动态
      type: Number,
      default: 1
    },
    id: { // 资源id
      type: String,
      default: ''
    },
    isDynamic: { // 是否是动态评论
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      content: '',
      commentDetail: {}

    }
  },
  methods: {
    async send () {
      if (this.isDynamic) {
        // 给动态评论
        if (this.content !== '') {
          // 输入框不为空，如果是动态评论,id为threadId，没有成功
          const { data: res } = await getDComment(this.t, this.type, this.id, this.content, this.$store.state.cookie)
          console.log(res)
          if (res.data) {
            const comment = res.comment
            this.commentDetail = {
              id: comment.user.userId,
              content: comment.content,
              time: comment.time,
              avatarUrl: comment.user.avatarUrl,
              nickname: comment.user.nickname
            }
          }
          this.$toast.show('发布成功', 1900)
          this.content = '' // 清空输入框
          this.$emit('successComment', this.commentDetail) // 向上提交事件
        }
      } else {
        if (this.content !== '') {
          // 输入框不为空，可能是接口问题，返回码为302重定向
          const { data: res } = await getComment(this.t, this.type, this.id, this.content, this.$store.state.cookie)
          console.log(res)
          if (res.data) {
            const comment = res.comment
            this.commentDetail = {
              id: comment.user.userId,
              content: comment.content,
              time: comment.time,
              avatarUrl: comment.user.avatarUrl,
              nickname: comment.user.nickname,
              t: 0
            }
          }
          this.$toast.show('发布成功', 1900)
          this.content = '' // 清空输入框
          this.$emit('successComment', this.commentDetail) // 向上提交事件
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
::-webkit-input-placeholder {
  font-size: 0.399467rem;
  color: rgb(119, 119, 119);
}
.SendComment {
  position: fixed;
  z-index: 46;
  bottom: 0;
  width: 100%;
  height: 1.065246rem;
  display: flex;
  align-items: center;
  background-color: #fff;
  box-shadow: 0px -1px 1px 1px rgba(87, 87, 87, 0.1);
  .content {
    width: 92%;
    height: 0.932091rem;
    line-height: 0.905459rem;
    margin: 0 auto;
    display: flex;
    .left {
      flex: 9;
      .textContent {
        width: 100%;
        height: 100%;
        padding: 0;
        border: 0;
        font-size: .32rem;
        position: relative;
        top: -0.106667rem;
      }
    }
    .right {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      .icon-fasong{
        color: var(--red);
        font-size: .64rem
      }
    }
  }
}
</style>
