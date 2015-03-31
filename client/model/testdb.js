var db = require('./db');

var info = new db({
    ubicacion: "ENLACE 25 MAYO",
    estado : "TRAFICO FLUIDO"
});

info.save();