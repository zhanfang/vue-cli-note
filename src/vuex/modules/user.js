import { LOGIN_SUCCESS, REGISTER_SUCCESS, GET_USER, LOGOUT_USER } from '../types'

const state = {
  user: ''
}

const mutations = {
  [LOGIN_SUCCESS] (state, action) {
    state.user = action.user
  },
  [REGISTER_SUCCESS] (state, action) {
    state.user = action.user
  },
  [GET_USER] (state, action) {
    state.user = action.user
  },
  [LOGOUT_USER] (state) {
    state.user = ''
  }
}
export default {
  state,
  mutations
}
