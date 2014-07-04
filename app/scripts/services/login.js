BeetApp
    .factory('Login', function($http, Config) {
        return {
            get : function() {
                return $http.get(Config.getApiUrl() + '/loggedin');
            },
            getCompanies : function() {
                return $http.get(Config.getApiUrl() + '/company');
            },            
            logout : function() {
                return $http.get(Config.getApiUrl() + '/logout');
            },  
            menu : function() {
                return $http.get(Config.getApiUrl() + '/menu');
            },          
            post : function(data) {
                return $http.post(Config.getApiUrl() + '/login', data);
            },   
            isImage : function(img) {
                return $http.get(img);
            }     

                   
        }
     });