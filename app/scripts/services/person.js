BeetApp
    .factory('Person', function($http, $q, Config) {
        return {
            getByCompany : function(companyId) {
                var defer = $q.defer();
                $http.get(Config.getApiUrl() + "/" + companyId +'/person')
                    .success(function(data){
                        defer.resolve(data);
                    })
                    .error(function(data){
                        defer.resolve(data);
                    });                
                return defer.promise;
            },
            getOne : function(personId) {
                var defer = $q.defer();
                $http.get(Config.getApiUrl() + '/person/' + personId)
                    .success(function(data){
                        defer.resolve(data);
                    })
                    .error(function(data){
                        defer.resolve(data);
                    });
                return defer.promise;
            },            
            create : function(data) {
                return $http.post(Config.getApiUrl() + '/person', data);
            },
            update : function(data, personId) {
                return $http.put(Config.getApiUrl() + '/person/' + personId, data);
            }

 
        }
     });
