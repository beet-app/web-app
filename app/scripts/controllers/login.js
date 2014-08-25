BeetApp
    .controller('LoginController', function($scope,$rootScope, $http, $location, Login, Common) {

        $scope.formData = {};

        $rootScope.loadingPage = true;

        Login.get()
            .success(function (data) {
                loadData(data);
            })
            .error(function (error) {
                $("#wrapper").show();
                $rootScope.loadingPage = false;
                $rootScope.login = true;
            });

        $scope.checkLogin = function() {

            if ($scope.formData.email != undefined) {
                Login.post($scope.formData)
                    .success(function(data) {
                        loadData(data);
                    })
                    .error(function(data) {
                        Common.showToastMessage("Dados Inválidos !");

                    });
            }
        }; 


        function loadData(data){
            $rootScope.session = new Object();
            $rootScope.session.user = data;
            Login.getCompanies()
                .success(function (companies) {
                    $rootScope.session.companies = companies;
                    $rootScope.session.company = companies[0];       
                    $rootScope.session.menus = companies[0].menus;
                    $rootScope.session.menu = companies[0].menus[0];
                    $rootScope.loadingPage = false;
                    $rootScope.login = false;
                    $location.path('home');                                          
                })
                .error(function (error) {

                });


        }                       

    });