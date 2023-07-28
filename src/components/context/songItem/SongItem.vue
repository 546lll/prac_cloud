<template>
  <div class="SongItem">
    <div class="item" v-for="(item, index) in songList" :key="index">
      <!-- 歌曲单列 -->
      <div class="itemBox" @click="play(item.id)">
        <!-- 编号 -->
        <div class="index" v-if="shouLeft">
          {{ index + 1 }}
        </div>
        <!-- 歌曲信息 -->
        <div class="left">
          <div class="leftContainer">
            <div class="name">
              {{ item.songName }}
                <!-- 可能是原曲名 -->
                <span v-if="item.yuanc.length !== 0" class="yuanc">
                  ({{ item.yuanc[0] }})
                </span>
            </div>
            <div class="singer">
              <span>{{ GetName(item.singer) }}</span> -{{ ' ' + item.zhuanji }}
            </div>
          </div>
        </div>
        <!-- MV -->
        <div class="mv">
          <i @click.stop="playMv(item.mv)" v-if="item.mv !== 0" class="iconfont icon-mv"></i>
        </div>
        <!-- 更多操作，没有设置这个功能 -->
        <div class="more" @click.stop="moreMenu">
          <i class="iconfont icon-sandian"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SongItem',
  props: {
    songList: {
      type: Array,
      default: () => []
    },
    // 是否展示编号
    shouLeft: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    // 播放歌曲
    play (sid) {
      this.$emit('playSong', sid)
    },
    // 播放mv
    playMv (id) {
    },
    GetName (singer) {
      const names = singer.map(item => item.name)
      return names.join('/')
    }

  }
}
</script>

<style lang="less" scoped>
.item {
  width: 100%;
  height: 1.331558rem;
  border-bottom: 1px solid #e2e2e2ea;
  display: flex;
  align-items: center;
  .itemBox {
    width: 100%;
    height: 1.011984rem;
    position: relative;
    display: flex;
    .index {
      flex: 0.52;
      font-size: 0.399467rem;
      text-align: center;
      margin-right: 0.266312rem;
      line-height: 1.065246rem;
    }
    .left {
      flex: 5;
      align-items: center;
      .name {
        width: 5.858855rem;
        height: .533333rem;
        line-height: .533333rem;
        font-size: 0.399467rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-bottom: .08rem;
      }
      .singer {
        width: 5.866667rem;
        height: .4rem;
        line-height: .4rem;
        color: #868686;
        margin-top: -0.079893rem;
        font-size: .32rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;  //忽略文本中所有的空白、换行符,不会自动换行，只有遇到<br>才会换行
      }
    }
    .mv {
      flex: 0.7;
      display: flex;
      align-items: center;
      justify-content: center;
      .icon-mv {
        font-size: .533333rem;
        color: var(--red);
      }
    }
    .more {
      flex: 0.7;
      display: flex;
      align-items: center;
      justify-content: center;
      .icon-sandian {
        font-size: .48rem;
        color: var(--fontColor);
      }
    }

  }
}
</style>
