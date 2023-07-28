<template>
  <div class="tab-control">
    <div
      class="tab-control-item"
      v-for="(item, index) in title"
      :key="index"
      :class="{ activeColor: index === isShow }"
      @click="tabClick(index)"
    >
      <!-- 绑定 class 属性默认是第一个选项卡为高亮 -->
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabControl',
  data() {
    return {
      isShow: 0 // 默认0
    }
  },
  methods: {
    // 修改 isShow 为对应的index
    tabClick(index) {
      this.isShow = index
      // 子传父
      this.$emit('tabGoods', index)
    },
  },
  props: ['title'] // 标题
}
</script>
<style scoped lang="less">
.tab-control {
  display: flex;
  text-align: center;
  height: 0.932091rem;
  line-height: 0.932091rem;
  font-size: .373333rem;
  .tab-control-item {
    flex: 1;
    span {
      padding: 0.133156rem 0.133156rem 0.079893rem;
    }
    &.activeColor {
      color: red;
      span {
        border-bottom: 2px solid red;
      }
    }
  }
  
}
</style>
