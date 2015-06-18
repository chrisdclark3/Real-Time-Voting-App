var express = require('express');
var app = express();
var server = app.listen(6789, function() { console.log("Server on 6789..."); });
var io = require('socket.io').listen(server);
var request = require('request');
app.use(express.static('./static'));

server.listen(6789);

io.sockets.on('connection', function (socket) {

  socket.on('vote', function (data) {
    request({
      uri: "http://localhost:3000/votes/" + data.id,
      method: "POST",
    }, function (error, res, body) {
      io.emit('update', body);
    });
  });

  socket.on('open', function () {
    request({
      uri: "http://localhost:3000/votes",
      method: "GET",
    }, function (error, res, body) {
      io.emit('all', body);
    });
  });

});
