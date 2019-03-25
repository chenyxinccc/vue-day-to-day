import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import hljs from '@/components/hljs'
import customForm from '@/components/customForm'
import echarts from '@/components/echarts'
import fabricDemo from '@/components/fabricDemo'
import notFind from '@/components/notFind'
import drag from '@/components/testdrag'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'demo',
      redirect: 'HelloWorld'
    },
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld,
      meta: {
        title: 'HelloWorld'
      },
      children: [
        {
          path: 'childfirst',
          name: 'childfirst',
          component: fabricDemo,
          meta: {
            title: 'childfirst'
          }
        }, {
          path: 'childlast',
          name: 'childlast',
          component: echarts,
          meta: {
            title: 'childlast'
          }
        }, {
          path: 'drag',
          name: 'drag',
          component: drag,
          meta: {
            title: 'drag'
          }
        }
      ]
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
      }
    },
    {
      path: '/customForm',
      name: 'customForm',
      component: customForm,
      meta: {
        title: 'customForm'
      }
    },
    {
      path: '/notFind',
      name: 'notFind',
      component: notFind,
      meta: {
        title: 'notFind'
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  console.log(to)
  if (to.matched.length === 0) {
    from.name ? next({
      name: from.name
    }) : next('/notFind')
  } else {
    next()
  }
})

export default router
