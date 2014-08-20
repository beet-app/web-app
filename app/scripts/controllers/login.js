BeetApp
    .controller('LoginController', function($scope,$rootScope, $http, $location, Login) {

        $scope.formData = {};
        
        hideMenus();

        $('#beet-loader-open').trigger("click");

        Login.get()
            .success(function (data) {
                loadData(data);
            })
            .error(function (error) {
                $('#beet-loader-close').trigger("click");
            });

        $scope.checkLogin = function() {

            if ($scope.formData.email != undefined) {
                Login.post($scope.formData)
                    .success(function(data) {
                        $('#beet-loader-open').trigger("click");
                        loadData(data);
                    })
                    .error(function(data) {
                        $("#beet-modal-login-failed").trigger("click");
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
                    showMenus();
                    $location.path('home');                                          
                })
                .error(function (error) {

                });


        }                       

    });