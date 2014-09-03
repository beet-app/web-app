BeetApp
    .controller('ExpenseController', function($scope, $rootScope,$stateParams, $sce, $http, $location, $timeout, Attribute, Expense, Common, Person, Company) {

        $scope.formData = {};
        $scope.moduleData = {};
        
        $rootScope.loadingContent = true;

        var objService = Expense;
        var objModule =  $rootScope.session.menu.modules[0];

        if ($location.path() == "/" + objModule.description + "/list"){
            Person.getByCompany($rootScope.session.company._id)
                .then(function(allModuleData) {
                    $scope.allPersonData = allModuleData;
                });

            Company.getOne($rootScope.session.company._id)
                .success(function(allModuleData) {
                    $timeout(function(){
                        $scope.allCompanyData = new Array(allModuleData);
                        $rootScope.loadingContent = false;
                    });
                });
        }else{

            loadData();
                        
            Attribute.getByModule(objModule._id)
                .then(function(data) {
                    $scope.attributes = data;
 
                });
        } 


        $scope.formatDateToDefault = function(date){
            return formatDate(date,"dd/mm/yyyy");
        }
        $scope.save = function() {

            var objSend = new Object();

            objSend["attributes"] = fillAttributes();

            //modificar
            objSend.attributes.expense_data.date = formatDate(objSend.attributes.expense_data.date, "");

            if ($scope.moduleData.person != undefined){
                objSend["person"] = $scope.moduleData.person;
            }else if ($scope.moduleData.company != undefined){
                objSend["company"] = $scope.moduleData.company;
            }


            $rootScope.loadingContent = true;
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

            clearExpenseDialog();
        };

        $scope.viewPerson = function(personId) {
            $location.path(objModule.description + '/view/person/' + personId);
        };
        $scope.viewCompany = function(companyId) {
            $location.path(objModule.description + '/view/company/' + companyId);
        };

        $scope.edit = function(editData) {
            clearExpenseDialog();
            $scope.moduleData._id = editData._id;
            $("[id='expense_data.description']").val(editData.attributes.expense_data.description);
            $("[id='expense_data.category']").val(editData.attributes.expense_data.category);
            $("[id='expense_data.observation']").val(editData.attributes.expense_data.observation);
            $("[id='expense_data.date']").val(formatDate(editData.attributes.expense_data.date,"dd/mm/yyyy"));
            $("[id='expense_data.value']").val(editData.attributes.expense_data.value);
        };         
        $scope.cancel = function() {
            clearExpenseDialog();
        };

        $scope.add = function() {
            clearExpenseDialog();
        };

        $scope.delete = function(_id) {
            $location.path(objModule.description + '/delete/' + _id);
        };

        function clearExpenseDialog(){
            toggleDialog("expense-dialog");
            $scope.moduleData._id = undefined;
            $("[id='expense_data.description']").val("");
            $("[id='expense_data.category']").val("");
            $("[id='expense_data.observation']").val("");
            $("[id='expense_data.date']").val("");
            $("[id='expense_data.value']").val("");
        }

        function loadData(){
            if ($stateParams.personId != undefined || $stateParams.companyId != undefined){
                var now = new Date();
                var initialDate;
                var finalDate;

                if ($stateParams.initialDate==undefined){
                    initialDate = now.getFullYear();
                    if ((now.getMonth()+1).toString().length==1){
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
                    if ((now.getMonth()+2).toString().length==1){
                        finalDate = finalDate + "-" + "0" + (parseInt(now.getMonth())+2).toString();
                    }else{
                        finalDate = finalDate + "-" + (parseInt(now.getMonth())+2).toString();
                    }
                    finalDate = finalDate + "-01";
                }else{
                    finalDate = $stateParams.finalDate;
                }


                if ($stateParams.personId != undefined) {
                    $scope.moduleData.person = $stateParams.personId;
                    objService.getByPersonAndInterval($scope.moduleData.person, initialDate, finalDate)
                        .success(function(allData) {

                            $timeout(function(){
                                $scope.allModuleData = allData;
                                $rootScope.loadingContent = false;
                            });


                        });
                }else if($stateParams.companyId != undefined){
                    $scope.moduleData.company = $stateParams.companyId;
                    objService.getByCompanyAndInterval($scope.moduleData.company, initialDate, finalDate)
                        .success(function(allData) {

                            $timeout(function(){
                                $scope.allModuleData = allData;
                                $rootScope.loadingContent = false;
                            });


                        });
                }



            }else{
                $rootScope.loadingContent = false;
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
    });