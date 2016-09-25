angular.module('springboardApp')
.factory('path', ['$http', '$rootScope', function($http, $rootScope) {

  return {
	
	getPaths: function(){
		return $http({
        url: 'https://hackerearth.0x10.info/api/learning-paths?type=json&query=list_paths',
        method: "GET"
        })
        .success(function(data) {
        });
	},

  };
}]);