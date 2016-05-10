var mongoose = require('mongoose')
var db = mongoose.connect('mongodb://localhost/notes')//；连接数据库
var Schema = mongoose.Schema   //  创建模型

//定义用户
var User = new Schema({
  username: String,
  password: String,
})

var Todo = new Schema({
  detail: String,
  completed: Boolean
})

var Todos = new Schema({
  username: String,
  todos: [Todo],
  time: {
    type: Date,
    default: Date.now
  }
})

exports.User = db.model('users', User)//  与users集合关联
exports.Todos = db.model('todos', Todos)
