import { LOGIN_SUCCESS, LOGOUT } from '../types'

const state = {
  user: ''
}

const mutations = {
  [LOGIN_SUCCESS] (state, action) {
    state.user = action.user
  },
  [LOGOUT] (state) {
    state.user = null
  }
}
export default {
  state,
  mutations
}
