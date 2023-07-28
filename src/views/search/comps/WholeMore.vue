<template>
  <div class="WholeMore">
    <div>{{ moreText }}</div>
    <i class="iconfont icon-gengduo"></i>
  </div>
</template>

<script>
export default {
  name: 'WholeMore',
  props: {
    moreText: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="less" scoped>
.WholeMore {
  width: 100%;
  height: 1.065246rem;
  font-size: 0.372836rem;
  display: flex;
  align-items: center;
  justify-content: center;
  .iconfont {
    font-size: .346667rem;
    position: relative;
    top: .026667rem;
    margin-left: .133333rem;
  }
}
</style>
