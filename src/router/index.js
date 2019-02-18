import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import hljs from '@/components/hljs'
import customForm from '@/components/customForm'
import echarts from '@/components/echarts'
import child from '@/components/child'
Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'demo',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'HelloWorld',
      component: HelloWorld,
      meta: {
        title: 'home'
      }
    }, {
      path: '/echarts',
      name: 'echarts',
      component: echarts,
      meta: {
        title: 'echarts'
      }
    },
    {
      path: '/hljs',
      name: 'hljs',
      component: hljs,
      meta: {
        title: 'hljs'
      },
      children: [
        {
          path: '/child',
          name: 'child',
          component: child,
          meta: {
            title: 'child'
          }
        }
      ]
    },
    {
      path: '/customForm',
      name: 'customForm',
      component: customForm,
      meta: {
        title: 'customForm'
      }
    }
  ]
})

export default router
