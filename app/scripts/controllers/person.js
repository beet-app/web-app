BeetApp
    .controller('PersonController', function($scope, $rootScope,$stateParams, $sce, $http, $location, $timeout, Person) {

        $scope.formData = {};


        $('#beet-loader-open').trigger("click");

        Person.getPersons($rootScope.session.company._id)
            .success(function(data) {
                $timeout(function(){
                    $scope.persons = data;

                });
            });

        var moduleId = $rootScope.session.menu.modules[0];
        Person.getAttributes(moduleId)
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


        if ($stateParams.personId != undefined){
            Person.getOne($stateParams.personId)
                .success(function(data) {
                    $timeout(function(){
                        $scope.person = data;
                        $("#imgPerson").attr("src","/images/uploads/persons/" + data._id + ".png");
                        $scope.personId = $scope.person._id;
                        $('#beet-loader-close').trigger("click");
                    });
                });
        }else{
            $('#beet-loader-close').trigger("click");
        }


        $scope.savePerson = function() {
            var arrName;
            var objSend = new Object();
            var objAttributes = new Object();
            $("[ng-model]").each(function(){
                arrName = $(this).attr("ng-model").split(".");
                if (objAttributes[arrName[0]] == undefined){
                    objAttributes[arrName[0]] = new Object();
                }
                objAttributes[arrName[0]][arrName[1]] = $(this).val();
            });

            objSend["attributes"] = objAttributes;
            objSend["company"] = $rootScope.session.company._id;
            objSend["active"] = true;

            if ($scope.personId != undefined){
                Person.update(objSend, $scope.personId)
                .success(function(data) {
                    $("#beet-modal-success").trigger("click");
                    $location.path("person/list");
                });
            }else{
                Person.create(objSend)
                .success(function(data) {
                    $("#beet-modal-success").trigger("click");
                    $location.path("person/list");
                });                
            }





            /*
            Person.create($scope.formData)

                .success(function(data) {
                    alert("ok");
                    $location.path("person/list");
                });
            */
        };

        $scope.htmlElement = function(attribute){

            var html = "";
            var value = "";
            if ($scope.person != undefined){
                if ($scope.person.attributes[attribute.group.description] != undefined){
                    if ($scope.person.attributes[attribute.group.description] != undefined){
                        value = $scope.person.attributes[attribute.group.description][attribute.description];
                    }
                }
            }
            html = createHtml(attribute, value);
            
            return $sce.trustAsHtml(html);
        }


        $scope.editPerson = function(personId) {
            $location.path('person/edit/' + personId);
        };     
    });

BeetApp
    .controller('PersonListController', function($scope, $rootScope, $http, $location, $timeout, Person) {

        $('#beet-loader-open').trigger("click"); 
        $scope.formData = {};

        var companyId = $rootScope.session.company._id;

        Person.getPersons(companyId)
            .success(function(data) {
                $('#beet-loader-close').trigger("click"); 
                $scope.persons = data;
                //images/uploads/persons/{{person._id}}.png
            });


        $scope.newPerson = function() {
            $location.path('person/create'); 
        };

        $scope.editPerson = function(personId) {
            $location.path('person/edit/' + personId);
        };     
    });
