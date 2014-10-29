var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use( express.static(__dirname + '/www'));
var pty = require('pty.js');

var term = pty.spawn('bash', [], {
  name: 'xterm-color',
  cols: 80,
  rows: 30,
  cwd: process.env.HOME,
  env: process.env
});
io.on('connection', function(socket){
	socket.on('data' , function(data){term.write(data);} );

});
	term.on('data', function(data) {
  		io.sockets.emit('data' , data )
	});


http.listen(8011);
