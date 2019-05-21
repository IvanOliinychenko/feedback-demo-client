import Vue from 'vue'
import Router from 'vue-router'
import Signin from '@/components/Signin'
import Session from '@/components/Session'
import Feedback from '@/components/Feedback'
import NProgress from 'NProgress'
import cache from '../managers/cacheManager'

Vue.use(Router)

export const router = new Router({
  routes: [
    {
      path: '/signin',
      name: 'signin',
      component: Signin,
      meta: {
        hideTopNav: true
      }
    },
    {
      path: '/session',
      name: 'session',
      component: Session,
      meta: {
        hideTopNav: true
      }
    },
    {
      path: '/feedbacks',
      name: 'feedbacks',
      component: Feedback,
      meta: {
        hideTopNav: true
      }
    }
  ]
})

router.beforeResolve((to, from, next) => {
  let token = cache.getOAthToken()
  let role = cache.getRole()

  if (to.name === 'signin') {
    next()
  } else if (to.meta.requiresAuth && !token) {
    if (from.name !== 'signin') {
      next('signin')
    }
  } else {
    if (role === 'admin') {
      if (to.name !== 'feedbacks') {
        next('feedbacks')
      } else {
        next()
      }
    } else if (role !== 'admin') {
      if (to.name !== 'session') {
        next('session')
      } else {
        next()
      }
    }
  }
})

router.afterEach((to, from) => {
  NProgress.done()
})
