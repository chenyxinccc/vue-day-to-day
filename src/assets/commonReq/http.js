import axios from 'axios'

/**
 * 基于axios的公用http请求
 */
class Http {
  constructor () {
    // 全局修改axios默认配置
    // axios.defaults.baseURL = process.env.NODE_ENV==='production'?'':'' //默认路径,区别生产和线上环境
    // axios.defaults.headers.common['Authorization'] = AUTH_TOKEN //token
    axios.defaults.timeout = 1000
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
    // request 拦截器
    axios.interceptors.request.use(
      config => {
        // const token = getCookie('名称')
        // 使用的时候需要定义cookie方法，推荐js-cookie
        config.data = JSON.stringify(config.data)
        config.headers = {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
        return config
      },
      error => {
        return Promise.reject(error)
      }
    )
    // response 拦截器
    axios.interceptors.response.use(
      response => {
        return response
      },
      error => {
        return Promise.reject(error)
      }
    )
  }
  get (url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.get(url, {
        params: params
      }).then(response => {
        resolve(response.data)
      }).catch(err => {
        reject(err)
      })
    })
  }
  post (url, data = {}) {
    return new Promise((resolve, reject) => {
      axios.post(
        url,
        data
      ).then(response => {
        resolve(response.data)
      }).catch(err => {
        reject(err)
      })
    })
  }
}
export default Http
