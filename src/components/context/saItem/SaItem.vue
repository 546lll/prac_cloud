<template>
  <!-- 新歌速递和新碟上架（isALbum来控制）的组件 -->
  <div class="sa-item" :class="index != 2 ? 'mbottom' : '' " @click="toPlay">
    <div class="left">
      <img :src="itemDetail.picUrl" alt="" />
    </div>
    <div class="center">
      <div class="name">
        {{ itemDetail.name }}
      </div>
      <div class="desc">
        <span v-for="(item, index) in itemDetail.artists" :key="index">
          {{ item.name }}
        </span>
      </div>
    </div>
    <div class="right">
      <div class="btn" @click="isPlaying=!isPlaying">
        <i class="iconfont icon-shouyebofang" v-if="!isPlaying"></i>
        <svg t="1686106037377" class="icon" v-else viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4048" width="200" height="200"><path d="M499.354012 1023.998a76.287926 76.287926 0 0 1-76.083925-76.082926V76.082926A76.287926 76.287926 0 0 1 499.354012 0a76.287926 76.287926 0 0 1 76.133926 76.082926v871.934148A76.287926 76.287926 0 0 1 499.354012 1023.999z m346.519662 0a76.287926 76.287926 0 0 1-76.081926-76.082926v-340.889667a76.287926 76.287926 0 0 1 76.082926-76.082925 76.287926 76.287926 0 0 1 76.082926 76.083925v340.990667A76.287926 76.287926 0 0 1 845.874674 1023.999z m-692.989323 0A76.287926 76.287926 0 0 1 76.800425 947.915074V415.333594a76.287926 76.287926 0 0 1 76.083926-76.082925 76.287926 76.287926 0 0 1 76.082925 76.082925v532.68348A76.339925 76.339925 0 0 1 152.884351 1023.999z" fill="#d81e05" p-id="4049" class="custom-cursor-on-hover"></path></svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SaItem',
  props: {
    itemDetail: {
      type: Object,
      default: () => {}
    },
    index: {
      type: Number,
      default: 0
    },
    isSaPlaying: {
      type: Boolean,
      default: false
    },
    isAlbum: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isPlaying: false
    }
  },
  methods: {
    // 播放
    toPlay () {
    }
  },
  created () {
    this.isPlaying = this.isSaPlayingisSaPlaying
  }
}
</script>

<style lang="less" scoped>
.sa-item {
  width: 100%;
  height: 1.198402rem;
  display: flex;
  .left {
    flex: 2;
    position: relative;
    img {
      width: 1.198402rem;
      height: 1.198402rem;
      border-radius: 0.133156rem;
    }
  }
  .center {
    flex: 7;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 5px;
    .name {
      width: 5.326232rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      height: 0.45273rem;
      line-height: 0.45273rem;
      font-size: 0.372836rem;
      margin-bottom: 4px;
    }
    .desc {
      height: 0.399467rem;
      line-height: 0.399467rem;
      width: 5.326232rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 0.346205rem;
      color: #8b8b8b;
    }
  }
  .right {
    flex: 1;
    display: flex;
    align-items: center;
    .btn {
      width: 0.665779rem;
      height: 0.665779rem;
      border-radius: 0.665779rem;
      margin: 0 auto;
      border: 1px solid #c0c0c0;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      .iconfont {
        font-size: 0.293333rem;
        color: var(--red);
      }
      .icon {
        width: 85%;
        height: 85%;
      }
    }
  }
  &.mbottom {
    margin-bottom: .166667rem;
  }
}
</style>
