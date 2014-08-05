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

            loadData();
                        
            Attribute.getByModule(objModule._id)
                .success(function(data) {
                    $scope.attributes = data;
 
                });
        } 

        function loadData(){
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
                    .success(function(allData) {
                        
                            $timeout(function(){
                                $scope.allModuleData = allData;
                                $('#beet-loader-close').trigger("click");
                            });       
                        
                           
                    });    
            }else{
                $('#beet-loader-close').trigger("click");
            }

        }

        function formatDate(date, format){
            if (format=="dd/mm/yyyy"){
                arr = date.split("-");
                return arr[2] + "/" + arr[1] + "/" + arr[0];
            }else{
                arr = date.split("/");
                return arr[2] + "-" + arr[1] + "-" + arr[0];                
            }

        }
        $scope.formatDateToDefault = function(date){
            return formatDate(date,"dd/mm/yyyy");
        }
        $scope.save = function() {

            var objSend = new Object();

            objSend["attributes"] = fillAttributes();

            //modificar
            objSend.attributes.expense_data.date = formatDate(objSend.attributes.expense_data.date, "");


            objSend["person"] = $scope.moduleData.person;
            $('#beet-loader-open').trigger("click");
            if ($scope.moduleData._id != undefined){
                objService.update(objSend, $scope.moduleData._id)
                .success(function(data) {
                    $timeout(function(){
                        loadData();
                    });                    
                });
            }else{
                objService.create(objSend)
                .success(function(data) {
                    $timeout(function(){
                        loadData();
                    });                      
                });                
            }

            
            $scope.moduleData._id = undefined;
            $("[id='expense_data.description']").val("");
            $("[id='expense_data.category']").val("");
            $("[id='expense_data.observation']").val("");
            $("[id='expense_data.date']").val("");
            $("[id='expense_data.value']").val("");            
        };

        $scope.view = function(personId) {
            $location.path(objModule.description + '/view/' + personId);
        };   
        $scope.edit = function(editData) {
            $scope.moduleData._id = editData._id;
            $("[id='expense_data.description']").val(editData.attributes.expense_data.description);
            $("[id='expense_data.category']").val(editData.attributes.expense_data.category);
            $("[id='expense_data.observation']").val(editData.attributes.expense_data.observation);
            $("[id='expense_data.date']").val(formatDate(editData.attributes.expense_data.date,"dd/mm/yyyy"));
            $("[id='expense_data.value']").val(editData.attributes.expense_data.value);

        };         
        $scope.cancel = function(editData) {
            $scope.moduleData._id = undefined;
            $("[id='expense_data.description']").val("");
            $("[id='expense_data.category']").val("");
            $("[id='expense_data.observation']").val("");
            $("[id='expense_data.date']").val("");
            $("[id='expense_data.value']").val("");

        };   

        $scope.delete = function(_id) {
            $location.path(objModule.description + '/delete/' + _id);
        }; 
    });