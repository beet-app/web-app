BeetApp
    .factory('Menu', function($http) {
        return {
            get : function() {
                return $http.get('http://localhost:1313/api/menu');
            },
            create : function(data) {
                return $http.post('http://localhost:1313/api/menu', data);
            },
            delete : function(id) {
                return $http.delete('http://localhost:1313/api/menu/' + id);
            }
        }
     });