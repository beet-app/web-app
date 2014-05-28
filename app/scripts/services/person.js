BeetApp
    .factory('Person', function($http) {
        return {
            getAttributes : function() {
                return $http.get('http://127.0.0.1:1313/api/attribute');
            },
            getPostCodeDetails : function(postcode) {
                $http.defaults.withCredentials = false;
                return $http.get('http://api.postmon.com.br/v1/cep/' + postcode);
            },
            create : function(data) {
                return $http.post('http://127.0.0.1:1313/api/menu', data);
            },
            delete : function(id) {
                return $http.delete('http://127.0.0.1:1313/api/menu/' + id);
            }

        }
     });

BeetApp
    .factory('Form', function($http) {
        return {
            get : function() {
                return $http.get('http://127.0.0.1:1313/api/loggedin');
            },
            post : function(data) {
                return $http.post('http://127.0.0.1:1313/api/login', data);
            }
        }
    });