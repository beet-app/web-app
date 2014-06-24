BeetApp
    .factory('Person', function($http, Config) {
        return {
            getAttributes : function() {
                return $http.get(Config.getApiUrl() + '/attribute-grouped');
            },
            getPersons : function(companyId) {
                return $http.get(Config.getApiUrl() + "/" + companyId +'/person');
            },
            getOne : function(personId) {
                return $http.get(Config.getApiUrl() + '/person/' + personId);
            },            
            getPostCodeDetails : function(postcode) {
                return $http.get('http://api.postmon.com.br/v1/cep/' + postcode,{withCredentials : false});
            },
            create : function(data) {
                return $http.post(Config.getApiUrl() + '/person', data);
            },
            update : function(data, personId) {
                return $http.put(Config.getApiUrl() + '/person/' + personId, data);
            }

 
        }
     });
