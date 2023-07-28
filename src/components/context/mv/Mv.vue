<template>
  <div class="Mv">
    <mv-item v-if="mvList.length !== 0" :videoList="mvList"></mv-item>
    <div class="noMv" v-else>
      暂时还没有MV哦
    </div>
  </div>
</template>

<script>
import MvItem from './MvItem.vue'
import { getSingerMv } from '@/api/singer.js'
import { toStringNum, durationTime } from '@/utils/common/common.js'

export default {
  name: 'Mv',
  components: {
    MvItem
  },
  props: ['artistId'],
  data () {
    return {
      mvList: []
    }
  },
  methods: {
    async getMvs () {
      const { data: res } = await getSingerMv(this.artistId)
      console.log(res)
      this.mvList = res.mvs.map(item => {
        return {
          id: item.id, // id
          name: item.name, // 名称
          duration: durationTime(item.duration), // 时长
          playCount: toStringNum(item.playCount), // 播放量
          publishTime: item.publishTime, // 发布时间
          imgurl16v9: item.imgurl16v9 // 封面
        }
      })
    }
  },
  created () {
    this.getMvs()
  }
}
</script>

<style lang="less" scoped>
.Mv {
  width: 100%;
  margin-bottom: 45px;
  background-color: #fff;
  min-height: 12.4rem;
  position: relative;
  z-index: -1;
  .noMv{
    width: 100%;
    min-height: 6.65779rem;
    text-align: center;
    line-height: 6.65779rem;
    font-size: .505992rem;
    color: rgb(141, 139, 139);
  }
}
</style>
