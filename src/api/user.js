// 用户相关的请求
import http from '@/utils/request.js'

// 获取用户基本信息
export const getUserDetail = (uid) => {
  // 返回一个promise对象
  return http.get('/user/detail', {
    params: {
      uid
    }
  })
}

// 获取用户歌单
// 可选参数还有limit(默认30)和offset
export const getUserPlayList = (uid) => {
  return http.get('/user/playlist', {
    params: {
      uid
    }
  })
}

// 获取用户动态
// 输入参数：limit:默认30
// lasttime:默认-1，传入上次返回结果的lasttime
export const getUserEvent = (uid, limit, lasttime) => {
  return http.get('/user/event', {
    params: {
      uid,
      limit,
      lasttime
    }
  })
}

// 获取用户关注列表
export const getUserFollow = (uid) => {
  return http.get('/user/follows', {
    params: {
      uid
    }
  })
}

// 获取用户粉丝
export const getUserFans = (uid, limit, lasttime) => {
  return http.get('/user/followeds', {
    params: {
      uid,
      limit,
      lasttime
    }
  })
}
