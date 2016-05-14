import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import configRouter from './routes'
import {sync} from 'vuex-router-sync'
import store from './vuex/store.js'

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
sync(store, router)
router.redirect({'*': '/login'})
window.router = router

router.start(App, '#app')
