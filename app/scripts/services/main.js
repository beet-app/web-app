angular.module('MainService', [])

    // super simple service
    // each function returns a promise object
    .factory('Main', function($http) {
        return {
            getMenus : function() {
                return $http.get('sadsad' + '/menu');
            }
        }
     });