import { UserResource, AuthResource } from './resources'

export default {
  login: function (data) {
    return AuthResource.save(data)
  },
  getMe: function () {
    return UserResource.get({id: 'me'})
  },
  saveTodos: function (todos) {}
}
