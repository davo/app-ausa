var db = require('../client/model/db');

exports.save = function(ubicacion, estado, cb){
	TestSave = new db({
		"ubicacion":  ubicacion,
		"estado": estado,
	}).save(cb)
}