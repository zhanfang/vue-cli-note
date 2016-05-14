import { UserResource, AuthResource, LogoutResource } from './resources'

export default {
  login: function (data) {
    return AuthResource.save(data)
  },
  logout: function () {
    return LogoutResource.get()
  },
  getMe: function () {
    return UserResource.get({id: 'me'})
  },
  saveTodos: function (todos) {}

}
