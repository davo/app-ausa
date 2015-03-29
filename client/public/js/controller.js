app.controller('infoCtrl', function($scope, socket, $interval) {

	$scope.informacion = [];

	socket.on('connect', function(data){
        console.log('connect');
	});

	socket.on('msg', function(data) {
		console.log(data.msg)
		$scope.informacion = [data.msg];
		$scope.stop = data.msg.length
	});

	socket.on('reconnecting', function(data){
		console.log('reconnecting');
	});

	var value = 1;

	$scope.isCollapsedTwo = true
	$scope.max = 200;
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
