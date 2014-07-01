BeetApp
    .controller('MenuController', function($scope, $http, Menu) {


        $scope.formData = {};

        Menu.get()
            .success(function(data) {
                $scope.menus = data;
            });


        $scope.createMenu = function() {


            if ($scope.formData.description != undefined) {


                Menu.create($scope.formData)

                    .success(function(data) {
                        $scope.formData = {}; // clear the form so our user is ready to enter another
                        $scope.menus = data; // assign our new list of todos
                    });
            }
        };

        $scope.deleteMenu = function(id) {
            Menu.delete(id)
                // if successful creation, call our get function to get all the new todos
                .success(function(data) {
                    $scope.menus = data; // assign our new list of todos
                });
        };
    });