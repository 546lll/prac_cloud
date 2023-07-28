// 与登录相关的接口
import http from '@/utils/request.js'

// 二维码登录流程
// 生成key=>根据key生成二维码=>l获取二维码状态=>获取账号状态

// 生成key
// 参数可以跟时间戳timestamp
export const getQrCodeKey = (timestamp) => {
  return http.get('/login/qr/key', {
    params: {
      timestamp
    }
  })
}

// 根据key生成二维码
export const getQrCode = (key, timestamp, qrimg = true) => {
  return http.get('/login/qr/create', {
    params: {
      key,
      timestamp,
      qrimg
    }
  })
}

// 轮询获取二维码状态
export const checkQrCode = (key, timestamp, noCookie = true) => {
  return http.get('/login/qr/check', {
    params: {
      key,
      timestamp,
      noCookie
    }
  })
}

// 获取登录状态
export const getLoginStatus = (cookie) => {
  return http.post(`/login/status?timestamp=${Date.now()}`, { cookie: cookie })
}

// // 获取账号信息
// export const getAccountInfo = () => {
//   return http.get('/user/account')
// }
