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

                $("[id='person_data.name']").keyup(function(){
                    
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

function setPolymerMask(data){
    var mask = data.type.properties.mask;
    var id   = data.group.description + "." + data.description;

    switch(mask.toLowerCase()) {
        case "postcode":
            $("[id='"+id+"']").attr("maxlength","9");
            document.querySelector('[id="'+id+'"]').addEventListener('input', function(event) {
                event.target.value = event.target.value.replace(/\D/g,"").replace(/^(\d{5})(\d)/,"$1-$2");
            });
            break;
        default:
            break;
    }
}

function setPolymerMirror(data){
    var mirror = data.type.properties.mirror;
    var id     = data.group.description + "." + data.description;

    if (mirror=="label" || mirror=="span"){
        mirror = mirror + "." + id;
    }

    document.querySelector('[id="'+id+'"]').addEventListener('input', function(event) {
        $("[id='"+mirror+"']").text(event.target.value);
    });

}


        /*

         function mcep(v){
         v=v.replace(/\D/g,"")                    //Remove tudo o que não é dígito
         v=v.replace(/^(\d{5})(\d)/,"$1-$2")         //Esse é tão fácil que não merece explicações
         return v
         }
         function mtel(v){
         v=v.replace(/\D/g,"");             //Remove tudo o que não é dígito
         v=v.replace(/^(\d{2})(\d)/g,"($1) $2"); //Coloca parênteses em volta dos dois primeiros dígitos
         v=v.replace(/(\d)(\d{4})$/,"$1-$2");    //Coloca hífen entre o quarto e o quinto dígitos
         return v;
         }
         function cnpj(v){
         v=v.replace(/\D/g,"")                           //Remove tudo o que não é dígito
         v=v.replace(/^(\d{2})(\d)/,"$1.$2")             //Coloca ponto entre o segundo e o terceiro dígitos
         v=v.replace(/^(\d{2})\.(\d{3})(\d)/,"$1.$2.$3") //Coloca ponto entre o quinto e o sexto dígitos
         v=v.replace(/\.(\d{3})(\d)/,".$1/$2")           //Coloca uma barra entre o oitavo e o nono dígitos
         v=v.replace(/(\d{4})(\d)/,"$1-$2")              //Coloca um hífen depois do bloco de quatro dígitos
         return v
         }
         function mcpf(v){
         v=v.replace(/\D/g,"")                    //Remove tudo o que não é dígito
         v=v.replace(/(\d{3})(\d)/,"$1.$2")       //Coloca um ponto entre o terceiro e o quarto dígitos
         v=v.replace(/(\d{3})(\d)/,"$1.$2")       //Coloca um ponto entre o terceiro e o quarto dígitos
         //de novo (para o segundo bloco de números)
         v=v.replace(/(\d{3})(\d{1,2})$/,"$1-$2") //Coloca um hífen entre o terceiro e o quarto dígitos
         return v
         }
         function mdata(v){
         v=v.replace(/\D/g,"");                    //Remove tudo o que não é dígito
         v=v.replace(/(\d{2})(\d)/,"$1/$2");
         v=v.replace(/(\d{2})(\d)/,"$1/$2");

         v=v.replace(/(\d{2})(\d{2})$/,"$1$2");
         return v;
         }
         function mtempo(v){
         v=v.replace(/\D/g,"");                    //Remove tudo o que não é dígito
         v=v.replace(/(\d{1})(\d{2})(\d{2})/,"$1:$2.$3");
         return v;
         }
         function mhora(v){
         v=v.replace(/\D/g,"");                    //Remove tudo o que não é dígito
         v=v.replace(/(\d{2})(\d)/,"$1h$2");
         return v;
         }
         function mrg(v){
         v=v.replace(/\D/g,"");                                      //Remove tudo o que não é dígito
         v=v.replace(/(\d)(\d{7})$/,"$1.$2");    //Coloca o . antes dos últimos 3 dígitos, e antes do verificador
         v=v.replace(/(\d)(\d{4})$/,"$1.$2");    //Coloca o . antes dos últimos 3 dígitos, e antes do verificador
         v=v.replace(/(\d)(\d)$/,"$1-$2");               //Coloca o - antes do último dígito
         return v;
         }
         function mnum(v){
         v=v.replace(/\D/g,"");                                      //Remove tudo o que não é dígito
         return v;
         }
         function mvalor(v){
         v=v.replace(/\D/g,"");//Remove tudo o que não é dígito
         v=v.replace(/(\d)(\d{8})$/,"$1.$2");//coloca o ponto dos milhões
         v=v.replace(/(\d)(\d{5})$/,"$1.$2");//coloca o ponto dos milhares

         v=v.replace(/(\d)(\d{2})$/,"$1,$2");//coloca a virgula antes dos 2 últimos dígitos
         return v;
         }

        */



