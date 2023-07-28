<template>
  <div class="discover-album">
    <div class="topTitle">
      <div class="left">新碟上架</div>
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
      <el-carousel-item class="items" v-for="(item, index) in albumList" :key="index">
        <!-- 三首歌曲 -->
        <div class="songsBox">
          <sa-item
          :isAlbum="true"
          v-for="(album, i) in item"
          :key="i"
          :itemDetail='album'
          :index='i'></sa-item>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { getNewAlbum } from '@/api/discover.js'
import SaItem from '@/components/context/saItem/SaItem.vue'

export default {
  name: 'DiscoverAlbum',
  data () {
    return {
      offset: 0,
      albumList: []
    }
  },
  components: {
    SaItem
  },
  methods: {
    more () {

    },
    async getInintialList () {
      const types = ['ZH', 'EA', 'KR', 'JP'] // 分别对应华语、欧美、日本、韩国
      for (const type of types) {
        const { data: res } = await getNewAlbum(3, this.offset * 3, type, 'new')
        const list = res.monthData.slice(0, 3).map(item => {
          return {
            id: item.id, // 歌曲id
            picUrl: item.picUrl, // 歌曲封面
            name: item.name, // 歌曲名称
            artists: item.artists // 演唱者,一个数组
          }
        })
        this.albumList.push(list)
      }
    }
  },
  created () {
    this.getInintialList()
  }
}
</script>

<style lang="less" scoped>
.discover-album {
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
