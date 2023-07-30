# prac-cloud2
描述：一个基于vue2全家桶的移动端仿网易云练习项目</br>
技术栈：vue2全家桶、vant、less</br>
接口采用[NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi)</br>
项目参考了[cloudMusic-App](https://github.com/QdabuliuQ/cloudMusic-App)

### 目前实现的功能
首页的展示</br>
二维码登录登出、个人主页的展示</br>
歌单、歌曲播放的详情页的展示，歌单推荐</br>
播放歌曲，进度条实时更新，可以拖动进度条</br>
歌词滚动，切换上下曲（手动/自动）</br>
三种播放模式的切换：单曲循环，随机模式、循环模式</br>
评论详情页的展示</br>
用户主页和动态的展示（仅完成了部分）</br>
搜索组件</br>
使用防抖减少资源的请求次数，懒加载优化项目响应速度</br>

### 遇到的问题
**1.二维码登录**</br>
**流程：** 生成key => 根据key生成二维码 => 轮询获得二维码状态 => 授权成功</br>
请求url要带上时间戳</br>

**2.歌词滚动同步问题**</br>
滚动是通过监听播放器的timeupdate事件实现的</br>
**CD切换成歌词的同步问题**：监听showLyric，通过this.$nextTick保证歌词已经渲染完成(因为有些歌词过长，会占据两行)，计算spansHeight(每个歌词应该移动的距离)，根据播放事件修改歌词列表的top（最开始的高度-spansHeight[index]）</br>
```javascript
watch: {
    // 通过监听showLyric判断歌词有没有被渲染完（通过this.$nextTick，保证dom结构的更新）
    showLyric (cur) {
      if (cur) {
        this.$nextTick(() => {
          this.topHeight = document.getElementsByClassName('LyricListContent')[0].clientHeight * 0.45
          // 如果歌词还未渲染完，就清空spansHeight
          this.spansHeight = []
          if (this.lyricText.length) {
            // 计算出每个歌词需要移动的距离, 前缀和
            const spans = document.getElementsByClassName('itemSpan') // 每句歌词
            let last = 0
            for (let span of spans) {
              this.spansHeight.push(last)
              last = last + (span.clientHeight === 0 ? 0 : (span.clientHeight + 17)) // 如果遇到空歌词，就不动
            }
          }
        })
        // 根据进度条更新歌词的位置
        this.seeked()
      }    
    }
  },
```

**3.同一个哈希地址跳转，组件被复用时(例如歌曲切换时)的数据更新问题**</br>
**原因：** 组件被复用，不会触发created, mounted钩子函数来进行数据的更新</br>
**解决方案**：</br>
+ **不使用key属性**</br>
  **第一种**，通过 **beforeRouteUpdate(to, from, next)** 钩子函数，只要动态参数发生改变，重新获取数据</br>
  ```javascript
  beforeRouteUpdate (to, from, next) {
    if (to.params.sid != from.params.sid) {
      this.getSong()
      next()
    }
  }
  ```
  这种方法有问题，虽然完成了路由的跳转，但是展现的内容是上一个路由的页面</br>

  **第二种**，通过**watch**监听路由的变化进行相关的处理（推荐）</br>
  ```javascript
  watch: {
    '$route': function(to, from) {
      if (to.params.sid != from.params.sid) {
        this.getSong()
      }
    }
  }
  ```
+ **通过key来阻止复用**，保证每一次的key都不一样，这样遇到具有同样哈希地址，组件不会被复用，created，mounted等构造函数会被触发</br>
  ```javascript
  <router-view :key="key"></router-view>

  key() {
    return this.$route.name !== undefined ? this.$route.name + new Date() : this.$route + new Date()
  }
  ```
  使用key的缺点是组件会重复地销毁重建，达不到组件复用的作用</br>

**4.改变某个数组或对象的属性，但是视图没有完成更新**</br>
**原因：** vue可以监测到数组或对象的变化，但对于某个索引位置或某个属性直接赋值的变化，不会触发组件的重新渲染</br>
**解决方法**</br>
**1.** arr/obj = JSON.parse(JSON.stringify(arr/obj)), 采取深拷贝</br>
**2.** this.\$set(obj, property, value)，向响应式对象添加属性，并触发视图更新</br>
**3.** this.$forceUpdate(obj)，强制更新组件</br>

**5.跨域**</br>
使用了代理</br>
```javascript
  //开启代理服务器
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
            '^/api': ''
        }
      }
    }
  }
```

## 操作

### 1.初始化
```
npm install
```
### 2.运行
```
npm run serve
```

