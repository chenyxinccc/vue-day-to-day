<template>
  <div>
    <h3>aes加密</h3>
    <p>原始数据: {{testData}}</p>
    <p>加密数据: {{encryptData}}</p>
    <p>解密后数据: {{decryptData}}</p>
    <el-button type="success" @click="aesTest">aesTest</el-button>
    <hr/>
    <h3>rsa加密</h3>
    <p>原始数据: {{testRsaData}}</p>
    <p>加密数据: {{encryptRsaData}}</p>
    <p>解密后数据: {{decryptRsaData}}</p>
    <el-button type="primary" @click="rsaTest">rsaTest</el-button>
  </div>
</template>
<script>
import CryptoJS from 'crypto-js'
import '@/assets/js/jsencrypt.min.js'

export default {
  name: 'aesDemo',
  data () {
    return {
      aesKey: null, // aes加密key 与后台保持一致
      PUBLIC_KEY: 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC8HMr2CBpoZPm3t9tCVlrKtTmI4jNJc7/HhxjIEiDjC8czP4PV+44LjXvLYcSV0fwi6nE4LH2c5PBPEnPfqp0g8TZeX+bYGvd70cXee9d8wHgBqi4k0J0X33c0ZnW7JruftPyvJo9OelYSofBXQTcwI+3uIl/YvrgQRv6A5mW01QIDAQAB', // rsa加密公钥 与后台约定
      PRIVATE_KEY: 'MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBALwcyvYIGmhk+be320JWWsq1OYjiM0lzv8eHGMgSIOMLxzM/g9X7jguNe8thxJXR/CLqcTgsfZzk8E8Sc9+qnSDxNl5f5tga93vRxd5713zAeAGqLiTQnRffdzRmdbsmu5+0/K8mj056VhKh8FdBNzAj7e4iX9i+uBBG/oDmZbTVAgMBAAECgYEAmgNU5NTDkj9B+Pnt6UU8doSjw3+3j+bV2K2yS3QUOvAUus/Ax7x6ktjWxzCXvDY9IfUil2RNv9vtKEAqYLCWjc+lf8PV/yH1b7NEgyeAPBXtAJRoOnmYL2bdPW92kP9KgxJruF6Dz/C5AmMOncsvq8ABD+9Darn4p8dwj2ZC4O0CQQDf/AHmZsQokEItfCy4mHS9UbxbfIhEUv1ApPh/+Sr7NkJkHWYCtBQo+8jKO6zurAZQgWBPD1XX2UE4R+VIiZazAkEA1wAqtMvGhccyRZr+6kpkpDIa8+9jOE+nGUzqTDvgCID6as8AzOONFVVK6m/UUqkhcJ8Qu1pF36BGojy5BX2KVwJBAJSFpbji0hXXupowqfLp3RcgmNbNWAp+QUJZYhJx5cdYbmO2fssyH+AhPT6knYJR/YnqkDM8hv6vKCkqu2YDHjMCQAOA8TE5EOclM+CGghj3VWSHnIDVKdzFD4gOBNNxNlltIKeU8AJmwunSFgJ0CBXAw9a+ANvMwM7AIeaK7sj0HskCQAvxfDCq7gaNx+pfu0FHG8Gix08A/A6foggBl1fVu+L9sr9ZuOQ3HbXnl28F9ewuB9xdjnLUDjp7W7U0pB+vKoQ=', // rsa解密私钥 与后台约定
      testData: 'aes加密测试string',
      encryptData: '', // STKZ9QGr3kF0EH7g7UHWQYoUDskZmwXPUBcldEArzXY=
      decryptData: '',
      testRsaData: '测试rsa加密吼吼吼',
      encryptRsaData: '',
      decryptRsaData: '',
      resEncrypt: null
    }
  },
  mounted () {
    this.aesInit()
    this.resInit()
  },
  methods: {
    /* ********************** aes加密 ******************* */
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
    aesTest () {
      this.encryptData = this.Encrypt(this.testData)
      this.decryptData = this.Decrypt(this.encryptData)
    },
    /* ********************** rsa加密 ******************* */
    resInit () {
      this.resEncrypt = new JSEncrypt() // eslint-disable-line
      // 加密使用公钥
      this.resEncrypt.setPublicKey('-----BEGIN PUBLIC KEY-----' + this.PUBLIC_KEY + '-----END PUBLIC KEY-----')
    },
    /**
     * [reqEncryption rsa数据加密]
     * @param  {[Any]} data [需要解密的数据]
     * @return {[Any]} data [加密后的数据]
     */
    rsaEncryption (data) {
      return this.resEncrypt.encrypt(data)
    },
    /**
      * [resDecode rsa数据进行解密]
      * @param  {[Any]} data [需要解密的数据]
      * @return {Any}    [解密完成的数据]
      */
    rsaDecode (data) {
      // 解密使用私钥
      this.resEncrypt.setPrivateKey('-----BEGIN RSA PRIVATE KEY-----' + this.PRIVATE_KEY + '-----END RSA PRIVATE KEY-----')
      return this.resEncrypt.decrypt(data)
    },
    rsaTest () {
      /* eslint-disable */
      this.encryptRsaData = this.rsaEncryption(this.testRsaData)
      this.decryptRsaData = this.rsaDecode(this.encryptRsaData)
    }
  }
}
</script>
<style lang="less" scoped>
  p{
    word-break: break-all;
  }
</style>
