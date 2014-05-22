BeetApp
    .factory('Login', function($http) {
        return {
            get : function() {
                return $http.get('http://127.0.0.1:1313/api/loggedin');
            },
            post : function(data) {
                return $http.post('http://127.0.0.1:1313/api/login', data);
            }            
        }
     });