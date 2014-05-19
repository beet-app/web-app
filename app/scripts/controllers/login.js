BeetApp
    .controller('LoginController', function($scope, $http, $location, Login) {

        $scope.formData = {};

        $scope.checkLogin = function() {


            if ($scope.formData.email != undefined) {


                Login.checkLogin($scope.formData)
                    .success(function(data) {
                        $scope.formData = {};
                        $location.path('home')
                    });
            }
        };


            
            
            
            


    });