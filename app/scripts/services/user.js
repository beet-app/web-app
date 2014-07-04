BeetApp
    .factory('User', function($http, Config) {
        return {
            update : function(data, _id) {
                return $http.put(Config.getApiUrl() + '/user/' + _id, data);
            }
        }
     });
