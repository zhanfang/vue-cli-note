var path = require('path')
var express = require('express')
var bodyParser = require('body-parser')
var db = require('./db-server')
var session = require('express-session')
var RedisStore = require('connect-redis')(session)
var webpack = require('webpack')
var config = require('../config')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = process.env.NODE_ENV === 'testing'
  ? require('./webpack.prod.conf')
  : require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()
var User = db.User
var Todos = db.Todos
var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
})

var hotMiddleware = require('webpack-hot-middleware')(compiler)
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.build.assetsPublicPath, config.build.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(session({
  store: new RedisStore({
    host: 'localhost',
    port: 6379,
    ttl: 60*60
  }),
  resave:false,
  saveUninitialized:false,
  secret: 'keyboard cat'
}))

app.post('/login', function (req, res) {
  var user = req.body
  User.find(user, function(err, doc){
    if (err) {
      res.json({success: '-1'})
      return
    }
    if (!doc){
      res.json({success: '0'})
    } else {
      req.session.user = user.username
      res.json({success: '1'})
    }
  })
})

app.post('/register', function (req, res) {
  var username = req.body.username
  var password = req.body.password
  User.find({username: username}, function (err, doc) {
    if(err) console.log(err);
    if (doc.length >= 1) {
      res.json({success:'-3'})
    }else{
      var user = new User({
        username: username,
        password: password,
      })
      user.save(function (err, doc) {
        if(err) {
          return
        }
      })
      var todos = new Todos({
        username: username,
        todos: []
      })
      todos.save(function (err, doc) {
        if (err) {
          return
        }
        res.json({success:'1'})
      })
    }
  })
})

app.post('/save', function (req, res) {
  if (req.session.user) {
    var username = req.session.user
    var todo = {
      username: username,
      todos: req.body
    }
    Todos.update({username: username}, todo, {upsert: true}, function(err, doc){
      if(err) return
      console.log(doc)
    })
  } else {
    res.redirect('404')
  }
})

app.get('/todos', function (req, res) {
  if (req.session.user) {
    var username = req.session.user
    var todo = {
      username: username,
      todos: req.body
    }
    Todos.find({username: username}, function(err, doc){
      console.log(1);
      if(err) return
      console.log(doc)
      res.json(doc)
    })
  } else {
    res.redirect('404')
  }
})

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})
