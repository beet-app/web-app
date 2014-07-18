BeetApp
    .controller('ExpenseController', function($scope, $rootScope,$stateParams, $sce, $http, $location, $timeout, Attribute, Expense, Common) {

        $scope.formData = {};
        $scope.moduleData = {};
        
        $('#beet-loader-open').trigger("click");

        var objService = Expense;
        var objModule =  $rootScope.session.menu.modules[0];

        if ($location.path() == "/" + objModule.description + "/list"){
            objService.getByCompany($rootScope.session.company._id)
                .success(function(allModuleData) {
                    $timeout(function(){
                        $scope.allModuleData = allModuleData;
                        $('#beet-loader-close').trigger("click");
                    });
                });
        }else{
            if ($stateParams.personId != undefined){

                var now = new Date.now();

                var initialDate = ($stateParams.initialDate!=undefined) ? $stateParams.initialDate : now.getYear() + "-" + now.getMonth() + "-1";
                var finalDate = ($stateParams.finalDate!=undefined)     ? $stateParams.finalDate : now.getYear() + "-" + (parseInt(now.getMonth())+1).toString() + "-1";

                objService.getByPersonAndInterval($stateParams.personId, initialDate, finalDate)
                    .success(function(moduleData) {
                        $timeout(function(){
                            $scope.moduleData = moduleData;
                            $('#beet-loader-close').trigger("click");
                        });
                    });
            }else{
                $('#beet-loader-close').trigger("click");
            }
                        
            Attribute.getByModule(objModule._id)
                .success(function(data) {

                    $scope.attributes = data;

                });
        }

        $scope.save = function(expenseId) {

            var objSend = new Object();

            objSend["items"] = Array();

            $(".description[expense='"+expenseId+"']").each(function(){

            });

            if ($scope.moduleData._id != undefined){
                objService.update(objSend, $scope.moduleData._id)
                .success(function(data) {
                    $("#beet-modal-success").trigger("click");
                    $location.path(objModule.description + "/list");
                });
            }else{
                objService.create(objSend)
                .success(function(data) {
                    $("#beet-modal-success").trigger("click");
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