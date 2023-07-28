<template>
 <div class="MyMessageMenu">
    <div class="menu">
      <div class="top">
        <div class="box1">
          <div class="icon iconbox">
            <i class="iconfont menuIcon icon-xiazai2"></i>
          </div>
          <div class="text">本地音乐</div>
        </div>
        <div class="box1" @click="myDisk">
          <div class="icon iconbox">
            <i class="iconfont menuIcon icon-yunpan"></i>
          </div>
          <div class="text">云盘</div>
        </div>
        <div class="box1">
          <div class="icon iconbox">
            <i class="iconfont menuIcon icon-yigou"></i>
          </div>
          <div class="text">已购</div>
        </div>
        <div class="box1" @click="myPlayed">
          <div class="icon iconbox">
            <i class="iconfont menuIcon icon-bofang"></i>
          </div>
          <div class="text">最近播放</div>
        </div>
      </div>
      <div class="bottom">
        <div class="box2" @click="myFollow">
          <div class="icon iconbox">
            <i class="iconfont menuIcon icon-guanzhu"></i>
          </div>
          <div class="text">我的关注</div>
        </div>
        <div class="box2" @click="myCollection">
          <div class="icon iconbox">
            <i class="iconfont menuIcon icon-shoucang"></i>
          </div>
          <div class="text">收藏和赞</div>
        </div>
        <div class="box2" @click="myRadioStation">
          <div class="icon iconbox">
            <i class="iconfont menuIcon icon-diantai"></i>
          </div>
          <div class="text">我的电台</div>
        </div>
        <div class="box2">
          <div class="icon iconbox">
            <i class="iconfont moreIcon menuIcon icon-add"></i>
          </div>
          <div class="text">音乐应用</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyMessageMenu',
  methods: {
    // 云盘
    myDisk () {},
    // 我的最近播放
    myPlayed () {},
    // 我的关注
    myFollow () {},
    // 收藏与赞
    myCollection () {},
    // 电台节目
    myRadioStation () {}
  }
}
</script>

<style lang="less" scoped>
.MyMessageMenu {
  /* width: 100%; */
  height: 3.994674rem;
  border-radius: 0.213049rem;
  margin-top: 0.266312rem;
  overflow: hidden;
  font-size: 0.346205rem;
  text-align: center;
  background-color: #fff;
  padding: 0.133156rem;
  box-shadow: var(--boxshaow);
  display: flex;
  align-items: center;
  justify-content: center;
  .menu{
    width: 97%;
    .top {
      width: 100%;
      height: 50%;
      display: flex;
      margin-top: 0.186418rem;
      .box1 {
        flex: 1;
        position: relative;
        height: 1.517976rem;
      }
    }
    .bottom {
      width: 100%;
      height: 50%;
      display: flex;
      margin-top: 0.399467rem;
      .box2 {
        flex: 1;
        position: relative;
        height: 1.438083rem;
      }
    }
    .icon {
      width: 100%;
      height: 0.798935rem;
      display: flex;
      align-items: center;
      justify-content: center;
      .menuIcon{
        font-size: .72rem;
        color: var(--red);
      }
      &.moreIcon{
        color: #b6b6b6 !important;
      }
    }
    .text {
      width: 100%;
      text-align: center;
      font-size: .32rem;
      margin-top: .08rem;
      color: var(--fontColor);
    }
  }
}
</style>
