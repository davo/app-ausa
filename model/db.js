var config = ''
var mongoose = require('mongoose').connect(config);

var estadotrafico =  new mongoose.Schema({
    date: { type: Date, default: Date.now},
    ubicacion: String,
    estado: String,
});

var estadotrafico = mongoose.model('estadotrafico', estadotrafico);

module.exports = estadotrafico;
