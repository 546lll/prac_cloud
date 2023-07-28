<template>
  <!-- 播放导航栏 -->
  <div class="SheetNav">
    <i class="iconfont icon-gequbofang" @click="playAll"></i>
    <span>
      播放全部<span class="a">(共{{ trackCount }}首)</span>
    </span>
  </div>
</template>

<script>
export default {
  name: 'SheetNav',
  props: ['trackCount'],
  methods: {
    playAll () {
      this.$emit('playAll')
    }
  }
}
</script>

<style lang="less" scoped>
.SheetNav {
  /* position: sticky;
  top: 42.5px; */
  width: 100%;
  height: 1.198402rem;
  background-color: #fff;
  border-top-left-radius: .4rem;
  border-top-right-radius: .4rem;
  line-height: 1.198402rem;
  font-size: .373333rem;
  display: flex;
  align-items: center;
  .iconfont {
    font-size: .533333rem;
    color: var(--red);
    margin-left: .266667rem;
    margin-right: .133333rem;
  }
  span {
    font-size: 0.45273rem;
    padding-left: 2px;

    .a {
      color: rgb(143, 143, 143);
      font-size: 0.346205rem;
    }
  }
}
</style>
