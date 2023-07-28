<template>
  <div class="album">
    <div
      class="albumItem"
      @click="showAlbum(item.id)"
      v-for="(item, index) in albumList"
      :key="index"
    >
      <div class="left">
        <img v-lazy="item.picUrl" alt="" />
        <div class="bgcImg" v-show="item.showImg">
          <img src="https://img.coolcr.cn/2021/03/08/2b7d972a3ad72.png" alt="" />
        </div>
      </div>
      <div class="right">
        <div class="content">
          <div class="title">
            {{ item.name }}
            <span class="sp" v-if="item.alias.length !== 0"
              >({{ item.alias[0] }})</span
            >
          </div>
          <div class="detail">
            {{ item.publishTime | getTime("YYYY.MM.DD") }}
            歌曲{{ item.size }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getSingerAlbum } from '@/api/singer.js'

export default {
  name: 'Songs',
  props: ['artistId'],
  data () {
    return {
      offset: 0,
      more: true,
      albumList: []
    }
  },
  methods: {
    async getAlbums () {
      if (this.more) {
        const { data: res } = await getSingerAlbum(this.artistId, 50, this.offset)
        this.albumList = res.hotAlbums.map(item => {
          return {
            name: item.name, // 专辑名称
            id: item.id, // id
            picUrl: item.picUrl, // 封面
            publishTime: item.publishTime, // 发布时间
            size: item.size, // 专辑歌曲数量
            alias: item.alias, // 专辑介绍
            showImg: false // 图片显示
          }
        })
      }
    },
    // 跳转到专辑详情页
    showAlbum (id) {
      this.$router.push('/playDetail/' + id + '&' + true)
    }
  },
  created () {
    this.getAlbums()
  }
}
</script>

<style lang="less" scoped>
.album {
  padding: 0 15px 15px;
  margin-bottom: 45px;
  background-color: #fff;
  min-height: 12.4rem;
  position: relative;
  z-index: -1;
  .albumItem {
    width: 100%;
    height: 1.331558rem;
    display: flex;
    margin-bottom: 0.213049rem;
    position: relative;
    .left {
      flex: 1.8;
      img {
        width: 1.331558rem;
        height: 1.331558rem;
        border-radius: 0.133156rem;
      }
      .bgcImg {
        width: 1.331558rem;
        height: 1.331558rem;
        position: absolute;
        z-index: -1;
        top: 0;
        left: 0.266312rem;
      }
    }
    .right {
      flex: 8.2;
      display: flex;
      align-items: center;
      .content {
        margin-left: 0.266312rem;
        .title {
          width: 6.65779rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          height: 0.479361rem;
          line-height: 0.479361rem;
          font-size: 0.399467rem;
          .sp {
            color: #979797;
          }
        }
        .detail {
          height: 0.479361rem;
          line-height: 0.479361rem;
          font-size: 0.319574rem;
          color: #979797;
        }
      }
    }
  }
}
</style>
