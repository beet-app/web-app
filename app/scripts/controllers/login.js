BeetApp
    .controller('LoginController', function($scope,$rootScope, $http, $location, Login) {

        $scope.formData = {};
        hideMenus();
        Login.get()
            .success(function (data) {
                $rootScope.user = data;
                $rootScope.menus = $rootScope.user.companies[0].menu;
                showMenus();
                $location.path('home');                
            })
            .error(function (error) {

            });

        $scope.checkLogin = function() {


            if ($scope.formData.email != undefined) {


                Login.post($scope.formData)

                    .success(function(data) {
                        $rootScope.user = data;
                        $rootScope.menus = $rootScope.user.companies[0].menu;
                        showMenus();
                        $location.path('home');
                    })
                    .error(function(data) {
                        alert("Login inválido");
                    });
            }
        };                

    });