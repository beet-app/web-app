BeetApp
    .factory('Menu', function($http) {
        return {
            get : function() {
                return $http.get('http://127.0.0.1:1313/api/menu');
            },
            create : function(data) {
                return $http.post('http://127.0.0.1:1313/api/menu', data);
            },
            delete : function(id) {
                return $http.delete('http://127.0.0.1:1313/api/menu/' + id);
            }
        }
     });