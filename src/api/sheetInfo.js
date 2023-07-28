// 获取歌单详情
import http from '@/utils/request.js'
// 歌单详情
export const getPlayDetial = (id) => {
  return http.get('/playlist/detail', {
    params: {
      id
    }
  })
}
// 歌单评论
// 参数：id-歌单id；limit:分页数量;offset：偏移量
export const getSheetComment = (id, limit = 25, offset) => {
  return http.get('/comment/playlist', {
    params: {
      id,
      limit,
      offset
    }
  })
}
