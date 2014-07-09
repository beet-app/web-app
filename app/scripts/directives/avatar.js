BeetApp
    .directive("avatar", function () {
        return {
            replace: true,
            restrict: 'E',
            scope: { module: '@', photo: '@', scale: '@', class: '@'}, //, options: '=', placeholder: '@', ngModel: '=' 
            templateUrl:"views/directives/avatar.html",
            compile: function(tElem,attrs) {             
                //do optional DOM transformation here
                return function(scope,elem,attrs) {
                      scope.$watch('photo', function(newValue) {
                        $.get(attrs.src)
                            .fail(function() {
                                $("[src='"+attrs.src+"']").attr("src", "images/uploads/"+scope.module+"/default.png");
                            });  
                      }, true);   
                }
            }      

        }
    });
