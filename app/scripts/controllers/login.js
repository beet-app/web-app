BeetApp
    .controller('LoginController', function($scope, $http, $location, Login) {

        $scope.formData = {};

        Login.get()
            .success(function (data) {
                $location.path('home');
            })
            .error(function (error) {

            });

        $scope.checkLogin = function() {


            if ($scope.formData.email != undefined) {


                Login.post($scope.formData)

                    .success(function(data) {
                        $location.path('home');
                    })
                    .error(function(data) {
                        alert("Login inválido");
                    });
            }
        };                

    });