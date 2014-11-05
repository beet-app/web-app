BeetApp
    .controller('ExpenseController', function($scope, $rootScope,$stateParams, $sce, $q, $http, $location, $timeout, Attribute,Person, Common, Expense, Company) {

        var objService = Expense;
        var objModule =  $rootScope.session.menu.modules[0];
        $scope.moduleData = {};
        $rootScope.loadingContent = true;
        loadPage();

        function loadPage(){

            $scope.allModuleData = undefined;


            Person.getByCompany($rootScope.session.company._id)
                .then(function(allModuleData) {

                    $scope.allPersonData = allModuleData;

                    Company.getOne($rootScope.session.company._id)
                        .success(function(allModuleData) {
                            $timeout(function(){

                                $scope.allCompanyData = new Array(allModuleData);

                                Attribute.getByModule(objModule._id)
                                    .then(function(data) {
                                        $scope.attributes = data;

                                        $rootScope.loadingContent = false;
                                        $rootScope.moduleLoading = false;
                                    });

                            });
                        });
                });

        }

        $scope.formatDateToDefault = function(date){
            return formatDate(date,"dd/mm/yyyy");
        };
        $scope.formatDateToLabel = function(date){
            arrDate = date.split("-");
            var arr = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
            return arr[arrDate[1]-1] + " / " + arrDate[0];
        };


        $scope.save = function() {

            var objSend = new Object();

            objSend["attributes"] = fillAttributes();

            //modificar
            objSend.attributes.expense_data.date = formatDate(objSend.attributes.expense_data.date, "");

            if ($scope.moduleMode === "person"){
                objSend["person"] = $scope._id;
            }else if ($scope.moduleMode === "company"){
                objSend["company"] = $scope._id;
            }

            objSend["active"] = true;

            $scope.allModuleData = undefined;

            $rootScope.moduleLoading = true;
            if ($scope.moduleData._id != undefined){
                objService.update(objSend, $scope.moduleData._id)
                    .success(function(data) {
                        $timeout(function(){
                            $scope.view($scope._id, $scope.moduleMode);
                            Common.showToastMessage();
                        });
                    });
            }else{
                objService.create(objSend)
                    .success(function(data) {
                        $timeout(function(){
                            $scope.view($scope._id, $scope.moduleMode);
                            Common.showToastMessage();
                        });
                    });
            }

            clearExpenseDialog();

        };

        $scope.editExpense = function(editData) {
            clearExpenseDialog();
            $scope.moduleData._id = editData._id;
            $("[id='expense_data.description']").val(editData.attributes.expense_data.description);
            $("[id='expense_data.category']").val(editData.attributes.expense_data.category);
            $("[id='expense_data.observation']").val(editData.attributes.expense_data.observation);
            $("[id='expense_data.date']").val(formatDate(editData.attributes.expense_data.date,"dd/mm/yyyy"));
            $("[id='expense_data.value']").val(editData.attributes.expense_data.value);
        };
        $scope.add = function() {
            clearExpenseDialog();
        };

        function loadData(initialDate, finalDate){
            if ($scope._id !== undefined){
                var now = new Date();
                if (initialDate==undefined){
                    initialDate = now.getFullYear();
                    if ((now.getMonth()+1).toString().length==1){
                        initialDate = initialDate + "-" + "0" + (parseInt(now.getMonth())+1).toString();
                    }else{
                        initialDate = initialDate + "-" + (parseInt(now.getMonth())+1).toString();
                    }
                    initialDate = initialDate + "-01";
                }

                if (finalDate==undefined){
                    finalDate = now.getFullYear();
                    if ((now.getMonth()+2).toString().length==1){
                        finalDate = finalDate + "-" + "0" + (parseInt(now.getMonth())+2).toString();
                    }else{
                        finalDate = finalDate + "-" + (parseInt(now.getMonth())+2).toString();
                    }
                    finalDate = finalDate + "-01";
                }
                $scope.initialDate = initialDate;
                $scope.finalDate = finalDate;
                $scope.dateLabel = $scope.formatDateToLabel(initialDate);

                if ($scope.moduleMode === "person") {
                    objService.getByPersonAndInterval($scope._id, initialDate, finalDate)
                        .success(function(allData) {
                            $timeout(function(){
                                $scope.allModuleData = allData;
                                $rootScope.moduleLoading = false;
                            });


                        });
                }else{
                    objService.getByCompanyAndInterval($scope._id, initialDate, finalDate)
                        .success(function(allData) {

                            $timeout(function(){
                                $scope.allModuleData = allData;
                                $rootScope.moduleLoading = false;
                            });


                        });
                }



            }else{
                $rootScope.moduleLoading = false;
            }

        }

        $scope.view = function(_id, strModule) {
            $rootScope.moduleLoading = true;

            $scope.moduleMode = strModule;
            $scope._id = _id;
            if (_id != undefined){
                $scope.allModuleData = undefined;
                $(".message-active").each(function(){
                    $(this).removeClass("message-active");
                });

                $("[id='message-"+strModule+"-"+_id+"']").addClass("message-active");

                loadData();

            }
        };
        $scope.next = function() {
            $rootScope.moduleLoading = true;

            var arr;

            var initialDate = $scope.initialDate;
            arr = initialDate.split("-");
            if (parseInt(arr[1])==12){
                arr[1] = "01";
                arr[0] = (parseInt(arr[0]) + 1).toString();
            }else{
                arr[1] = (parseInt(arr[1]) + 1).toString();
            }
            initialDate = arr[0];
            if ((arr[1]).toString().length==1){
                initialDate = initialDate + "-" + "0" + (parseInt(arr[1])).toString();
            }else{
                initialDate = initialDate + "-" + (parseInt(arr[1])).toString();
            }
            initialDate = initialDate + "-01";


            var finalDate = $scope.finalDate;
            arr = finalDate.split("-");
            if (parseInt(arr[1])==12){
                arr[1] = "01";
                arr[0] = (parseInt(arr[0]) + 1).toString();
            }else{
                arr[1] = (parseInt(arr[1]) + 1).toString();
            }
            finalDate = arr[0];
            if ((arr[1]).toString().length==1){
                finalDate = finalDate + "-" + "0" + (parseInt(arr[1])).toString();
            }else{
                finalDate = finalDate + "-" + (parseInt(arr[1])).toString();
            }
            finalDate = finalDate + "-01";

            $scope.initialDate = initialDate;
            $scope.finalDate = finalDate;
            $scope.dateLabel = $scope.formatDateToLabel(initialDate);

            loadData(initialDate, finalDate);
        };
        $scope.prev = function() {
            $rootScope.moduleLoading = true;

            var arr;

            var initialDate = $scope.initialDate;
            arr = initialDate.split("-");
            if (parseInt(arr[1])==1){
                arr[1] = "12";
                arr[0] = (parseInt(arr[0]) - 1).toString();
            }else{
                arr[1] = (parseInt(arr[1]) - 1).toString();
            }
            initialDate = arr[0];
            if ((arr[1]).toString().length==1){
                initialDate = initialDate + "-" + "0" + (parseInt(arr[1])).toString();
            }else{
                initialDate = initialDate + "-" + (parseInt(arr[1])).toString();
            }
            initialDate = initialDate + "-01";


            var finalDate = $scope.finalDate;
            arr = finalDate.split("-");
            if (parseInt(arr[1])==1){
                arr[1] = "12";
                arr[0] = (parseInt(arr[0]) - 1).toString();
            }else{
                arr[1] = (parseInt(arr[1]) - 1).toString();
            }
            finalDate = arr[0];
            if ((arr[1]).toString().length==1){
                finalDate = finalDate + "-" + "0" + (parseInt(arr[1])).toString();
            }else{
                finalDate = finalDate + "-" + (parseInt(arr[1])).toString();
            }
            finalDate = finalDate + "-01";

            $scope.initialDate = initialDate;
            $scope.finalDate = finalDate;
            $scope.dateLabel = $scope.formatDateToLabel(initialDate);

            loadData(initialDate, finalDate);
        };
        $scope.cancel = function() {
            $scope.allModuleData = undefined;
            $(".message-active").each(function(){
                $(this).removeClass("message-active");
            });
        };

        $scope.cancelExpense = function() {
            clearExpenseDialog();
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


        $scope.delete = function(_id) {
            objService.delete(_id)
                .success(function(data) {
                    $timeout(function(){
                        $scope.view($scope._id, $scope.moduleMode);
                        Common.showToastMessage();
                    });
                });
        };

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


