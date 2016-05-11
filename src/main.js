import Vue from 'vue'
import App from './App'
import configRouter from './routes'

import VueRouter from 'vue-router'

Vue.use(VueRouter)

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

export const router = new VueRouter({
  history: true,
  saveScrollPosition: true,
  suppressTransitionError: true
})
configRouter(router)

router.start(App, '#app')
