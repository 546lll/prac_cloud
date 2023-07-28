<template>
  <div class="TabNav">
    <div
     @click="tabItem(index)"
     class="item"
     v-for="(item, index) in itemList"
     :key="index">
      <span class="spItem" :class="{ active: index == tabIndex}">
        {{ item }}
      </span>
    </div>
    <!-- 滑动条 -->
    <span class="bottomBor"></span>
  </div>
</template>

<script>
import { Move } from '@/utils/common/tool.js' // 移动方法

export default {
  name: 'TabNav',
  props: {
    itemList: {
      type: Array,
      default: () => []
    },
    firstIndex: { // 页面渲染完制定的索引
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      tabIndex: 0
    }
  },
  methods: {
    tabItem (index) {
      // 向父组件传递激活的索引
      this.$emit('tabToggle', index)
      this.tabIndex = index
      const span = document.getElementsByClassName('spItem')[index]
      const bottomeBor = document.getElementsByClassName('bottomBor')[0]
      bottomeBor.style.width = span.offsetWidth + 'px'
      Move(bottomeBor, 'left', span.offsetLeft, 35)
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.tabIndex = this.firstIndex
      const span = document.getElementsByClassName('spItem')[this.firstIndex]
      const bottomeBor = document.getElementsByClassName('bottomBor')[0]
      Move(bottomeBor, 'left', span.offsetLeft, 35)
    })
  }
}
</script>

<style lang="less" scoped>
.TabNav{
  width: 100%;
  height: 1.171771rem;
  background-color: #fff;
  box-sizing: border-box;
  border-bottom: 1px solid #e6e6e6;
  display: flex;
  position: relative;
  box-sizing: border-box;
  .item{
    flex: 1;
    line-height: 1.171771rem;
    text-align: center;
    font-size: .372836rem;
    span{
      padding: 5px 10px 10px;
      &.active{
        color: #e93d34;
      }
    }
  }
  .bottomBor{
    width: 48px;
    height: 2px;
    background-color: #da231b;
    position: absolute;
    bottom: 0;
    left: 163px;
  }
}
</style>
