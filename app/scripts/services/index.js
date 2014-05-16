BeetApp
    .factory('Index', function($http) {
        return {
            loggedUser : function() {
                return $http.get('http://127.0.0.1:1313/api/logged-user');
            }
        }
     });