import http from '@/utils/request.js'

// 发现组件的所有网络请求
// 首页的轮播图请求
export const getBanner = () => {
  // 返回一个promise对象
  return http.get('/banner')
}

// 热门歌单
// 参数：order:'hot'或'new'
// cat: 曲风
// limit：歌单数量
// offset: 便宜数量
export const getHotSheet = (order, cat = '全部', limit, offset) => {
  return http.get('/top/playlist',
    {
      params: {
        order,
        cat,
        limit,
        offset
      }
    })
}

// 可获取歌单分类列表
export const getSheetTags = () => {
  return http.get('/playlist/hot')
}

// 新歌速递
// type:0-全部；7-华语；96-欧美；8-日本；16-韩国
export const getSongsTop = (type) => {
  return http.get('/top/song',
    {
      params: {
        type
      }
    })
}

// 获取电台
export const getProgram = () => {
  return http.get('/program/recommend')
}

// 获取最新MV
// area-地区， limit:数量，默认30
export const getNewMv = (area, limit) => {
  return http.get('/mv/first',
    {
      params: {
        area,
        limit
      }
    })
}

// 新碟上架
// area:ALL-全部；ZH-华语，EA:欧美，KR:韩国，JP:日本
// type: new-全部；hot:热门；默认new
// year,默认本年
// month: 月
// offset:用于分页，默认0
// limit: 返回数量
export const getNewAlbum = (limit, offset, area, type) => {
  return http.get('/top/album',
    {
      params: {
        limit,
        offset,
        area,
        type
      }
    })
}

// 获取热门歌手
// offset-偏移数量，默认0，limit: 取出数量，默认50
export const getHotSinger = (limit, offset) => {
  return http.get('/top/artists',
    {
      params: {
        limit,
        offset
      }
    })
}
