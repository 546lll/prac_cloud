<template>
  <div class="DiscoverHotSinger">
    <div class="topTitle">
      <div class="left">热门歌手</div>
      <div class="right">
        <div class="btn" @click="more">查看更多</div>
      </div>
    </div>
    <div class="content">
      <div
        class="item"
        @click="toSinger(item.accountId)"
        v-for="(item, index) in singerList"
        :key="index"
      >
        <div class="img">
          <img class="userimg" :src="item.picUrl" alt="" />
          <div class="tag">
            <i class="iconfont icon-logo"></i>
          </div>
        </div>
        <div class="name">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getHotSinger } from '@/api/discover.js'

export default {
  name: 'DiscoverHotsinger',
  data () {
    return {
      singerList: [],
      offset: 0
    }
  },
  methods: {
    more () {
    },
    toSinger () {

    },
    async getInitialList () {
      const { data: res } = await getHotSinger(9, this.offset * 9)
      // console.log(res)
      this.singerList = res.artists.map(item => {
        return {
          accountId: item.accountId,
          // id: item.id,
          name: item.name,
          picUrl: item.img1v1Url
        }
      })
      // console.log(this.singerList)
    }
  },
  created () {
    this.getInitialList()
  }
}
</script>

<style lang="less" scoped>
.DiscoverHotSinger {
  margin-top: 0.532623rem;
  .topTitle {
    width: 100%;
    display: flex;
    padding: 0 0.319574rem;
    .left {
      flex: 1;
      font-size: 0.426099rem;
      font-weight: 550;
      line-height: 0.665779rem;
    }
    .right {
      flex: 1;
      .btn {
        float: right;
        width: 1.864181rem;
        height: 0.585885rem;
        font-size: 0.319574rem;
        border-radius: 0.585885rem;
        text-align: center;
        line-height: 0.585885rem;
        border: 1px solid #919090;
      }
    }
  }
  .content {
    width: 100%;
    padding: 0.213049rem 0.399467rem 0.266312rem;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .item {
      width: 31%;
      height: 3.195739rem;
      background-color: #fff;
      margin-bottom: 0.186418rem;
      border-radius: 0.266312rem;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.089);
      .img {
        width: 2.130493rem;
        height: 2.130493rem;
        margin: 0.266312rem auto 0.133156rem;
        position: relative;
        .userimg {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          overflow: hidden;
        }
        .tag {
          position: absolute;
          width: 0.45273rem;
          height: 0.45273rem;
          background-color: red;
          border-radius: 50%;
          right: 0.079893rem;
          bottom: 0.079893rem;
          display: flex;
          align-items: center;
          justify-content: center;
          .iconfont {
            color: #fff;
            font-size: .32rem;
            transform: scale(0.9);
          }
        }
      }
      .name {
        width: 2.849534rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: center;
        font-size: 0.372836rem;
      }
    }
  }
}
</style>
