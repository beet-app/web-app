BeetApp
    .controller('LoginController', function($scope,$rootScope, $http, $location, Login) {

        $scope.formData = {};
        hideMenus();
        Login.get()
            .success(function (data) {
                $rootScope.user = data;
                Login.getCompanies()
                    .success(function (companies) {
                        $rootScope.companies = companies;
                        $rootScope.menus = companies[0].menus;
                        $rootScope.company = companies[0];       
                    })
                    .error(function (error) {

                    });
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
                        Login.getCompanies()
                            .success(function (companies) {
                                $rootScope.companies = companies;
                                $rootScope.menus = companies[0].menus;
                                $rootScope.company = companies[0];       
                            })
                            .error(function (error) {

                            });

                        showMenus();
                        $location.path('home');
                    })
                    .error(function(data) {
                        alert("Login inválido");
                    });
            }
        };                

    });