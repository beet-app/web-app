BeetApp
    .factory('Person', function($http, Config) {
        return {
            getAttributes : function() {
                return $http.get(Config.getApiUrl() + '/attribute');
            },
            getPersons : function() {
                return $http.get(Config.getApiUrl() + '/person');
            },
            getPostCodeDetails : function(postcode) {
                $http.defaults.withCredentials = false;
                return $http.get('http://api.postmon.com.br/v1/cep/' + postcode);
            },
            create : function(data) {
                return $http.post(Config.getApiUrl() + '/person', data);
            }

        }
     });
