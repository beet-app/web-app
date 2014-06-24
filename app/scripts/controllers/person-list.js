BeetApp
    .controller('PersonListController', function($scope, $rootScope, $http, $location, $timeout, Person) {

        $scope.formData = {};

        var companyId = $rootScope.company._id;

        Person.getPersons(companyId)
            .success(function(data) {
                $scope.persons = data;
            });

    });
