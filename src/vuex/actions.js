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
    store.router.go({path: '/index/todos'})
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
    store.router.go({path: '/index/todos'})
  }, res => {
    showMsg(store, res.data.error_msg || '注册失败')
  })
}
export const logout = (store) => {
  api.logout().then(res => {
    if (!res.ok) {
      return showMsg(store, res.data.error_msg || '登出失败')
    }
    showMsg(store, '登出成功', 'success')
  })
  store.router.go({path: '/login'})
  store.dispatch(types.LOGOUT_USER)
}
