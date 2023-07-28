// 与动态相关的请求
import http from '@/utils/request.js'

// 动态评论
export const getDynamicCom = (threadId) => {
  // 返回一个promise对象
  return http.get('/comment/event', {
    params: {
      threadId
    }
  })
}
