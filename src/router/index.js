import Vue from 'vue'
import store from '../store/index.js'
import Router from 'vue-router'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'redirect',
      redirect: 'home'
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/layout/layout'),
      meta: {
        title: '主页'
      },
      children: [
        {
          path: '/echarts',
          component: () => import('@/components/echarts'),
          name: 'echarts',
          meta: {
            title: 'echarts'
          }
        }, {
          path: '/webUpload',
          component: () => import('@/assets/vue-webuploader/page'),
          name: 'webUpload',
          meta: {
            title: 'webUpload实践'
          }
        }, {
          path: '/messageDemo',
          component: () => import('@/components/messageDemo'),
          name: 'messageDemo',
          meta: {
            title: 'message插件'
          }
        }, {
          path: '/drag',
          component: () => import('@/components/testDrag'),
          name: 'drag',
          meta: {
            title: '嵌套drag'
          }
        }, {
          path: '/axios',
          component: () => import('@/components/axiosOrMock'),
          name: 'axiosOrMock',
          meta: {
            title: 'axios及mock'
          }
        }, {
          path: '/fabricDemo',
          name: 'fabricDemo',
          component: () => import('@/components/fabricDemo'),
          meta: {
            title: 'fabricDemo'
          }
        }]
    }
  ]
})

router.beforeEach((to, from, next) => {
  store.dispatch('loading/commitSetLoading', true)
  if (to.matched.length === 0) {
    store.dispatch('loading/commitSetLoading', false)
    from.name ? next({
      name: from.name
    }) : next('/notFind')
  } else {
    store.dispatch('loading/commitSetLoading', false)
    next()
  }
})

export default router
