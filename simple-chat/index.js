var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);  // 引入socket.io server

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	// socket.broadcast.emit('hi'); 广播
	socket.on('chat message',function (msg) {   // 接收由客户端提交过来的msg
		io.emit('chat message',msg);
	})
	socket.on('disconnect', function(){
		console.log('user disconnected');
	});
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});