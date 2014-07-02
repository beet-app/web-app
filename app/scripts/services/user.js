BeetApp
    .factory('User', function($http, Config) {
        return {
            getAttributes : function(moduleId) {
                moduleId = "53b2fb74f99195680b000002";
                return $http.get(Config.getApiUrl() + '/attribute-grouped/' + moduleId);
            },
            getOne : function(_id) {
                return $http.get(Config.getApiUrl() + '/user/' + _id);
            },            
            getPostCodeDetails : function(postcode) {
                return $http.get('http://api.postmon.com.br/v1/cep/' + postcode,{withCredentials : false});
            },
            update : function(data, _id) {
                return $http.put(Config.getApiUrl() + '/user/' + _id, data);
            }

 
        }
     });
