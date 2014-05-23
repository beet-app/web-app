BeetApp
    .controller('PersonController', function($scope, $http, $location, $timeout, Person) {

        $scope.formData = {};

        $('#main-content').hide();
        $('#loaderImage').show(); 


        Person.getAttributes()
            .success(function(data) {
                $scope.attributes = data;
                $timeout(function(){
                    $('#main-content').show();
                    $('#loaderImage').hide();                      
                    $("#POSTCODE").keyup(function(){
                        if($("#POSTCODE").val().replace("-","").length == 8)
                        {
                            $("#POSTCODE").attr("disabled","disabled");
                            Person.getPostCodeDetails($("#POSTCODE").val())
                                .success(function (data) {
                                    $("#NEIGHBORHOOD").val(data.bairro);
                                    $("#STREET").val(data.logradouro);
                                    $("#STATE").val(data.estado);
                                    $("#CITY").val(data.cidade);
                                    $("#COMPLEMENT").focus();                                   
                                });
                            $("#POSTCODE").removeAttr("disabled");
                        }
                    });
                });
            });


        $scope.createMenu = function() {


            //if ($scope.formData.description != undefined) {


                //Menu.create($scope.formData)
//
                //    .success(function(data) {
                //        $scope.formData = {}; // clear the form so our user is ready to enter another
                //        $scope.menus = data; // assign our new list of todos
                //    });
            //}
        };

        $scope.deleteMenu = function(id) {
            //enu.delete(id)
            //   // if successful creation, call our get function to get all the new todos
            //   .success(function(data) {
            //       $scope.menus = data; // assign our new list of todos
            //   });
        };
    });

