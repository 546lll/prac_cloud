<template>
  <div class="moreSheet">
    <menu-nav class="nav" navTitle="歌单广场"></menu-nav>
    <scroll-nav
      class="snav"
      @tabToggle="tabToggle"
      :itemList="tagsList"
      :firstIndex="0">
    </scroll-nav>
    <div class="content" ref="content">
      <sheet-item
        class="sheetitem"
        @click.native="toClick(item.id)"
        v-for="(item, index) in sheetDetail"
        :key="index"
        :sheetItem="item"
        :isSheet="true"
        :showImg="false"
      ></sheet-item>
    </div>
  </div>
</template>

<script>
import MenuNav from '@/components/context/menuNav/MenuNav.vue'
import ScrollNav from '@/components/context/scrollNav/ScrollNav.vue'
import SheetItem from '@/components/context/sheetItem/SheetItem.vue'

import { toStringNum } from '@/utils/common/common.js'
import { getHotSheet, getSheetTags } from '@/api/discover.js'

export default {
  name: 'MoreSheet',
  data () {
    return {
      tagsList: ['全部'],
      // 索引
      index: 0,
      sheetDetail: [], // 歌单列表
      more: true, // 是否有更多数据
      offset: 0 // 偏移数量
    }
  },
  components: {
    MenuNav,
    ScrollNav,
    SheetItem
  },
  methods: {
    tabToggle (index) {
      if (this.index !== index) {
        this.offset = 0
        this.sheetDetail = [] // 清空数据
        this.getSheet(index)
      }
      this.index = index
    },

    // 歌单详情页跳转
    toClick (id) {
      this.$router.push('/playDetail/' + id + '&' + false)
    },
    // 获取歌单
    getSheet (index) {
      if (this.more) {
        getHotSheet('hot', this.tagsList[index], 21, this.offset * 21).then(
          (res) => {
            this.more = res.data.more
            for (const item of res.data.playlists) {
              this.sheetDetail.push({
                id: item.id, // 歌单id
                rcmdtext: item.name, // 歌单名称
                picUrl: item.coverImgUrl, // 封面
                playCount: toStringNum(item.playCount) // 播放量
              })
            }
            this.$loading.loadingNo()
            this.offset = this.offset + 1
          }
        )
      } else {
        this.$toast.show('没有更多歌单啦', 1900)
      }
    },
    // 获取歌单标签
    async getInintialTags () {
      const { data: res } = await getSheetTags()
      this.tagsList.push(...res.tags.map(item => item.name))
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
      const cont = this.$refs.content
      const scrollTop = cont.scrollTop
      // 可视区的高度
      const clientHeight = cont.clientHeight
      // 滚动条可滚动的高度
      const scrollHeight = cont.scrollHeight
      if (scrollTop + clientHeight >= scrollHeight - 1) {
        this.$loading.loadingShow()
        this.getSheet(this.index)
      }
      // const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      // // 可视区的高度
      // const clientHeight = document.documentElement.clientHeight || document.body.clientHeight
      // // 滚动条可滚动的高度
      // const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
      // if (scrollTop + clientHeight >= scrollHeight - 0.5) {
      //   console.log(scrollTop + clientHeight - scrollHeight, '是你吧')
      //   this.$loading.loadingShow()
      //   this.getSheet(this.index)
      //   console.log(this.offset)
      // }
    }
  },
  created () {
    // 获取歌单标签
    this.getInintialTags()
    // 获取歌单
    // 获取全部歌单数据
    this.getSheet()
  },
  mounted () {
    // 绑定滚动事件
    const cont = this.$refs.content
    cont.addEventListener('scroll', this.debounce(this.linearScroll, 1000))
  },
  deactivated () {
    const cont = this.$refs.content
    cont.removeEventListener('scroll', this.linearScroll)
  }

}
</script>

<style lang="less" scoped>
.moreSheet {
  position: relative;
  touch-action: none;
  width: 100%;
  background-color: #fff;
  overflow: hidden;
  height: 100vh;
  .nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
  }
  .snav {
    position: fixed;
    top: 44px;
    z-index: 10;
    /* margin-top: 44px; */
  }
  .content {
    position: absolute;
    top: 0;
    bottom: 0;
    padding: 0.266312rem 0.319574rem;
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    margin: 2.396804rem 0 1.331558rem;
    // min-height: 18.315579rem;
    background-color: #fff;
    overflow-y: auto;
    .sheetitem {
      width: 30%;
      margin-bottom: 0.266312rem;
    }
  }
}
</style>
