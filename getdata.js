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

io.sockets.on('connection', function(socket){

	setInterval(function(){

		request({uri: 'http://www.ausa.com.ar/autopista/carteleria/plano/mime.txt'}, function(err, resp, data){

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
							"estado" : dictionary[key].replace("_", " ").toUpperCase(),
							"alert" : alerts[dictionary[key]]
						})
						// TestSave = new db({
						// 	"ubicacion":  vpm[r].ubicacion,
						// 	"estado": dictionary[key],
						// }).save()
					}
				}
			}
	
			socket.emit('msg', {'msg': test});
			socket.emit('msgWrite', msgWrite);
		})

	}, 15000);

});