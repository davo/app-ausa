// Variableslocale
var express = require('express');
var http = require('http');
var path = require('path');
var routes = require('./routes');
var db = require('./model/db');
var log = require('./config/logAusa');
var app = express();
var request = require('request');
var _ = require('underscore');
var fs = require('fs');
var server = http.createServer(app);
var io = require('socket.io').listen(server);

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

var msgWrite = '';
io.set('log level', 0);

server.listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});

/* MODULARIZAR */

var arr = [];
var patron = /^VPM/;
var lista = [];
var dictionary = {};
var vpm = require('./ausa-estado/vmp4.json');
var TRAFICO = {
	"FFFFFF":"trafico_fluido",
	"008000":"trafico_lento",
	"FFFF00":"trafico_con_demoras",
	"FF0000":"trafico_congestionado"
};

var host = 'http://www.ausa.com.ar/autopista/carteleria/plano/mime.txt'

io.sockets.on('connection', function(socket){

setInterval(function(){

	request({uri: host}, function(err, resp, data){

	if (!err){
		console.log("cargando..");
		console.log('received data: ok');
		var a = data.split('&');
		_.each(a, function(x){
			if (x.match(patron)) {
				lista.push(x);
			}
		});
	} else {
		console.log(err);
	}
	
	function prueba(n) {
		for (var key in TRAFICO){
			if (key.match(n.split("=")[1])) {
				dictionary[n] = TRAFICO[key];
			}
		}
	}

	_.filter(lista, prueba);

	var test = [];
	var rr = {};
	var alerts = {"trafico_fluido": "active", "trafico_lento": "success", 
		"trafico_con_demoras": "warning", "trafico_congestionado": "danger"};

	for (var key in dictionary){
		for (var r = 0; r<vpm.length;r++){
			if (key.split("=")[0] == vpm[r].vpm){
				test.push({
					"ubicacion" : vpm[r].ubicacion.replace(/[:_]/g, " ").toUpperCase(),
					"estado" : dictionary[key].replace(/_/g, " ").toUpperCase(),
					"alert" : alerts[dictionary[key]]
				})
				TestSave = new db({
					"ubicacion":  vpm[r].ubicacion,
					"estado": dictionary[key],
				}).save()
			}
		}
	}

	socket.emit('msg', {'msg': test});
	socket.emit('msgWrite', msgWrite);

	})

}, 15000);

});