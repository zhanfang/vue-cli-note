import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource'
import configRouter from './routes'

import VueRouter from 'vue-router'

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
Vue.transition('fadeleft', {
  enterClass: 'fadeInLeft',
  leaveClass: 'fadeOutLeft'
})

const router = new VueRouter({
  history: true,
  saveScrollPosition: true,
  suppressTransitionError: true
})
configRouter(router)
router.redirect({'*': '/login'})
window.router = router

router.start(App, '#app')
