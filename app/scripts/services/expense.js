BeetApp
    .factory('Expense', function($http, Config) {
        return {
            getByPersonAndInterval : function(personId, initialDate, finalDate) {
                return $http.get(Config.getApiUrl() + "/expense/" + personId + "/" + initialDate + "/" + finalDate);
            },
            getOne : function(expenseId) {
                return $http.get(Config.getApiUrl() + '/expense/' + personId);
            },   
            getByCompany : function(companyId) {
                return $http.get(Config.getApiUrl() + "/" + companyId + '/expense');
            }, 
            create : function(data) {
                return $http.post(Config.getApiUrl() + '/expense', data);
            },
            update : function(data, _id) {
                return $http.put(Config.getApiUrl() + '/expense/' + _id, data);
            }
        }
     });