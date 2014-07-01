BeetApp
    .factory('Signup', function($http, Config) {
        return {
            get : function() {
                return $http.get(Config.getApiUrl() + '/signup');
            },
            post : function(data) {
                return $http.post(Config.getApiUrl() + '/signup', data);
            }
        }
    });