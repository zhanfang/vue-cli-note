import { SHOW_MSG, HIDE_MSG } from '../types'

const state = {
  msg: {
    type: '',
    content: ''
  }
}

const mutations = {
  [SHOW_MSG] (state, msg) {
    state.msg = {...msg}
  },
  [HIDE_MSG] (state) {
    state.msg = {
      type: '',
      content: ''
    }
  }
}

export default {
  state,
  mutations
}
