const request = require('request');
const _ = require('underscore');
const redis = require('redis');
const client = redis.createClient();

var arr = []
    , patron = /^VPM/
    , lista = []
    , dictionary = {}
    , vpm = require('./vmp4.json')
    , TRAFICO = {"FFFFFF":"trafico_fluido", "008000":"trafico_lento",
           "FFFF00":"trafico_con_demoras", "FF0000":"trafico_congestionado"}
    , alerts = {"trafico_fluido": "active", "trafico_lento": "success", 
        "trafico_con_demoras": "warning", "trafico_congestionado": "danger"}
    , host = 'http://www.ausa.com.ar/autopista/carteleria/plano/mime.txt';

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

        for (var key in dictionary){
            for (var r = 0; r<vpm.length;r++){
                if (key.split("=")[0] == vpm[r].vpm){
                    test.push({
                        "ubicacion" : vpm[r].ubicacion.replace(/[:_]/g, " ").toUpperCase(),
                        "estado" : dictionary[key].replace(/_/g, " ").toUpperCase(),
                        "alert" : alerts[dictionary[key]]
                    })
                }
            }
        }
        
        //console.log(typeof test)
        client.publish("realtime", JSON.stringify(test));
        console.log("=========================================")

    });

}, 15000);