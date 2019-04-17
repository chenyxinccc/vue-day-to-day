<template>
  <div>
    <p>aes加密实践</p>
    <p>原始数据: {{testData}}</p>
    <p>加密数据: {{encryptData}}</p>
    <p>解密后数据: {{decryptData}}{</p>
    <el-button type="success" @click="aesTest">aesTest</el-button>
  </div>
</template>
<script>
import CryptoJS from 'crypto-js'

export default {
  name: 'aesDemo',
  data () {
    return {
      aesKey: null,
      testData: 'aes加密测试string',
      encryptData: 'STKZ9QGr3kF0EH7g7UHWQYoUDskZmwXPUBcldEArzXY=',
      decryptData: ''
    }
  },
  mounted () {
    this.aesInit()
  },
  methods: {
    /**
     * [aesInit 初始化aes配置 需要和后端约定]
     */
    aesInit () {
      // 对pad.zeroPadding覆写
      CryptoJS.pad.ZeroPadding = {
        pad: function (data, blockSize) {
          // Shortcut
          var blockSizeBytes = blockSize * 4

          // Pad
          data.clamp()
          data.sigBytes += blockSizeBytes - ((data.sigBytes % blockSizeBytes) || blockSizeBytes)
        },
        unpad: function (data) {
          // Shortcut
          var dataWords = data.words

          // Unpad
          var i = data.sigBytes - 1
          while (!((dataWords[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff)) {
            i--
          }
          data.sigBytes = i + 1
        }
      }
      // key值，要和后端的key相同
      this.aesKey = CryptoJS.enc.Utf8.parse('abcdef0123456789')
    },
    /**
     * [Encrypt 加密方法]
     */
    Encrypt (word) {
      const srcs = CryptoJS.enc.Utf8.parse(word)
      const encrypted = CryptoJS.AES.encrypt(srcs, this.aesKey, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      })
      return encrypted.toString()
    },
    /**
     * [Decrypt 解密方法]
     */
    Decrypt (word) {
      var decrypt = CryptoJS.AES.decrypt(word, this.aesKey, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      })
      return CryptoJS.enc.Utf8.stringify(decrypt).toString()
    },
    aesTest (info = this.testData) {
      this.encryptData = this.Encrypt(info)
      this.decryptData = this.Decrypt(this.encryptData)
    }
  },
  created () {
  }
}
</script>
