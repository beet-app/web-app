BeetApp
    .controller('CompanyListController', function($scope, $rootScope, $http, $location, $timeout, Company) {

        $scope.formData = {};

        Company.get()
            .success(function(data) {
                $scope.companies = data;
            });


        $scope.createCompany = function() {
            $location.path('company/create'); 
        };

        $scope.editCompany = function(companyId) {
            $location.path('company/edit/' + companyId);
        };     
    });


BeetApp
    .controller('CompanyController', function($scope, $rootScope,$stateParams, $sce, $http, $location, $timeout, Company) {

        $scope.formData = {};


        $('#main-content').hide();
        $('#loaderImage').show(); 

        Company.get()
            .success(function(data) {
                $timeout(function(){
                    $scope.companies = data;    
                });
            });

        var moduleId = $rootScope.session.menu.modules[0]; 
        Company.getAttributes(moduleId)
            .success(function(data) {
                $scope.attributeGroups = data;
                $timeout(function(){
                    $('#main-content').show();
                    $('#loaderImage').hide();

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


        if ($stateParams.companyId != undefined){
            Company.getOne($stateParams.companyId)
                .success(function(data) {
                    $timeout(function(){
                        $scope.company = data;
                        $scope.companyId = $scope.company._id;
                    });
                });
        }


        $scope.saveCompany = function() {
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

            if ($scope.companyId != undefined){
                Company.update(objSend, $scope.companyId)
                .success(function(data) {
                    $("#beet-modal-success").trigger("click");
                    $location.path("company/list");
                });
            }else{
                Company.create(objSend)
                .success(function(data) {
                    $("#beet-modal-success").trigger("click");
                    $location.path("company/list");
                });                
            }





            /*
            Company.create($scope.formData)

                .success(function(data) {
                    alert("ok");
                    $location.path("company/list");
                });
            */
        };

        $scope.htmlElement = function(attribute){

            var html = "";
            var value = "";
            if ($scope.company != undefined){
                if ($scope.company.attributes[attribute.group.description] != undefined){
                    if ($scope.company.attributes[attribute.group.description] != undefined){
                        value = $scope.company.attributes[attribute.group.description][attribute.description];
                    }
                }
            }


            if (attribute.group != undefined){


                var strName = attribute.group.description + "." + attribute.description;
                var attr = "ng-model='" +strName+ "' id='" +strName+ "'";

                if (attribute.size != null){
                    attr += "size='" +attribute.size+ "' ";
                }

                if (attribute.required){
                    attr += "required ";
                }

                switch (attribute.type.template){
                    case "TEXT":
                        html = "<input type='TEXT' "+attr+" value='"+value+"' class='form-control input-lg' />";
                        break;
                    case "TEXTAREA":
                        html = "<textarea "+attr+">"+value+"</textarea>";
                        break;
                    case "DROPDOWN":
                        html = "<select "+attr+">"

                        for (option in attribute.type.selection)
                        {
                            if (option != value) {
                                html += "<option value='" + option + "'>" + option + "</option>";
                            } else {
                                html += "<option value='" + option + "' selected>" + option + "</option>";
                            }
                        }
                        html += "</select>";
                        break;
                    case "RADIO":
                        html = "<select class='form-control' "+attr+"><option value=''>Selecione</option>"
                        arrSelection = attribute.type.selection;
                        for (x=0;x<arrSelection.length;x++)
                        {
                            if (arrSelection[x] != value) {
                                html += "<option value='" + arrSelection[x] + "'>" + arrSelection[x] + "</option>";
                            } else {
                                html += "<option value='" + arrSelection[x] + "' selected>" + arrSelection[x] + "</option>";
                            }
                        }
                        html += "</select>";
                        break;

                    case "DATE":
                        html = "<input type='TEXT' "+attr+" value='"+value+"' class='form-control input-lg' />";
                        break;

                        
                        /*
                        arrSelection = attribute.type.selection;
                        html = "<div class='form-group'><div class='skin-section'>";

                        for (x=0;x<arrSelection.length;x++)
                        {
                            
                            if (arrSelection[x] != value) {
                                html += "";
                            } else {
                                html += "";
                            }

                            html += "<div class='ui-checkbox'><label class='ui-btn ui-corner-all ui-btn-inherit ui-btn-icon-left ui-checkbox-on'>"+arrSelection[x]+"</label><input type='checkbox' checked='' data-cacheval='false'></div>";
                        }
                        html += "</div></div>";


                        break;
                        */

                }
            }
            return $sce.trustAsHtml(html);
        }


        $scope.editCompany = function(companyId) {
            $location.path('company/edit/' + companyId);
        };     
    });

