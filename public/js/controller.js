app.controller('infoCtrl', function($scope, socket) {
  $scope.informacion = [];
  $scope.cache = [];
  
  socket.on('msg', function(data) {
      $scope.informacion = data.msg;
      $scope.cache.push(data.msg);
  });
  
});