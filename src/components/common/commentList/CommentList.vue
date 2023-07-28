<template>
  <div class="infoComment">
    <div class="nav">
      <div class="left" @click="back">
        <i class="iconfont icon-fanhui"></i>
      </div>
      <div class="center">
        {{ commentTitle }}
      </div>
      <div class="right" @click="fx">
        <i class="iconfont icon-fenxiang"></i>
      </div>
    </div>
    <div class="conscroll" ref="conscroll">
      <div class="content"
           v-if="commentList.length > 0"
      >
        <div class="item" v-for="(item, index) in commentList" :key="index">
          <!-- 评论 -->
          <div class="topbox">
            <!-- 用户头像 -->
            <div class="userImg">
              <img @click="profile(item.userId)" v-lazy="item.userImg" alt="" />
            </div>
            <div class="userName">
              <div>
                <!-- 用户名 -->
                <div @click="profile(item.userId)" class="name">
                  {{ item.userName }}
                  <img
                    v-if="item.vipType !== 0"
                    :src="require('@/assets/img/common/vip1.svg')"
                    alt=""
                  />
                </div>
                <!-- 评论添加时间 -->
                <div class="addtime">
                  <!-- 这里有个管道符 -->
                  {{  item.time | getTime }}
                </div>
              </div>
            </div>
            <div class="liked">
              <div :class="[item.t != 1 ? '' : 'likeComment']" class="count"  @click="liked(item)">
                {{ item.likedCount }}
                <i :class="[item.t != 1 ? '' : 'likeComment']" class="iconfont icon-zan"></i>
              </div>
            </div>
          </div>
          <div class="bottombox">
            <div class="left"></div>
            <div class="right">
              {{ item.content }}
            </div>
          </div>
        </div>
      </div>
      <div class="noComment" v-else>
        <div class="text">没有更多评论了</div>
      </div>
    </div>
    <!-- 发送评论组件 -->
    <send-comment
     @successComment="successComment"
     :type="type"
     :id="id"
     class="SendComment">
     </send-comment>
     <van-share-sheet
      v-model="showShare"
      title="立即分享给好友"
      :options="options"
    />
  </div>
</template>

<script>
import { getSheetComment } from '@/api/sheetInfo.js' // 歌单评论
import { getComment } from '@/api/played.js' // 音乐评论
import { likeComment } from '@/api/comment.js'
// import mscroll from '@/components/common/muiScroll/MuiScroll'
import sendComment from '@/components/context/sendComment/SendComment'

export default {
  name: 'CommentList',
  components: {
    // mscroll,
    sendComment
  },
  props: ['id', 'isAlbum'],
  data () {
    return {
      offset: 0, // 偏移量
      limit: 25,
      more: true, // 是否有更多评论
      commentTitle: '评论', // 导航栏标题
      commentLength: 0, // 评论数量
      commentList: [], // 评论列表
      showShare: false, // 是否分享
      options: [
        [
          { name: '微信', icon: 'wechat' },
          { name: '微博', icon: 'weibo' },
          { name: 'QQ', icon: 'qq' }
        ],
        [
          { name: '复制链接', icon: 'link' },
          { name: '分享海报', icon: 'poster' },
          { name: '二维码', icon: 'qrcode' }
        ]
      ],
      type: 2 // 歌单
    }
  },
  methods: {
    async getCom () {
      // 根据评论种类获取数据
      let data = null
      let res = null
      switch (this.$store.state.commentType) {
        case 0:
          data = await getSheetComment(this.id, this.limit, this.offset * this.limit)
          break
        case 1:
          data = await getComment(this.id, this.limit, this.offset * this.limit)
          break
        default:
          break
      }
      if (data.data) {
        res = data.data
      }
      if (this.more) {
        // console.log('评论区', res)
        this.more = res.more
        this.commentTitle = `评论(${res.total})`
        this.commentLength = res.comments.length
        // 热评置顶
        if (res.hotComments && res.hotComments.length) {
          this.commentList.push(...res.hotComments.map(item => {
            return {
              commentId: item.commentId, // 评论楼层id
              content: item.content, // 评论内容
              likedCount: item.likedCount, // 喜欢数量
              time: item.time, // 发布时间戳
              userImg: item.user.avatarUrl, // 用户头像
              authStatus: item.user.authStatus, // 用户身份认证  1 表示歌手
              userName: item.user.nickname, // 用户昵称
              userId: item.user.userId, // 用户id
              vipType: item.user.vipType // 是否开通会员
            }
          }))
        }
        this.commentList.push(...res.comments.map(item => {
          return {
            commentId: item.commentId, // 评论楼层id
            content: item.content, // 评论内容
            likedCount: item.likedCount, // 喜欢数量
            time: item.time, // 发布时间戳
            userImg: item.user.avatarUrl, // 用户头像
            authStatus: item.user.authStatus, // 用户身份认证  1 表示歌手
            userName: item.user.nickname, // 用户昵称
            userId: item.user.userId, // 用户id
            vipType: item.user.vipType // 是否开通会员
          }
        }))
        // console.log(this.commentList)
        this.offset++
      } else {
        this.$toast.show('没有更多评论了:(', 1900)
      }
    },
    // 防抖函数
    debounce (fn, delay) {
      let timer = null
      return function () {
        if (timer) {
          clearTimeout(timer)
        }
        timer = setTimeout(fn, delay)
      }
    },
    // 监听滚动事件, 懒加载
    linearScroll () {
      // 滚动条距离顶部的距离
      // console.log('监听到了吗')
      const scrollCom = this.$refs.conscroll
      if (scrollCom) {
        const scrollTop = scrollCom.scrollTop
        // 可视区的高度
        const clientHeight = scrollCom.clientHeight
        // 滚动条可滚动的高度
        const scrollHeight = scrollCom.scrollHeight
        // console.log(scrollTop + clientHeight, scrollHeight)
        // 阈值太小了，就不触发加载数据
        if (scrollTop + clientHeight >= scrollHeight - 1) {
          // console.log(scrollTop + clientHeight - scrollHeight, '是你吧')
          this.$loading.loadingShow()
          this.getCom()
          this.$loading.loadingNo()
        }
      }
    },
    // 后退
    back () {
      this.$router.go(-1)
    },
    // 点赞评论
    async liked (item) {
      // console.log(item.t, item.likedCount)
      if (item.t == 1) {
        // 取消点赞
        item.t = 0
        await likeComment(this.id, item.commentId, item.t, 2, this.$store.state.cookie)
        item.likedCount--
      } else {
        // 点赞
        item.t = 1
        await likeComment(this.id, item.commentId, item.t, 2, this.$store.state.cookie)
        item.likedCount++
      }
    },
    successComment (commentDetail) {
      if (commentDetail.content) {
        // 如果评论成功发送，这里接口有问题，返回码为302重定向
        // 就算显示发布成功，也没有真正发送评论，不会显示
        // console.log('你真的发送了吗', commentDetail)
        this.commentList.unshift({
          content: commentDetail.content, // 评论内容
          likedCount: 0, // 喜欢数量
          time: commentDetail.time, // 发布时间戳
          userImg: commentDetail.avatarUrl, // 用户头像
          userName: commentDetail.nickname, // 用户昵称
          userId: commentDetail.id, // 用户id
          t: commentDetail.t
        })
      }
    },
    // 跳转用户页面
    profile (id) {
      // 跳转路由
      this.$router.push('/Information/' + id)
      // 显示底部播放栏
      this.$store.state.isShowNav = true
    },
    // 分享
    fx () {
      this.showShare = true // 显示分享面板
    }
  },
  created () {
    this.$store.state.isShowNav = false
    this.getCom()
  },
  mounted () {
    const scrollCom = this.$refs.conscroll
    scrollCom.addEventListener('scroll', this.debounce(this.linearScroll, 1000))
  },
  activated () {
    // 隐藏底部导航栏
    this.$store.state.isShowNav = false
  },
  deactivated () {
    this.$store.state.isShowNav = true
    const scrollCom = this.$refs.conscroll
    scrollCom.removeEventListener('scroll', this.linearScroll)
  }
  /*
  destroyed () {
    const scrollCom = this.$refs.conscroll
    scrollCom.removeEventListener('scroll', this.linearScroll)
  }
  */
}
</script>

