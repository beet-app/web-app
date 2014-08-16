BeetApp
    .directive("attribute", function () {


        return {
            //replace: true,
            restrict: 'E',
            scope: {data: '=',dataset: '='},
            //require:'^PersonController', //, options: '=', placeholder: '@', ngModel: '='
            link: function(scope, element) {

                var value      = "";
                var data       = scope.data;
                var moduleData = scope.dataset;


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

                scope.value=value;
                scope.templateUrl="views/directives/"+scope.data.type.template.toLowerCase()+".html";
            },
            template: '<div ng-include="templateUrl"></div>'
        }

    });
