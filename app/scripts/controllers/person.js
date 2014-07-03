BeetApp
    .controller('PersonController', function($scope, $rootScope,$stateParams, $sce, $http, $location, $timeout, Person) {

        $scope.formData = {};

        var objService = Person;
        var objModule =  $rootScope.session.menu.modules[0];

        $('#beet-loader-open').trigger("click");

        Person.getPersons($rootScope.session.company._id)
            .success(function(data) {
                $timeout(function(){
                    $scope.persons = data;

                });
            });

        objService.getByModule(objModule._id)
            .success(function(data) {
                $scope.attributeGroups = data;
                $timeout(function(){
                    $('#beet-loader-close').trigger("click"); 

                    $("[id='personal.name']").keyup(function(){
                        $("#lblName").text($("[id='personal.name']").val());   

                    });
                    $("[id='personal.name']").trigger("keyup");

                    $("[id='personal.birth_date']").keyup(function(){
                        $("#lblBirthDate").text($("[id='personal.birth_date']").val());
                    });
                    $("[id='personal.birth_date']").trigger("keyup");

                    $("[id='personal.city']").keyup(function(){
                        $("#lblCity").text($("[id='personal.city']").val());
                    });
                    $("[id='personal.city']").trigger("keyup");


                    $("[id='personal.postcode']").keyup(function(){
                        if($("[id='personal.postcode']").val().replace("-","").length == 8)
                        {
                            $("[id='personal.postcode']").attr("disabled","disabled");

                            Company.getPostCodeDetails($("[id='personal.postcode']").val())
                                .success(function (data) {
                                    $timeout(function(){
                                        $("[id='personal.neighborhood']").val(data.bairro);
                                        $("[id='personal.street']").val(data.logradouro);
                                        $("[id='personal.state']").val(data.estado);
                                        $("[id='personal.city']").val(data.cidade);
                                        $("[id='personal.complement']").focus();   
                                    });                                
                                });

                            $("[id='personal.postcode']").removeAttr("disabled");

                        }


                    });

                    $(".tab-pane:first").addClass("active");
                    $(".tab-index:first").addClass("active");
                });
            });


        if ($stateParams._id != undefined){
            Person.getOne($stateParams._id)
                .success(function(data) {
                    $timeout(function(){
                        $scope.person = data;
                        $("#imgAvatar").attr("src","/images/uploads/persons/" + data._id + ".png");
                        $scope._id = $scope.person._id;
                        $('#beet-loader-close').trigger("click");
                    });
                });
        }else{
            $('#beet-loader-close').trigger("click");
        }


        $scope.save = function() {
            var arrName;

            var objSend = new Object();

            objSend["attributes"] = fillAttributes;
            objSend["company"] = $rootScope.session.company._id;
            objSend["active"] = true;

            if ($scope._id != undefined){
                Person.update(objSend, $scope._id)
                .success(function(data) {
                    $location.path("person/list");
                });
            }else{
                Person.create(objSend)
                .success(function(data) {
                    $location.path("person/list");
                });                
            }

        };

        $scope.edit = function(_id) {
            $location.path('person/edit/' + _id);
        };     
    });

BeetApp
    .controller('PersonListController', function($scope, $rootScope, $http, $location, $timeout, Person) {

        $('#beet-loader-open').trigger("click"); 
        $scope.formData = {};

        Person.getByCompany($rootScope.session.company._id)
            .success(function(data) {
                $('#beet-loader-close').trigger("click"); 
                $scope.persons = data;
            });

        $scope.new = function() {
            $location.path('person/create'); 
        };

        $scope.edit = function(_id) {
            $location.path('person/edit/' + _id);
        };     
    });
