BeetApp
    .controller('ExpenseController', function($scope, $rootScope,$stateParams, $sce, $http, $location, $timeout, Attribute, Expense, Common, Person) {

        $scope.formData = {};
        $scope.moduleData = {};
        
        $('#beet-loader-open').trigger("click");

        var objService = Expense;
        var objModule =  $rootScope.session.menu.modules[0];

        if ($location.path() == "/" + objModule.description + "/list"){
            Person.getByCompany($rootScope.session.company._id)
                .success(function(allModuleData) {
                    $timeout(function(){
                        $scope.allModuleData = allModuleData;
                        $('#beet-loader-close').trigger("click");
                    });
                });
        }else{
            if ($stateParams.personId != undefined){

                var now = new Date(); 
                var initialDate;
                var finalDate;

                $scope.moduleData.person = $stateParams.personId;

                if ($stateParams.initialDate==undefined){
                    initialDate = now.getFullYear();
                    if (now.getMonth().toString().length==1){ 
                        initialDate = initialDate + "-" + "0" + (parseInt(now.getMonth())+1).toString();
                    }else{
                        initialDate = initialDate + "-" + (parseInt(now.getMonth())+1).toString();
                    }
                    initialDate = initialDate + "-01";
                }else{
                    initialDate = $stateParams.initialDate;
                }

                if ($stateParams.finalDate==undefined){
                    finalDate = now.getFullYear();
                    if (now.getMonth().toString().length==1){
                        finalDate = finalDate + "-" + "0" + (parseInt(now.getMonth())+2).toString();
                    }else{
                        finalDate = finalDate + "-" + (parseInt(now.getMonth())+2).toString();
                    }
                    finalDate = finalDate + "-01";
                }else{
                    finalDate = $stateParams.finalDate;
                }                
                objService.getByPersonAndInterval($stateParams.personId, initialDate, finalDate)
                    .success(function(allModuleData) {
                        $timeout(function(){
                            $scope.allModuleData = allModuleData;
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

        $scope.save = function() {

            var objSend = new Object();

            objSend["attributes"] = fillAttributes();
            objSend["person"] = $scope.moduleData.person;

            if ($scope.moduleData._id != undefined){
                objService.update(objSend, $scope.moduleData._id)
                .success(function(data) {
                    $("#beet-modal-success").trigger("click");
                    $location.path(objModule.description + '/view/' + $scope.moduleData.person);
                });
            }else{
                objService.create(objSend)
                .success(function(data) {
                    $("#beet-modal-success").trigger("click");

                    $location.path(objModule.description + '/view/' + $scope.moduleData.person);
                });                
            }
        };

        $scope.view = function(personId) {
            $location.path(objModule.description + '/view/' + personId);
        };   
        $scope.edit = function(editData) {
            $scope.moduleData._id = editData._id;
            $("[id='expense_data.description']").val(editData.attributes.expense_data.description);
            $("[id='expense_data.category']").val(editData.attributes.expense_data.category);
            $("[id='expense_data.date']").val(editData.attributes.expense_data.date);
            $("[id='expense_data.value']").val(editData.attributes.expense_data.value);

        };         
        $scope.cancel = function(editData) {
            $scope.moduleData._id = undefined;
            $("[id='expense.description']").val("");
            $("[id='expense.category']").val("");
            $("[id='expense.date']").val("");
            $("[id='expense.value']").val("");

        };   

        $scope.delete = function(_id) {
            $location.path(objModule.description + '/delete/' + _id);
        }; 
    });