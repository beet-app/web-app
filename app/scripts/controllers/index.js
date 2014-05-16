BeetApp
    .controller('IndexController', function($scope, $http, $location, Index) {

        $scope.formData = {};

        Index.loggedUser()
            .success(function(data) {
                $location.path('home')
            })
            .error( function( errorText ){
                $location.path('login')
            });
    });