import * as Resource from './resources'

export default {
  login: function (data) {
    return Resource.AuthResource.save(data)
  },
  register: function (data) {
    return Resource.RegisterResource.save(data)
  },
  getUser: function () {
    return Resource.GetUserResource.get()
  },
  logout: function () {
    return Resource.LogoutResource.get()
  },
  getMe: function () {
    return Resource.UserResource.get({id: 'me'})
  },
  getTodos: function () {
    return Resource.TodosResource.get()
  },
  saveTodos: function (todos) {
    return Resource.SaveResource.save(JSON.stringify(todos))
  }
}
