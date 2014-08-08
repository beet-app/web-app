BeetApp
    .directive("attribute", function () {


        return {
            //replace: true,
            restrict: 'E',
            scope: { module: '@', data: '='}, //, options: '=', placeholder: '@', ngModel: '='
            link: function(scope, element) {
                scope.templateUrl="views/directives/"+scope.data.type.template.toLowerCase()+".html";
            },
            template: '<div ng-include="templateUrl"></div>'
        }

    });
