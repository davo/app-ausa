var mongoose = require('mongoose').connect('mongodb://lmokto:hacura@localhost/trafico');

var estadotrafico =  new mongoose.Schema({
	date: { type: Date, default: Date.now},
	ubicacion: String,
	estado: String,
});

var estadotrafico = mongoose.model('estadotrafico', estadotrafico);

module.exports = estadotrafico;
