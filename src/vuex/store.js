import Vue from 'vue'
import Vuex from 'vuex'
import middlewares from './middlewares'
import message from './modules/msg.js'
import user from './modules/user.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    message,
    user
  },
  middlewares
})
