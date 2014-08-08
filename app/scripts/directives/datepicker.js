/*
BeetApp.directive("datepickerk", function () {
  return {
    replace: true,
    restrict: 'E',
    template:
        "<div class='input-append date' id='dpYears' data-date='19/12/1991' data-date-format='dd/mm/yyyy' data-date-viewmode='years' style='width:200px;'>"
                         +      "<input class='form-control input-lg' style='width:160px;' type='text'  readonly=''>"
                         +      "<img src='images/icons/calendar-icon.png' class=' add-on' style='margin-top:-8px;margin-left:-38px;' />"
                         + "</div>",
  link: function (scope, element) {
          $(function(){
                        $('#dpYears').datepicker();
                    });
    }




  };
});*/

BeetApp.directive("datepicker", function () {
    return {
        replace: true,
        restrict: 'E',
        scope: { data: '='}, //, options: '=', placeholder: '@', ngModel: '='
        templateUrl:'views/directives/datepicker.html',
        link: function (scope, element) {
            scope.value="";
            $(function(){
                $('#dpYears').datepicker();
            });
        }




    };
});