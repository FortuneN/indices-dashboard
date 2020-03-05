app.service('dataSource', ['$q', '$http', '$interval', function ($q, $http, $interval) {
    
    // private fields

    var $this = this,
        dataCallbacks = [],
        apiUrl = '/getData',
        errorCallbacks = [],
        offlineCallbacks = [], 
        domParser = new DOMParser(),
        dataFetchMilliseconds = 1000 * 60 * 5,
        storage = new Persist.Store('MoyoTechChallenge');
        
    // private methods
    
    function getDataFromStore () {
        return JSON.parse(store.get('data') || '[]');
    }

    function parseHtmlData (html) {
        
        var data = [],
            htmlDocument = domParser.parseFromString(html, 'text/html');
        
        angular.element(htmlDocument.body).find('th.sp_dataCell_alt').each(function () {

            var $dataCells = angular.element(this).parent().children();
            
            data.push({
                name        : angular.element(angular.element($dataCells[0])[0]).text().trim(),
                rp          : angular.element($dataCells[1]).text().trim(),
                move        : angular.element($dataCells[2]).text().trim(),
                movePercent : angular.element($dataCells[3]).text().trim(),
            });

        });

        return data;
    }
    
    function fetchData() {
        $http.get(apiUrl).then(function (response) {
            
            var parsedData = parseHtmlData(response.data);

            storage.set('data', parsedData);
            
            // notify listeners
            
            dataCallbacks.forEach(function (callback) {
                callback(storage.get('data', []));
            });
            
        }, function (response) {
            
            var message = null,
                statusTextFormated = response.statusText ? "[" + response.statusText + "] " : "";

            // offline

            if (response.status === -1) {
                errorCallbacks.forEach(function (callback) {
                    callback(storage.get('data', []));
                });
                return;
            };

            // all other errors
            
            if (response.status === 404) {
                message = statusTextFormated + "Server endpoint not found '" + apiUrl + "'";
            }
            else if (response.status === 403) {
                message = statusTextFormated + "You are not allowed to perfom this action";
            }
            else if (response.data && angular.isString(response.data)) {
                message = response.data.trim();
            }
            
            if (!message) {
                message = response.statusText || 'Unknown error';
            }
            
            errorCallbacks.forEach(function (callback) {
                callback(message);
            });
        });
    }

    // public methods
    
    $this.getData = function () {
        return $q(function (resolve) {
            resolve(storage.get('data', []));
        });
    };

    $this.onData = function (callback) {
        
        if (!angular.isFunction(callback)) {
            throw "callback is required and must be a function";
        }

        dataCallbacks.push(callback);
    };

    $this.onOffline = function (callback) {
        
        if (!angular.isFunction(callback)) {
            throw "callback is required and must be a function";
        }

        offlineCallbacks.push(callback);
    };

    $this.onError = function (callback) {
        
        if (!angular.isFunction(callback)) {
            throw "callback is required and must be a function";
        }

        errorCallbacks.push(callback);
    };

    // initialize
    
    fetchData();
    $interval(fetchData, dataFetchMilliseconds);
    
}]);