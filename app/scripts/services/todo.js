angular.module('TodoService', [])

    // super simple service
    // each function returns a promise object
    .factory('Todos', function($http) {
        return {
            get : function() {
                return $http.get('http://localhost:1313/api/todo');
            },
            create : function(todoData) {
                return $http.post('http://localhost:1313/api/todo', todoData);
            },
            delete : function(id) {
                return $http.delete('http://localhost:1313/api/todo/' + id);
            }
        }
     });