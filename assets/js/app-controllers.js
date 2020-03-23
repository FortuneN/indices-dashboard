app.controller('appController', ['$scope', '$timeout', '$mdDialog', 'dataSource', function ($scope, $timeout, $mdDialog, dataSource) {
    
    $scope.data1 = [];
    $scope.data2 = [];
    $scope.offline = true; // always start offline
    
    function refreshData (data) {
        
        $scope.data1 = [];
        $scope.data2 = [];
        
        var half = Math.floor(data.length / 2);

        data.forEach(function (item, index) {
            if (index <= half) {
                $scope.data1.push(item);
            } else {
                $scope.data2.push(item);
            }
        });
    }
    
    dataSource.onData(function (data) {
        $scope.offline = false;
        refreshData(data);
    });

    dataSource.onOffline(function () {
        $scope.offline = true;
    });
    
    dataSource.getData().then(refreshData);

}]);
