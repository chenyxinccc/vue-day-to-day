<template>
  <div>
    <el-button type="success" @click="mockData">mockData</el-button>
  </div>
</template>
<script>
import loginPng from '../assets/images/logo.png'

export default {
  name: 'axiosOrmock',
  methods: {
    mockData () {
      this.$http.post('/goods/list').then((data) => {
        this.notifyMe(data.data.join(' '))
      })
    },
    notifyMe (message) {
      // 先检查浏览器是否支持
      if (!('Notification' in window)) {
        console.log('该浏览器不支持桌面通知')
      } else if (Notification.permission === 'granted') {
        // 检查用户是否同意接受通知
        /* eslint-disable no-new */
        new Notification('notifyTest', {
          lang: 'zh-CN',
          icon: loginPng,
          body: message
        })
      } else if (Notification.permission !== 'denied') {
        // 否则我们需要向用户获取权限
        Notification.requestPermission(function (permission) {
          // 如果用户同意，就可以向他们发送通知
          if (permission === 'granted') {
            /* eslint-disable no-new */
            new Notification('notifyTest', {
              lang: 'zh-CN',
              icon: loginPng,
              body: message
            })
          }
        })
      }
    }
  }
}
</script>
