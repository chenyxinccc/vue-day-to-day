// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min.css'
import '../theme/index.css'

import Hint from './assets/plug/toast.js'
import './assets/css/common.css'
import './assets/mock/index.js'
import './assets/directive/drag.js'
import Http from './assets/commonReq/http.js'

Vue.prototype.$http = new Http()
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Hint)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
