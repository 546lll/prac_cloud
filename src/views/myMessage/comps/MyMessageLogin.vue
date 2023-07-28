<template>
  <div class="box">
    <div  @click="Login" class="MyMessageLogin">
      <i class="iconfont icon-yonghu"></i>
      <span class="text">{{ userName }}</span>
      <i class="iconfont icon-gengduo"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyMessageLogin',
  data () {
    return {
      userName: '未登录'
    }
  },
  methods: {
    Login () {
      this.$emit('toLogin')
    }
  }
}
</script>

<style lang="less" scoped>
.box {
  padding: .213333rem;
  /* background-color: #fff; */
  border-radius: .32rem;
  .MyMessageLogin {
    width: 100%;
    height: 1.2rem;
    display: flex;
    align-items: center;
    position: relative;
    .text {
      font-size: .4rem;
      margin-left: 10px;
      line-height: 1.2rem;
      color: var(--fontColor);
    }
    .icon-gengduo {
      position: absolute;
      right: .133333rem;
      font-size: .4rem;
      color: var(--fontColor);
    }
    .icon-yonghu{
      margin-left: .133333rem;
      position: relative;
      top: .026667rem;
      color: var(--red);
      font-size: 1.2rem;
    }
  }
}
</style>
