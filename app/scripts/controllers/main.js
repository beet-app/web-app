angular.module('MainController', [])

    // inject the Todo service factory into our controller
    .controller('MainController', function($scope, $http, Menu) {
        $scope.formData = {};
/*
        Menu.get()
            .success(function(data) {
                $("#container-menu").show();
                $scope.menus = data;
            })
*/
    });
