var request = require('request');
var _ = require('underscore');
var tt = require('twit')
var arr = [];
var patron = /^VPM/;
var lista = [];
var dictionary = {};
var vpm = require('./vmp4.json');
var TRAFICO = {"FFFFFF":"trafico_fluido", "008000":"trafico_lento",
           "FFFF00":"trafico_con_demoras", "FF0000":"trafico_congestionado"};

var info = new tt({
    consumer_key: ''
  , consumer_secret: ''
  , access_token: ''
  , access_token_secret: ''
})

setInterval(function(){
    console.log('por ejecutar request');
    request({uri: 'http://www.ausa.com.ar/autopista/carteleria/plano/mime.txt'}, function(err, resp, data){
            
        if (!err){
            console.log('received data: ok');
            var a = data.split('&');
            _.each(a, function(x){
                if (x.match(patron)) {
                    lista.push(x);
                }
            });
        } else{
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
        
        for (var key in dictionary){
            for (var r = 0; r<vpm.length;r++){
                if (key.split("=")[0] == vpm[r].vpm){
		    ubicacion = dictionary[key]
		    estado = dictionary[key]
                    console.log(
                        "UBICACION " + ubicacion,
                        " ESTADO " + estado
                    )
		if (estado == "trafico_congestionado"){
		   info.post('statuses/update', { status: 'hello world!' }, function(err, data, response) {
			if (!err) {
			    console.log("twit" + data)
			    console.log(err)
			    //console.log(response)
			} else {
			    console.log(err)
			    //console.log(response)
			}
		    })
	          }
                }
            }
        }
    })
    console.log('request ejecutado');
}, 50000);
