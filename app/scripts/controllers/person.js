BeetApp
    .controller('PersonController', function($scope, $rootScope,$stateParams, $sce, $http, $location, $timeout, Attribute,Person, Common) {

        $scope.formData = {};

        $('#beet-loader-open').trigger("click");

        var objService = Person;
        var objModule =  $rootScope.session.menu.modules[0];

        if ($location.path() != objModule.description + "/list"){
            objService.getByCompany($rootScope.session.company._id)
                .success(function(allModuleData) {
                    $timeout(function(){
                        $scope.allModuleData = allModuleData;

                    });
                });


            Attribute.getByModule(objModule._id)
                .success(function(data) {

                    $scope.attributes = data;

                    $timeout(function(){
                        Common.loadAttributesByModule(objModule);
                    });
                });

            
        }

        if ($stateParams._id != undefined){
            objService.getOne($stateParams._id)
                .success(function(moduleData) {
                    $timeout(function(){
                        $scope.moduleData = moduleData;
                        $("#imgAvatar").attr("src","/images/uploads/"+objModule.description+"/" + moduleData._id + ".png");
                        $('#beet-loader-close').trigger("click");
                    });
                });
        }else{
            $('#beet-loader-close').trigger("click");
        }


        $scope.save = function() {

            var objSend = new Object();

            objSend["attributes"] = fillAttributes();
            objSend["company"] = $rootScope.session.company._id;
            objSend["active"] = true;

            if ($scope.moduleData._id != undefined){
                objService.update(objSend, $scope.moduleData._id)
                .success(function(data) {
                    $location.path(objModule.description + "/list");
                });
            }else{
                objService.create(objSend)
                .success(function(data) {
                    $location.path(objModule.description + "/list");
                });                
            }

        };

        $scope.create = function() {
            $location.path(objModule.description + '/create'); 
        };

        $scope.edit = function(_id) {
            $location.path(objModule.description + '/edit/' + _id);
        };   

        $scope.delete = function(_id) {
            $location.path(objModule.description + '/delete/' + _id);
        };         
    });