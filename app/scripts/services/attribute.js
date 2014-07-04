BeetApp
    .factory('Attribute', function($http, Config) {
        return {
            getByModule : function(moduleId) {
                
                return $http.get(Config.getApiUrl() + '/attribute-grouped/' + moduleId);
            },          
            getPostCodeData : function(postcode) {
                return $http.get('http://api.postmon.com.br/v1/cep/' + postcode,{withCredentials : false});
            },            
        }
     });
