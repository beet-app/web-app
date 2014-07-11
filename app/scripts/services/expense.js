BeetApp
    .factory('Expense', function($http, Config) {
        return {
            getByCompany : function(companyId) {
                return $http.get(Config.getApiUrl() + "/" + companyId +'/expense');
            },
            getOne : function(expenseId) {
                return $http.get(Config.getApiUrl() + '/expense/' + personId);
            },            
            create : function(data) {
                return $http.post(Config.getApiUrl() + '/expense', data);
            },
            update : function(data, expenseId) {
                return $http.put(Config.getApiUrl() + '/expense/' + expenseId, data);
            }
        }
     });