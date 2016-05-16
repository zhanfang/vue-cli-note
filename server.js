var path = require('path');
var express = require('express');

var app = new express();
var port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, 'dist')));

app.get("/*", function(req, res) {
  return res.sendFile(__dirname + '/dist/index.html')
})

app.listen(port, function(err) {
  if (err) {
    console.error(err)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})
