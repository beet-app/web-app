BeetApp
    .factory('Person', function($http, Config) {
        return {
            getByCompany : function(companyId) {
                return $http.get(Config.getApiUrl() + "/" + companyId +'/person');
            },
            getOne : function(personId) {
                return $http.get(Config.getApiUrl() + '/person/' + personId);
            },            
            create : function(data) {
                return $http.post(Config.getApiUrl() + '/person', data);
            },
            update : function(data, personId) {
                return $http.put(Config.getApiUrl() + '/person/' + personId, data);
            }

 
        }
     });
