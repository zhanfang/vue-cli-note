import { SHOW_MSG, HIDE_MSG } from '../types'

const state = {
  msg: {
    type: '',
    content: ''
  }
}

const mutations = {
  [SHOW_MSG] (state, action) {
    state.msg = {...action}
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
