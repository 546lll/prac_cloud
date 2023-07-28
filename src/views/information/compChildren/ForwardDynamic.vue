<template>
  <div class="forwardDynamic">
    <!-- 头像 -->
    <div class="left">
      <div class="userImg">
        <img :src="userImg" alt="" />
      </div>
    </div>
    <!-- 分享信息 -->
    <div class="right">
      <!-- 标题 -->
      <div class="title">
        <span>{{ nickName }} </span>转发：
      </div>
      <!-- 发布时间 -->
      <div class="time">{{ time | getTime }}</div>
      <!-- 发布内容 -->
      <div class="content" v-if="events.msg != ''">{{ events.msg }}</div>
      <!-- 转发内容 -->
      <div class="forwardBox">
        <div class="topbox">
          <span class="blueActive">{{ '@' + events.event.user.nickname + '：'}}</span>
          {{ jsonDetail.msg }}
        </div>
        <!-- 图片内容 -->
        <div class="pics" v-if="events.event.pics.length">
          <div class="item" @click="showPic" v-for="(item, index) in events.event.pics" :key="index">
            <img :src="item.format == 'gif' ? item.pcSquareUrl : item.originUrl" alt="" />
          </div>
        </div>
        <!-- 涉及的歌曲 -->
        <div class="infoForward" @click="toPlay(jsonDetail.song.id)">
          <div class="info">
            <div class="infoleft">
                <img :src="jsonDetail.song.album.img80x80" alt="">
              </div>
            <div class="inforight">
              <div class="infoDetail">
                <!-- 歌名 -->
                <div class="name">{{jsonDetail.song.name}}</div>
                <!-- 歌手 -->
                <div class="singer">
                  <span v-for="(item,index) in jsonDetail.song.artists" :key="index">
                    {{item.name }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 底部动态数据 -->
      <events-count
       @sComment="sComment"
       :commentLength="commentLength"
       :likedCount="likedCount"
       :shareCount="shareCount">
      </events-count>
    </div>
  </div>
</template>

<script>
import EventsCount from './EventsCount.vue'

export default {
  name: 'ForwardDynamic',
  props: [
    'userImg',
    'nickName',
    'events',
    'time',
    'commentLength',
    'likedCount',
    'shareCount',
    'pics',
    'threadId'
  ],
  components: {
    EventsCount
  },
  data () {
    return {
      jsonDetail: null,
      show: false,
      images: [] // 图片数组
    }
  },
  methods: {
    sComment () {
      this.$store.state.commentId = this.threadId
    },
    toPlay (sid) {
      this.$router.push('/playSong/' + sid)
    }
  },
  created () {
    this.jsonDetail = JSON.parse(this.events.event.json)
    this.images = this.events.event.pics.map(item => item.originUrl)
    console.log(this.userImg)
  }
}
</script>

<style lang="less" scoped>

.forwardDynamic {
  width: 100%;
  display: flex;
  padding-bottom: 0.399467rem;
  margin-top: 0.399467rem;
  border-bottom: 1px solid #e6e6e6;
  .left {
    flex: 1.5;
    .userImg {
      width: 1.065246rem;
      height: 1.065246rem;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .right {
    flex: 8.5;
    .title {
      font-size: 0.399467rem;
      color: #000;
      span {
        font-size: 0.399467rem;
        color: rgb(34, 110, 197);
      }
    }
    .time {
      font-size: 0.346205rem;
      color: rgb(158, 158, 158);
    }
    .content {
      font-size: 15px;
      margin-top: 0.213049rem;
    }
    .forwardBox{
      width: 100%;
      padding: .213049rem;
      background-color: #e6e6e6;
      border-radius: .213049rem;
      margin-top: 0.213049rem;
      .topbox{
          font-size: 0.399467rem;
        .blueActive {
          font-size: 0.399467rem;
          color: #226ec5;
        }
      }
      .pics{
        width: 100%;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        margin-top: 0.213049rem;
        .item{
          width: 32%;
          height: 2.396804rem;
          border-radius: 5px;
          overflow: hidden;
          margin-bottom: .186418rem;
          img{
            width: 100%;
            height: 100%;
          }
        }
      }
      .infoForward{
        width: 100%;
        height: 1.331558rem;
        background-color: #fff;
        border-radius: .133156rem;
        display: flex;
        align-items: center;
        .info{
          width: 95%;
          height: 80%;
          margin: auto;
          display: flex;
          .infoleft{
            flex: 2;
            img{
              width: 1.065246rem;
              height: 1.065246rem;
              border-radius: .133156rem;
            }
          }
          .inforight{
            flex: 8;
            display: flex;
            align-items: center;
            .name{
              width: 5.592543rem;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              font-size: .372836rem;
            }
            .singer{
              width: 5.592543rem;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              font-size: .319574rem;
              color: rgb(139, 139, 139);
            }
          }
        }
      }
    }

  }
}
</style>
