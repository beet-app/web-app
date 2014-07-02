BeetApp
    .factory('Config', function() {
        return {
            getApiUrl : function() {
            	return 'http://127.0.0.1:1313/api';
                //return 'http://beet-api.herokuapp.com/api';
                //return 'http://201.87.228.140:1313/api';

            }
        }
     });