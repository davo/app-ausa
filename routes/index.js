exports.index = function(req, res){
  res.render('index', {
    titulo: 'Ausa - Estado de las Autopistas.',
    info: 'Informacion en tiempo real sobre el estado de las autopistas en CABA.'
  });
};