// 获取歌曲信息
import http from '@/utils/request.js'

// 获取歌曲详情,可传入多个歌曲id，用逗号分隔
export const getSongDetial = (ids, limit, offset) => {
  return http.get('/song/detail', {
    params: {
      ids,
      limit,
      offset
    }
  })
}

// 获取歌曲url,可以传入多个id，用逗号分隔
// level: standard, higher, exhigh, lossless, hires, jyeffect, sky, jymaster
export const getSongUrl = (id, level = 'standard') => {
  return http.get('/song/url/v1', {
    params: {
      id,
      level
    }
  })
}

// 获取歌词
export const getLyric = (id) => {
  return http.get('/lyric', {
    params: {
      id
    }
  })
}

// 获取最近播放列表
// type=1, weekData, type=0 时返回 allData
export const getPlayList = (uid, type = 0) => {
  return http.get('/user/record', {
    params: {
      uid,
      type
    }
  })
}

// 获取歌曲评论
export const getComment = (id, limit = 50, offset) => {
  return http.get('/comment/music', {
    params: {
      id,
      limit,
      offset
    }
  })
}
