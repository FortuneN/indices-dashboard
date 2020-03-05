app.service('dataSource', ['$q', '$http', '$interval', function ($q, $http, $interval) {
    
    // private fields

    var $this = this,
        dataCallbacks = [],
        offlineCallbacks = [], 
        domParser = new DOMParser(),
        dataFetchMilliseconds = 1000 * 60 * 5,
        store = new Persist.Store('MoyoTechChallenge'),
        corsPassThrough = 'https://cors-anywhere.herokuapp.com',
        apiUrl = corsPassThrough + '/https://www.sharenet.co.za/v3/indices.php';

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
		
		//data.sort(function (a, b) {
		//	return a.name.localeCompare(b.name);
		//});

        return data;
    }
    
    function fetchData() {
        $http.get(apiUrl, {
            headers:{
                'x-requested-with': '-'
            }
        }).then(function (response) {
            
            var parsedData = parseHtmlData(response.data);

            store.set('data', JSON.stringify(parsedData));
            
            // notify listeners
            
            dataCallbacks.forEach(function (callback) {
                callback(getDataFromStore());
            });
            
        }, function (response) {

            // notify listeners

            offlineCallbacks.forEach(function (callback) {
                callback(getDataFromStore());
            });
        });
    }

    // public methods
    
    $this.getData = function () {
        return $q(function (resolve) {
            resolve(getDataFromStore());
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

    // initialize
    
    fetchData();
    $interval(fetchData, dataFetchMilliseconds);
    
}]);