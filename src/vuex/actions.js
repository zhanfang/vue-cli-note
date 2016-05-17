import api from '../api'
import * as types from './types'

export const showMsg = ({dispatch}, content, type = 'error') => {
  dispatch(types.SHOW_MSG, {content: content, type: type})
  setTimeout(dispatch.bind(null, types.HIDE_MSG), 3000)
}
export const login = (store, user) => {
  api.login(user).then(res => {
    if (!res.ok) {
      return showMsg(store, res.data.error_msg || '登陆失败')
    }
    store.dispatch(types.LOGIN_SUCCESS, {user: user})
    showMsg(store, '登陆成功', 'success')
    store.router.go({path: '/todos'})
  }, res => {
    showMsg(store, res.data.error_msg || '登录失败')
  })
}
export const register = (store, user) => {
  api.register(user).then(res => {
    console.log('ok', res.ok)
    if (!res.ok) {
      return showMsg(store, res.data.error_msg || '注册失败')
    }
    store.dispatch(types.REGISTER_SUCCESS, {user: user})
    showMsg(store, '注册成功', 'success')
    store.router.go({path: '/todos'})
  }, res => {
    showMsg(store, res.data.error_msg || '注册失败')
  })
}
export const getUser = (store) => {
  api.getUser().then(res => {
    if (!res.ok) {
      return showMsg(store, res.data.error_msg || '未登陆，请登陆')
    }
    store.dispatch(types.GET_USER, {user: res.data.user})
    store.router.go('todos')
  }, res => {
    showMsg(store, res.data.error_msg || '网络存在问题，请检查')
  })
}
export const getUserStatus = (store) => {
  api.getUser().then(res => {
    if (!res.ok) {
      return showMsg(store, res.data.error_msg || '未登陆，请登陆')
    }
    store.dispatch(types.GET_USER, {user: res.data.user})
    store.router.go('/todos')
    showMsg(store, '已经登陆，直接跳转到主页', 'success')
  }, res => {
    showMsg(store, res.data.error_msg || '网络存在问题，请检查')
  })
}

export const logout = (store) => {
  api.logout().then(res => {
    if (!res.ok) {
      return showMsg(store, res.data.error_msg || '登出失败')
    }
    showMsg(store, '登出成功', 'success')
  }, res => {
    showMsg(store, res.data.error_msg || '登出失败')
  })
  store.router.go({path: '/login'})
  store.dispatch(types.LOGOUT_USER)
}

export const getTodos = (store) => {
  api.getTodos().then(res => {
    if (!res.ok) {
      return showMsg(store, res.data.error_msg || '获取笔记失败')
    }
    store.dispatch(types.GET_NOTES, {todos: res.data.todos})
  }, res => {
    showMsg(store, res.data.error_msg || '获取笔记内容失败')
  })
}

export const saveTodos = (store, data) => {
  api.saveTodos(data).then(res => {
    if (!res.ok) {
      return showMsg(store, res.data.error_msg || '保存笔记失败')
    }
    store.dispatch(types.SAVE_NOTES, {todos: data})
  }, res => {
    showMsg(store, res.data.error_msg || '保存笔记失败啦，请重试！')
  })
}
