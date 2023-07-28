<template>
  <div>
    <navbar id="navbar">
      <template #left>
        <div id="leftbox">
          <i class="iconfont icon-hanbao" @click='leftPopup'></i>
        </div>
      </template>
      <template #center>
        <div id="centerBox">
          <span
            class='navbarTitle'
            v-for='(item, index) in titleList'
            :key='index'
            @click='itemClick(index)'
            :class="{ activeTitle: index === currentIndex }">
            {{ item }}
          </span>
        </div>
      </template>
      <template #right>
        <div id="rightbox" @click="toSearch">
          <i class="iconfont icon-sousuo" ></i>
        </div>
      </template>
    </navbar>
  </div>
</template>

<script>
import navbar from '@/components/common/navbar/NavBar.vue'

export default {
  name: 'MusicNavbar',
  components: {
    navbar
  },
  data () {
    return {
      titleList: ['我的', '发现', '云村', '视频'],
      currentIndex: 1, // 初始化在发现
      // 路由映射关系
      index_route: {
        0: '/myMessage',
        1: '/discover',
        2: '/cloudVillage',
        3: '/video'
      },
      route_index: {}
    }
  },
  methods: {
    // 左边的菜单选项,采用事件总线传递事件
    leftPopup () {
      this.$EventBus.$emit('openPopup', () => {})
    },
    // 右边的搜索选项
    toSearch () {
      this.$router.push('/discover/search')
    },
    // 中间点击的时候切换
    itemClick (index) {
      if (index !== this.currentIndex) {
        this.currentIndex = index
        this.$router.push(this.index_route['' + index]).catch(err => console.log(err))
      }
    }
  },
  // 监听路由的变化,切换到合适的界面
  watch: {
    $route: {
      handler (val, oldVal) {
        if (this.currentIndex != this.route_index[val.fullPath]) {
          // 将当前激活的菜单子选项选中
          this.currentIndex = Number(this.route_index[this.$route.fullPath])
        }
      },
      // 深度监听
      deep: true
    }
  },
  created () {
    // 创建路由与哈希地址的映射关系
    this.route_index = Object.fromEntries(Object.entries(this.index_route).map(([key, value]) => [value, key]))
    // 将当前激活的菜单子选项选中
    this.currentIndex = Number(this.route_index[this.$route.fullPath])
  }
}
</script>

<style lang="less" scoped>
#navbar {
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.4) !important;

  #leftbox,
  #rightbox {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  #centerBox {
    height: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    .navbarTitle {
      font-size: 15px;
      height: 28px;
      line-height: 30px;
      display: flex;
      padding: 0 7px;
      color: rgb(116, 116, 116);
      &.activeTitle {
        font-size: 18px;
        color: #000;
        line-height: 28px;
      }
    }
  }
}
</style>
