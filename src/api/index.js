import { UserResource, AuthResource } from './resources'

export default {
  localLogin: function (data) {
    return AuthResource.save(data)
  },
  getMe: function () {
    return UserResource.get({id: 'me'})
  }
}
