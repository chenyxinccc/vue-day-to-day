// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min.css'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'
import VueHighlightJS from 'vue-highlightjs'
import Rectangle from './assets/plug/toast.js'
import './assets/common.css'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueHighlightJS)
Vue.use(Rectangle)
Vue.directive('highlight', function (el) {
  let blocks = el.querySelectorAll('pre code')
  blocks.forEach((block) => {
    hljs.highlightBlock(block)
  })
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
