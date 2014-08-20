BeetApp
    .directive("attribute", function (Attribute, $timeout, $interval) {


        return {
            //replace: true,
            restrict: 'E',
            scope: {data: '=',dataset: '='},
            //require:'^PersonController', //, options: '=', placeholder: '@', ngModel: '='
            link: function(scope, element) {

                var value      = "";
                var data       = scope.data;
                var moduleData = scope.dataset;
                var id         = data.group.description + "." + data.description;

                if (moduleData != undefined){
                    if (moduleData.attributes != undefined){
                        if (moduleData.attributes[data.group.description] != undefined){
                            if (moduleData.attributes[data.group.description] != undefined){
                                if (moduleData.attributes[data.group.description][data.description] != undefined){
                                    value = moduleData.attributes[data.group.description][data.description];
                                }
                            }
                        }
                    }
                }

                if (data.type.template.toLowerCase() == "text"){
                    setTimeout(function() {
                            document.querySelector('[id="'+id+'"]').addEventListener('input', function(event) {
                                document.querySelector('[id="' + id + '"]').commit();
                            });
                        },1000
                    );
                }

                if (data.type.template.toLowerCase() == "radio"){
                    if (value!="") {
                        setTimeout(function () {
                                document.querySelector('[name="' + value + '"]').checked = true;
                                document.querySelector('[id="' + id + '"]').selected = value;
                                document.querySelector('[id="' + id + '"]').selectedChanged();
                                //document.querySelector('[id="' + id + '"]').updateSelectedItem();
                            }, 200
                        );
                    }
                }

                if (data.type.properties != undefined){
                    if (data.type.properties.mirror != undefined){
                        setTimeout(function() {
                                setPolymerMirror(data);
                            },1000
                        );
                    }
                }

                if (data.type.properties != undefined){
                    if (data.type.properties.mask != undefined){

                        setTimeout(function() {
                                setPolymerMask(data);
                            },1000
                        );
                    }
                }
                //$("[id='person_data.postcode']").mask("00000-000");
                /*
                 $("[id='person_data.postcode']").keyup(function(){
                 alert($("[id='person_data.postcode']").find("input").length);
                 $("[id='person_data.postcode']").find("input").each(function(){
                 alert($(this).val());
                 });
                 });
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


                 */

                //);


                scope.value=value;
                scope.templateUrl="views/directives/"+scope.data.type.template.toLowerCase()+".html";
            },
            template: '<div ng-include="templateUrl"></div>'

        }

    });
