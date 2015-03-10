app.controller('infoCtrl', function($scope, socket, $interval) {

	$scope.informacion = [];

	socket.on('msg', function(data) {
		$scope.informacion = data.msg;
		$scope.stop = data.msg.length
	});

	var value = 1;
	
	$scope.isCollapsedTwo = true
	$scope.max = 100;
	$scope.dynamic = value;

	var interval = $interval(function(){
		$scope.dynamic = value;
		value++
		if ($scope.stop >= 1){
			$scope.isCollapsed = true;
			$scope.isCollapsedTwo = false;
			$interval.cancel(interval);
		}
	}, 180)

	$scope.run = function(){
		interval
	}

	$scope.run()

});
