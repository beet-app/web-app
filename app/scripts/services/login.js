BeetApp
    .factory('Login', function($http, Config) {
        return {
            get : function() {
                return $http.get(Config.getApiUrl() + '/loggedin');
            },
            post : function(data) {
                return $http.post(Config.getApiUrl() + '/login', data);
            }            
        }
     });