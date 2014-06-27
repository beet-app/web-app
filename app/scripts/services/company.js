BeetApp
    .factory('Company', function($http, Config) {
        return {
            get : function() {
                return $http.get(Config.getApiUrl() + '/company');
            },
            getOne : function(companyId) {
                return $http.get(Config.getApiUrl() + '/company/' + companyId);
            },            
            create : function(data) {
                return $http.post(Config.getApiUrl() + '/company', data);
            },
            update : function(data, companyId) {
                return $http.put(Config.getApiUrl() + '/company/' + companyId, data);
            },
            getAttributes : function(moduleId) {
                moduleId = "53ad6b5b964efb2010000002";
                return $http.get(Config.getApiUrl() + '/attribute-grouped/' + moduleId);

            },          
            getPostCodeDetails : function(postcode) {
                return $http.get('http://api.postmon.com.br/v1/cep/' + postcode,{withCredentials : false});
            },            
        }
     });
