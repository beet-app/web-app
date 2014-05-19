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
            },
            checkLoggedin : function($q, $timeout, $http, $location, $rootScope){
              // Initialize a new promise
              var deferred = $q.defer();
              alert("a");
              // Make an AJAX call to check if the user is logged in
              $http.get('http://127.0.0.1:1313/api/loggedin').success(function(user){
                // Authenticated
                if (user !== '0')
                  $timeout(deferred.resolve, 0);

                // Not Authenticated
                else {
                  $rootScope.message = 'You need to log in.';
                  $timeout(function(){deferred.reject();}, 0);
                  $location.url('/login');
                }
              });

              return deferred.promise;
            }          
        }
     });