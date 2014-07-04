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
    .factory('Common', function($timeout, Config, Attribute) {
        return {
            loadAttributesByModule : function(objModule) {
                
                $('#beet-loader-close').trigger("click"); 

                $("[id='personal.name']").keyup(function(){
                    $("#lblName").text($("[id='personal.name']").val());   

                });
                $("[id='personal.name']").trigger("keyup");

                $("[id='personal.birth_date']").keyup(function(){
                    $("#lblBirthDate").text($("[id='personal.birth_date']").val());
                });
                $("[id='personal.birth_date']").trigger("keyup");

                $("[id='personal.city']").keyup(function(){
                    $("#lblCity").text($("[id='personal.city']").val());
                });
                $("[id='personal.city']").trigger("keyup");


                $("[id='personal.postcode']").keyup(function(){
                    if($("[id='personal.postcode']").val().replace("-","").length == 8)
                    {
                        $("[id='personal.postcode']").attr("disabled","disabled");

                        Attribute.getPostCodeData($("[id='personal.postcode']").val())
                            .success(function (data) {
                                $timeout(function(){
                                    $("[id='personal.neighborhood']").val(data.bairro);
                                    $("[id='personal.street']").val(data.logradouro);
                                    $("[id='personal.state']").val(data.estado);
                                    $("[id='personal.city']").val(data.cidade);
                                    $("[id='personal.complement']").focus();   
                                });                                
                            });

                        $("[id='personal.postcode']").removeAttr("disabled");

                    }


                });

                $(".tab-pane:first").addClass("active");
                $(".tab-index:first").addClass("active");

					


            }         
        }
     });
