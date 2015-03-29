// Variableslocale
var express = require('express');
var http = require('http');
var path = require('path');
var routes = require('./routes');
var db = require('./model/db');
//var log = require('./config/logAusa');
var app = express();
var request = require('request');
var _ = require('underscore');
var fs = require('fs');
var server = http.createServer(app);
var io = require('socket.io').listen(server);
// redis connection
const redis = require('redis');
const client = redis.createClient();

// all environments
app.set('port', process.env.PORT || 3000);
//app.set('views', path.join(__dirname, 'views'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}
app.get('/', routes.index);

var msgWrite = true;

io.set('log level', 0);

server.listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});


io.sockets.on('connection', function(socket){

	// logic redis

	const subscribe = redis.createClient()
	subscribe.subscribe('realtime');

	subscribe.on("message", function(channel, message) {
		socket.emit('msg', {'msg': message});
		console.log('msg', "received from channel #" + channel + " : " + message);
	});

	client.on('message', function(msg) {
		//socket.emit('msg', {'msg': msg});
		console.log('debug', msg);
	});

	client.on('disconnect', function() {
		console.log('warn', 'disconnecting from redis');
		subscribe.quit();
	});

})