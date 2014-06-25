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
            update : function(data, personId) {
                return $http.put(Config.getApiUrl() + '/company/' + companyId, data);
            }
        }
     });
