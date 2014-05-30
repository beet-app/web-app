BeetApp
    .factory('Menu', function($http, Config) {
        return {
            get : function() {
                return $http.get(Config.getApiUrl() + '/menu');
            },
            create : function(data) {
                return $http.post(Config.getApiUrl() + '/menu', data);
            },
            delete : function(id) {
                return $http.delete(Config.getApiUrl() + '/menu/' + id);
            }
        }
     });