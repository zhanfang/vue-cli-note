import Vue from 'vue'
import App from './App'
import Login from './components/Login'
import Register from './components/Register'
import Index from './components/Index'
import Todos from './components/Todos'

import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

// 注册两个插件
Vue.use(VueRouter)
Vue.use(VueResource)

Vue.transition('bounce', {
  type: 'animation',
  enterClass: 'bounceInLeft',
  leaveClass: 'bounceOutRight'
})
Vue.transition('updown', {
  type: 'animation',
  enterClass: 'bounce',
  leaveClass: 'bounce'
})
Vue.transition('updown', {
  type: 'animation',
  enterClass: 'bounceInDown',
  leaveClass: 'bounceOutUp'
})

export const router = new VueRouter()

router.map({
  '/login': {
    component: Login
  },
  '/register': {
    component: Register
  },
  '/index': {
    component: Index,
    subRoutes: {
      '/todos': {
        component: Todos
      }
    }
  }
})

router.redirect({
  '*': '/login'
})

router.start(App, '#app')
