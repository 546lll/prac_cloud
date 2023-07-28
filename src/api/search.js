// 与搜索相关的接口
import http from '@/utils/request.js'

// 获取默认关键词
export const getDefault = () => {
  return http.get('/search/default')
}

// 获取热搜榜简略信息
export const getSearchHot = () => {
  return http.get('/search/hot')
}

// 热搜榜详情
export const getHotDetail = () => {
  return http.get('/search/hot/detail')
}

// 搜索建议
export const searchSuggest = (keywords, type) => {
  return http.get('/search/suggest', {
    params: {
      keywords,
      type
    }
  })
}

// 搜索结果
// 参数： type:
// 1: 单曲,
// 10: 专辑,
// 100: 歌手,
// 1000: 歌单,
// 1002: 用户,
// 1004: MV,
// 1006: 歌词,
// 1009: 电台,
// 1014: 视频,
// 1018:综合,
// 2000:声音
export const searchResult = (keywords, limit, offset, type) => {
  return http.get('/search', {
    params: {
      keywords,
      limit,
      offset,
      type
    }
  })
}
