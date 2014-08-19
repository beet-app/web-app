BeetApp
    .factory('Config', function() {
        return {
            getApiUrl : function() {
            	return 'http://127.0.0.1:1313/api';
                //return 'http://beet-api.herokuapp.com/api';
                //return 'http://201.87.228.140:1313/api';

            }
        }
     });

BeetApp
    .factory('Common', function($timeout, $http, Config, Attribute) {
        return {
            isValidImage: function(src) {
                return $http.get(src);  
            },        
            loadAttributesByModule : function(objModule) {
                    
                $('#beet-loader-close').trigger("click"); 

                $("#person_data.name #input").keyup(function(){
                    
                    $("#lblName").text($("[id='person_data.name'] input").val());   

                });
                $("[id='person_data.name']").trigger("keyup");

                $("[id='person_data.birth_date']").keyup(function(){
                    $("#lblBirthDate").text($("[id='person_data.birth_date']").val());
                });
                $("[id='person_data.birth_date']").trigger("keyup");

                $("[id='person_data.city']").keyup(function(){
                    $("#lblCity").text($("[id='person_data.city']").val());
                });
                $("[id='person_data.city']").trigger("keyup");


                $("[id='person_data.postcode']").keyup(function(){
                    if($("[id='person_data.postcode']").val().replace("-","").length == 8)
                    {
                        $("[id='person_data.postcode']").attr("disabled","disabled");

                        Attribute.getPostCodeData($("[id='person_data.postcode']").val())
                            .success(function (data) {
                                $timeout(function(){
                                    $("[id='person_data.neighborhood']").val(data.bairro);
                                    $("[id='person_data.street']").val(data.logradouro);
                                    $("[id='person_data.state']").val(data.estado);
                                    $("[id='person_data.city']").val(data.cidade);
                                    $("[id='person_data.complement']").focus();   
                                });                                
                            });

                        $("[id='person_data.postcode']").removeAttr("disabled");

                    }


                });

                $(".tab-pane:first").addClass("active");
                $(".tab-index:first").addClass("active");

					


            }         
        }
     });


    function toggleDialog(id) {
        var dialog = document.querySelector('#'+id);
        dialog.toggle();
    }