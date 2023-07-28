// 歌手相关的请求
import http from '@/utils/request.js'

// 获取歌手描述
export const getSingerDetail = (id) => {
  // 返回一个promise对象
  return http.get('/artist/desc', {
    params: {
      id
    }
  })
}

// 歌手专辑
export const getSingerAlbum = (id, limit, offset) => {
  return http.get('/artist/album', {
    params: {
      id,
      limit,
      offset
    }
  })
}

// 获取歌手歌曲
export const getSongsList = (id, order, limit, offset) => {
  return http.get('/artist/songs', {
    params: {
      id,
      order,
      limit,
      offset
    }
  })
}

// 获取歌手mv
export const getSingerMv = (id) => {
  return http.get('/artist/mv', {
    params: {
      id
    }
  })
}
