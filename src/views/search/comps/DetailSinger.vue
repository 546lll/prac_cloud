<template>
  <div class="DetailSinger" ref="box">
    <div
      class="item"
      @click="toSinger(item.accountId, item.id)"
      v-for="(item, index) in artistsList"
      :key="index"
    >
      <div class="left">
        <img :src="item.img1v1Url" alt="" />
      </div>
      <div class="center">
        {{ item.name
        }}<span class="a1" v-if="item.trans !== ' '">({{ item.trans }})</span>
      </div>
      <div class="right">
        <div v-if="item.accountId" class="box">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { searchResult } from '@/api/search.js'

export default {
  name: 'DetailSinger',
  props: ['keywords'],
  data () {
    return {
      offset: 0,
      artistsList: [], // 歌手数组
      more: true
    }
  },
  methods: {
    // 跳转歌手个人主页
    toSinger (accountId, id) {
      if (accountId !== null) {
        this.$router.push('/Information/' + accountId)
      } else {
        this.$router.push('/Information/' + id)
      }
    },
    // 获取数据
    async getSingers () {
      if (this.more) {
        const { data: res } = await searchResult(this.keywords, 30, this.offset * 30, 100)
        if (res.result.artists) {
          this.artistsList.push(...res.result.artists.map(item => {
            return {
              img1v1Url: item.img1v1Url,
              id: item.id,
              accountId: item.accountId || null,
              name: item.name,
              trans: item.trans || item.alias[0] || ' '
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
          this.getSingers()
          this.$loading.loadingNo()
        }, 1000)
      }
    }
  },
  created () {
    this.$loading.loadingShow()
    this.getSingers()
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
.DetailSinger {
  width: 100%;
  background-color: #fff;
  height: 100%;
  padding: 0.266312rem 0.372836rem;
  overflow-y: scroll;
  .item {
    width: 100%;
    height: 1.198402rem;
    display: flex;
    margin-bottom: 0.399467rem;
    .left {
      flex: 1.5;
      img {
        width: 1.198402rem;
        height: 1.198402rem;
        border-radius: 50%;
      }
    }
    .center {
      flex: 6.5;
      line-height: 1.198402rem;
      font-size: 0.399467rem;
      text-indent: 0.133156rem;
      .a1 {
        color: rgb(146, 146, 146);
      }
    }
    .right {
      flex: 2;
      font-size: 0.319574rem;
      display: flex;
      align-items: center;
    }
  }
}
</style>
