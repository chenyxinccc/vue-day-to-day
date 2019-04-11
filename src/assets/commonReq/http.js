import axios from 'axios'

/**
 * 基于axios的公用http请求
 * 包含重复请求的取消
 */
class Http {
  constructor () {
    const vm = this
    vm.pending = {}
    vm.CancelToken = axios.CancelToken

    // 全局修改axios默认配置
    // axios.defaults.baseURL = process.env.NODE_ENV==='production'?'':'' //默认路径,区别生产和线上环境
    // axios.defaults.headers.common['Authorization'] = AUTH_TOKEN //token
    axios.defaults.timeout = 5000
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

    // request 拦截器
    axios.interceptors.request.use(
      config => {
        // 拦截重复的请求
        let requestData = vm.getRequestIdentify(config, true)
        vm.removePending(requestData, true)

        config.cancelToken = new vm.CancelToken((c) => {
          vm.pending[requestData] = c
        })

        // const token = getCookie('名称')
        // 使用的时候需要定义cookie方法，推荐js-cookie
        config.data = JSON.stringify(config.data)
        config.headers = {
          'Content-Type': 'application/json'
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
        // 移除已经完成的请求
        let requestData = vm.getRequestIdentify(response.config)
        vm.removePending(requestData)
        return response
      },
      error => {
        // 可以加入自定义错误处理
        return Promise.reject(error)
      }
    )
  }
  removePending (key, isRequest = false) {
    if (this.pending[key] && isRequest) {
      this.pending[key]('取消重复请求')
    }
    delete this.pending[key]
  }
  getRequestIdentify (config, isReuest = false) {
    let url = config.url
    if (isReuest) {
      url = config.baseURL + config.url.substring(1, config.url.length)
    }
    // 两种匹配方式: 1.按照url+method 2.按照url+参数 可按具体业务修改
    return encodeURIComponent(url + JSON.stringify(config.method))

    // return config.method === 'get' ? encodeURIComponent(url + JSON.stringify(config.params)) : encodeURIComponent(config.url + JSON.stringify(config.data))
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
      axios.post(url,
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
