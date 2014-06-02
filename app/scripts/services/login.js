BeetApp
    .factory('Login', function($http, Config) {
        return {
            get : function() {
                return $http.get(Config.getApiUrl() + '/loggedin');
            },
            logout : function() {
                return $http.get(Config.getApiUrl() + '/logout');
            },  
            menu : function() {
                return $http.get(Config.getApiUrl() + '/menu');
            },          
            post : function(data) {
                return $http.post(Config.getApiUrl() + '/login', data);
            }   

                   
        }
     });