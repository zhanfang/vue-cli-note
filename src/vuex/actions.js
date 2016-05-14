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
