BeetApp
    .controller('PersonController', function($scope, $rootScope,$stateParams, $sce, $http, $location, $timeout, Attribute,Person, Common) {

        var objService = Person;
        var objModule =  $rootScope.session.menu.modules[0];

        loadPage();

        function loadPage(){

            $('#beet-loader-open').trigger("click");

            $scope.moduleData = undefined;

            objService.getByCompany($rootScope.session.company._id)
                .success(function(allModuleData) {
                    $timeout(function(){
                        $scope.allModuleData = allModuleData;
                        $('#beet-loader-close').trigger("click");
                    });
                });
            Attribute.getByModule(objModule._id)
                .success(function(data) {
                    $timeout(function(){
                        $scope.attributes = data;
                    });
                });


        }


        $scope.save = function() {

            var objSend = new Object();

            objSend["attributes"] = fillAttributes();
            objSend["company"] = $rootScope.session.company._id;
            objSend["active"] = true;

            if ($scope.moduleData._id != undefined){
                objService.update(objSend, $scope.moduleData._id)
                    .success(function(data) {
                        loadPage();
                        $timeout(function(){showToastMessage();},500);

                    });
            }else{
                objService.create(objSend)
                    .success(function(data) {
                        loadPage();
                        $timeout(function(){showToastMessage();},500);
                    });
            }
        };

        $scope.create = function() {
            $scope.moduleData = {};
            $scope.$apply();
            $(".tab-pane:first").addClass("active");
            $(".tab-index:first").addClass("active");
        };

        $scope.edit = function(_id) {
            $('#beet-loader-open').trigger("click");


            if (_id != undefined){
                $scope.moduleData = undefined;
                objService.getOne(_id)
                    .success(function(moduleData) {
                        $timeout(function(){
                            $scope.moduleData = moduleData;
                            $scope.$apply();

                            $(".message-active").each(function(){
                                $(this).removeClass("message-active");
                            });

                            $("[id='message-"+_id+"']").addClass("message-active");

                            $(".tab-pane:first").addClass("active");
                            $(".tab-index:first").addClass("active");
                            $('#beet-loader-close').trigger("click");
                        });
                    });
            }else{
                $('#beet-loader-close').trigger("click");
            }

        };

        $scope.cancel = function() {
            $scope.moduleData = undefined;

        };

        $scope.delete = function(_id) {
            $location.path(objModule.description + '/delete/' + _id);
        };

    });


