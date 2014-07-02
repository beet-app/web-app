BeetApp
    .controller('UserController', function($scope, $rootScope,$stateParams, $sce, $http, $location, $timeout, User) {

        $scope.formData = {};



        $('#beet-loader-open').trigger("click");

        var moduleId = $rootScope.session.menu.modules[0];
        User.getAttributes(moduleId)
            .success(function(data) {
                $scope.attributeGroups = data;
                $timeout(function(){
                    $('#beet-loader-close').trigger("click"); 

                    $("[id='user_data.name']").keyup(function(){
                        $("#lblName").text($("[id='user_data.name']").val());   

                    });
                    $("[id='user_data.name']").trigger("keyup");

                    $("[id='user_data.birth_date']").keyup(function(){
                        $("#lblBirthDate").text($("[id='user_data.birth_date']").val());
                    });
                    $("[id='user_data.birth_date']").trigger("keyup");

                    $("[id='user_data.city']").keyup(function(){
                        $("#lblCity").text($("[id='user_data.city']").val());
                    });
                    $("[id='user_data.city']").trigger("keyup");


                    $("[id='user_data.postcode']").keyup(function(){
                        if($("[id='user_data.postcode']").val().replace("-","").length == 8)
                        {
                            $("[id='user_data.postcode']").attr("disabled","disabled");

                            Company.getPostCodeDetails($("[id='user_data.postcode']").val())
                                .success(function (data) {
                                    $timeout(function(){
                                        $("[id='user_data.neighborhood']").val(data.bairro);
                                        $("[id='user_data.street']").val(data.logradouro);
                                        $("[id='user_data.state']").val(data.estado);
                                        $("[id='user_data.city']").val(data.cidade);
                                        $("[id='user_data.complement']").focus();   
                                    });                                
                                });

                            $("[id='user_data.postcode']").removeAttr("disabled");

                        }


                    });

                    $(".tab-pane:first").addClass("active");
                    $(".tab-index:first").addClass("active");
                });
            });
        if ($stateParams._id != undefined){
            User.getOne($stateParams._id)
                .success(function(data) {
                    $timeout(function(){
                        $scope.user = data;
                        $("#imgUser").attr("src","/images/uploads/users/" + data._id + ".png");
                        $scope._id = $scope.user._id;
                        $('#beet-loader-close').trigger("click");
                    });
                });
        }else{
            $('#beet-loader-close').trigger("click");
        }


        $scope.save = function() {
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
            if ($scope._id != undefined){
                User.update(objSend, $scope._id)
                .success(function(data) {
                    $("#beet-modal-success").trigger("click");
                    $location.path("user/view");
                });
            }

        };

        $scope.htmlElement = function(attribute){

            var html = "";
            var value = "";
            if ($scope.user != undefined){
                if ($scope.user.attributes != undefined){
                    if ($scope.user.attributes[attribute.group.description] != undefined){
                        if ($scope.user.attributes[attribute.group.description] != undefined){
                            value = $scope.user.attributes[attribute.group.description][attribute.description];
                        }
                    }
                }
            }
            html = createHtml(attribute, value);
            
            return $sce.trustAsHtml(html);
        }
 
    });