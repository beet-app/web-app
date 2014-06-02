BeetApp
    .controller('PersonController', function($scope, $rootScope, $sce, $http, $location, $timeout, Person) {

        $scope.formData = {};


        $('#main-content').hide();
        $('#loaderImage').show(); 



        Person.getAttributes()
            .success(function(data) {
                $scope.attributes = data;
                $timeout(function(){
                    $('#main-content').show();
                    $('#loaderImage').hide();

                    $("#name").keyup(function(){
                        $("#lblName").text($("#name").val());

                    });
                    $("#birth_date").change(function(){
                        $("#lblBirthDate").text($("#birth_date").val());
                    });
                    $("#city").change(function(){
                        $("#lblCity").text($("#city").val());
                    });


                    $("#postcode").keyup(function(){
                        if($("#postcode").val().replace("-","").length == 8)
                        {
                            $("#postcode").attr("disabled","disabled");
                            Person.getPostCodeDetails($("#postcode").val())
                                .success(function (data) {
                                    $("#neighborhood").val(data.bairro);
                                    $("#street").val(data.logradouro);
                                    $("#state").val(data.estado);
                                    $("#city").val(data.cidade);
                                    $("#complement").focus();                                   
                                });
                            $("#postcode").removeAttr("disabled");
                        }
                    });
                });
            });


        $scope.savePerson = function() {

            var objSend = new Object();
            var objAttributes = new Object();
            $("[ng-model]").each(function(){
                objAttributes[$(this).attr("ng-model")] = $(this).val();
            });

            objSend["attributes"] = objAttributes;
            objSend["active"] = true;

            Person.create(objSend)
            .success(function(data) {
                $("#beet-modal-success").trigger("click");
                $location.path("person/list");
            });




            /*
            Person.create($scope.formData)

                .success(function(data) {
                    alert("ok");
                    $location.path("person/list");
                });
            */
        };

        $scope.htmlElement = function(attribute){

            var html;
            var value = "";

            var attr = "ng-model='" +attribute.description+ "' id='" +attribute.description+ "'";

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
            return $sce.trustAsHtml(html);
        }



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

