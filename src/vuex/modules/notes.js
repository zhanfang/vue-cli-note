import { GET_NOTES, SAVE_NOTES, TOGGLE_ALL } from '../types.js'

const state = {
  todos: []
}

const mutations = {
  [GET_NOTES] (state, action) {
    state.todos = action.todos
  },
  [SAVE_NOTES] (state, action) {
    state.todos = action.todos
  },
  [TOGGLE_ALL] (state, action) {
    state.todos.forEach(function (todo) {
      todo.completed = !action.done
    })
  }
}

export default {
  state,
  mutations
}
