'use strict';

// require('newrelic');

// Variables locales
var express = require('express');
var http = require('http');
var path = require('path');
var routes = require('./routes');
var db = require('./model/db');
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
app.set('port', process.env.OPENSHIFT_NODEJS_PORT || 8080);
app.set('ip', process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1");
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

server.listen(app.get('port'), app.get('ip'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});


io.sockets.on('connection', function(socket){

	// logic redis

	const subscribe = redis.createClient()
	subscribe.subscribe('realtime');

	subscribe.on("message", function(channel, message) {
		//console.log(typeof message)
		obj = JSON.parse(message);
		socket.emit('msg', {'msg': obj});
		//console.log('msg', "received from channel #" + channel + " : " + message);
	});

	client.on('message', function(msg) {
		console.log('debug', msg);
	});

	client.on('disconnect', function() {
		console.log('warn', 'disconnecting from redis');
		subscribe.quit();
	});

})
