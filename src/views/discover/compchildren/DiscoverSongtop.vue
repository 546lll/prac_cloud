<template>
  <div class="discover-songtop">
    <div class="topTitle">
      <div class="left">新歌速递</div>
      <div class="right">
        <div class="btn" @click="more">查看更多</div>
      </div>
    </div>
    <el-carousel
      class="carousel"
      :interval="4000"
      type="card"
      arrow="never"
      :autoplay="false"
      indicator-position="none"
      height="4.926764rem"
    >
      <!-- 四大板块 -->
      <el-carousel-item class="items" v-for="(item, index) in songList" :key="index">
        <!-- 三首歌曲 -->
        <div class="songsBox">
          <sa-item
          v-for="(song, i) in item"
          :key="i"
          :itemDetail='song'
          :index='i'></sa-item>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { getSongsTop } from '@/api/discover.js'
import SaItem from '@/components/context/saItem/SaItem.vue'
export default {
  name: 'DiscoverSongtop',
  components: {
    SaItem
  },
  data () {
    return {
      songList: []
    }
  },
  methods: {
    // 查看更多
    more () {

    },
    // 获取新歌速递名单
    async getInitialList () {
      const types = [7, 96, 8, 16] // 分别对应华语、欧美、日本、韩国
      for (const type of types) {
        const { data: res } = await getSongsTop(type)
        const list = res.data.slice(0, 3).map(item => {
          return {
            id: item.id, // 歌曲id
            picUrl: item.album.picUrl, // 歌曲封面
            name: item.name, // 歌曲名称
            artists: item.artists // 演唱者,一个数组
          }
        })
        this.songList.push(list)
      }
    }
  },
  created () {
    this.getInitialList()
  }
}
</script>

<style lang="less" scoped>
.discover-songtop {
  width: 100%;
  margin-top: 0.266312rem;
  .topTitle {
    display: flex;
    padding: 0 0.319574rem;
    .left {
      flex: 1;
      font-size: 0.426099rem;
      font-weight: 550;
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
  .carousel {
    margin-top: .266312rem;
    .items {
      margin-left: -1.491345rem;
      width: 80%;
      height: 4.660453rem;
      background-color: #fff;
      padding: .266312rem .213049rem;
      border-radius: .213049rem;
      box-shadow: 2px 2px 10px rgba(131, 131, 131, 0.5);
      display: flex;
      align-items: center;
      .songsBox{
        width: 100%;
      }
    }
  }
}
</style>
