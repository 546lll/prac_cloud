// 操作评论
import http from '@/utils/request.js'

// 发送评论或删除评论
export const getComment = (t, type, id, content, cookie, commentId) => {
  return http.get('/comment', {
    params: {
      t, // 1.发送 2.回复
      type, // 0-歌曲， 1-mv, 2-歌单， 3-专辑，4-电台，5-视频，6-动态
      id, // 资源的id，如给动态发送或删除评论不需要id，只需要threadId
      content, // 要发送的内容
      cookie,
      commentId // 回复的评论id
    }
  })
}
// 点赞评论
export const likeComment = (id, cid, t, type, cookie) => {
  return http.get('/comment/like', {
    params: {
      id, // 资源id
      cid, // 评论id
      t, // 是否点赞， 1为点赞，0为取消点赞
      type, // 0-歌曲， 1-mv, 2-歌单， 3-专辑，4-电台节目，5-视频，6-动态 7-电台
      cookie
    }
  })
}
// 发送动态评论
export const getDComment = (t, type, threadId, content, cookie) => {
  return http.get('/comment', {
    params: {
      t, // 1.发送 2.回复
      type, // 0-歌曲， 1-mv, 2-歌单， 3-专辑，4-电台，5-视频，6-动态
      threadId, // 资源的id，如给动态发送或删除评论不需要id，只需要threadId
      content, // 要发送的内容
      cookie
    }
  })
}
