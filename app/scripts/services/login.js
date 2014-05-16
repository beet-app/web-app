BeetApp
    .factory('Login', function($http) {
        return {
            get : function() {
                return $http.get('http://localhost:1313/api/menu');
            },
            create : function(data) {
                return $http.post('http://localhost:1313/api/menu', data);
            },
            checkLogin : function(data) {
                return $http.post('http://127.0.0.1:1313/api/login', data);
                //return $http.delete('http://localhost:1313/api/menu/' + id);
            }
        }
     });