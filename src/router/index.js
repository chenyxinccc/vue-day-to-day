import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import hljs from '@/components/hljs'
import customForm from '@/components/customForm'
import echarts from '@/components/echarts'
import child from '@/components/child'
import notFind from '@/components/notFind'

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
          component: child,
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
      },
      children: [
        {
          path: 'child',
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
