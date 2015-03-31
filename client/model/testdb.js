var db = require('./db');

var info = new db({
    ubicacion: "ENLACE AU 25 DE MAYO PEAJE",
    estado : "TRAFICO FLUIDO"
});

info.save();
