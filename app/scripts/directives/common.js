BeetApp
    .factory('Common', function($timeout, $http, Config, Attribute) {
        return {
            isValidImage: function (src) {
                return $http.get(src);
            },
            setPolymerEvent: function (data) {

                var id = data.group.description + "." + data.description;
                var value = "";
                if (data.type.events.input != undefined) {

                    document.querySelector('[id="' + id + '"]').addEventListener('input', function (event) {
                        document.querySelector('[id="' + id + '"]').commit();
                        value = event.target.value.replace("-", "");
                        if (value.length == 8) {
                            $("[id='" + id + "']").attr("disabled", "disabled");
                            Attribute.getPostCodeData(value)
                                .success(function (data) {
                                    $timeout(function () {
                                        $("[id='person_data.neighborhood']").val(data.bairro);
                                        $("[id='person_data.street']").val(data.logradouro);
                                        $("[id='person_data.state']").val(data.estado);
                                        $("[id='person_data.city']").val(data.cidade);
                                        $("[id='person_data.complement']").focus();
                                    });
                                });

                            $("[id='" + id + "']").removeAttr("disabled");
                        }
                    });
                }
            },
            setPolymerMask :function (data){
                var mask = data.type.properties.mask;
                var selector = "[id='"+data.group.description + "." + data.description+"']";

                var onInput = function (event){
                    var value = event.target.value;

                    switch(mask.toLowerCase()) {
                        case "postcode":
                            $(selector).attr("maxlength","9");
                            value = value.replace(/\D/g,"");
                            value = value.replace(/^(\d{5})(\d)/,"$1-$2");
                            break;
                        case "cpf":
                            $(selector).attr("maxlength","14");
                            value = value.replace(/\D/g,"");
                            value = value.replace(/(\d{3})(\d)/,"$1.$2");
                            value = value.replace(/(\d{3})(\d)/,"$1.$2");
                            value = value.replace(/(\d{3})(\d{1,2})$/,"$1-$2");
                            break;
                        case "cnpj":
                            $(selector).attr("maxlength","18");
                            value=value.replace(/\D/g,"");
                            value=value.replace(/^(\d{2})(\d)/,"$1.$2");
                            value=value.replace(/^(\d{2})\.(\d{3})(\d)/,"$1.$2.$3");
                            value=value.replace(/\.(\d{3})(\d)/,".$1/$2");
                            value=value.replace(/(\d{4})(\d)/,"$1-$2");
                            break;
                        case "money":
                            value = value.replace(/\D/g,"");
                            value = value.replace(/(\d)(\d{8})$/,"$1.$2");
                            value = value.replace(/(\d)(\d{5})$/,"$1.$2");
                            value = value.replace(/(\d)(\d{2})$/,"$1,$2");
                            break;
                        case "number":
                            value = value.replace(/\D/g,"");
                            break;
                        default:
                            break;
                    }

                    event.target.value = value;
                };

                document.querySelector(selector).addEventListener('input', onInput);
            },

            setPolymerMirror: function(data){
                var mirror = data.type.properties.mirror;
                var id     = data.group.description + "." + data.description;

                if (mirror=="label" || mirror=="span"){
                    mirror = mirror + "." + id;
                }

                document.querySelector('[id="'+id+'"]').addEventListener('input', function(event) {
                    $("[id='"+mirror+"']").text(event.target.value);
                });

            }



        }
    });