exports.index = function(req, res){
  res.render('index', {
    titulo: 'Ausa - Estado de los Sensores.',
    info: 'Informacion en tiempo real sobre el estado del trafico en CABA. Filtrar por ubicacion o estado (congestionado, demoras, fluido, lento).',
  });
};