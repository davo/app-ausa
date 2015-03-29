var db = require('./db');

var info = new db({
    ubicacion: "Pinamar",
    estado : "trafico fluido"
});

info.save();