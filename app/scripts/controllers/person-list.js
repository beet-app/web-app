BeetApp
    .controller('PersonListController', function($scope, $sce, $http, $location, $timeout, Person) {

        $scope.formData = {};

        Person.getPersons()
            .success(function(data) {
                $scope.persons = data;
            });

    });