<style lang="less" scoped>
.infoComment {
  position: relative;
  z-index: 33;
  width: 100%;
  height: 100%;
  background-color: #fff;
  .nav {
    position: fixed;
    z-index: 22;
    top: 0;
    height: 45px;
    width: 100%;
    display: flex;
    color: #fff;
    background-color: rgb(212, 81, 74);
    box-shadow: 0 -0.053333rem 0.133333rem rgba(0, 0, 0, 0.5);
    .left {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .center {
      flex: 7;
      display: flex;
      align-items: center;
      font-size: 0.346667rem;
    }
    .right {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .conscroll {
    position: relative;
    top: 45px;
    background-color: #fff;
    height: calc(100vh - 45px);
    overflow-y: auto;
    box-sizing: border-box;
    .content {
      padding: 0.319574rem 0.319574rem;
      .topbox {
        width: 100%;
        height: 1.065246rem;
        display: flex;
        .userImg {
          flex: 1.2;
          img {
            width: 1.065246rem;
            height: 1.065246rem;
            border-radius: 50%;
            overflow: hidden;
          }
        }
        .userName {
          flex: 5;
          font-size: 0.346205rem;
          display: flex;
          align-items: center;
          .name {
            position: relative;
            height: .533333rem;
            display: flex;
            align-items: center;
            img {
              height: 0.639148rem;
              margin-left: 3px;
              position: absolute;
              right: -.8rem;
            }
          }
          .addtime {
            font-size: 0.319574rem;
            color: #8b8b8b;
            margin-top: -4px;
          }
        }
        .liked {
          flex: 2.2;
          .count {
            color: #8b8b8b;
            margin-top: 0.213049rem;
            font-size: 0.372836rem;
            float: right;
            display: flex;
            align-items: center;
            .iconfont {
              font-size: .32rem;
              margin-left: .106667rem;
            }
            &.likeComment{
            color: var(--red) !important;
            }
          }
        }
      }
      .bottombox {
        width: 100%;
        display: flex;
        padding-bottom: 0.186418rem;
        .left {
          flex: 1.2;
        }
        .right {
          flex: 7;
          font-size: 0.364847rem;
          margin-top: .133333rem;
          padding-bottom: 0.186418rem;
          line-height: .453333rem;
          border-bottom: 1px solid rgb(230, 230, 230);
        }
      }
    }
    .noComment {
      width: 100%;
      height: 100vh;
      text-align: center;
      color: #8b8b8b;
      .text {
        position: relative;
        font-size: 0.4rem;
        top: 45%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
}
</style>
