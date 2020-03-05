app.controller('appController', ['$scope', '$timeout', '$mdDialog', 'dataSource', function ($scope, $timeout, $mdDialog, dataSource) {
    
    $scope.data = [];
    $scope.offline = true; // start with offline
    $scope.error = null;

    dataSource.onData(function (data) {
        $scope.data = data;
    });

    dataSource.onOffline(function () {
        $scope.offline = true;
    });

    dataSource.onError(function (error) {
        $scope.error = error;
        $scope.offline = true;
    });

    dataSource.getData().then(function (data) {
        $scope.data = data;
    });

}]);