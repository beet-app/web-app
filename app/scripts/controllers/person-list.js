BeetApp
    .controller('PersonListController', function($scope, $rootScope, $http, $location, $timeout, Person) {

        $scope.formData = {};

        var companyId = $rootScope.company._id;

        Person.getPersons(companyId)
            .success(function(data) {
                $scope.persons = data;
            });


        $scope.newPerson = function() {
            $location.path('person/create'); 
        };

        $scope.editPerson = function(personId) {
        	$location.path('person/edit/' + personId);
        };     
    });
