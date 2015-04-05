/*================================================================
Service = <%= cameledName %>
==================================================================*/

app.service('<%= cameledName %>', ['$rootScope', '$q', '$http',  function ($rootScope, $q, $http) {

	'use strict';

	//GET method
	this.getUserData = function (url) {
    var defer = $q.defer();

    $http.get(url)
		.success(function (data) {
			deferred.resolve(data);
		})
		.error(function (err) {
			deferred.reject(err);
		});

		return deferred.promise;

  };

  //POST method
  this.postUserData = function (userData) {
    var defer = $q.defer();

    var url = ''; //POST url

    $http.post({
  		url : url,
  		data : userData
  	})
		.success(function (data) {
			deferred.resolve(data);
		})
		.error(function (err) {
			deferred.reject(err);
		});

		return deferred.promise;

  };

}]);

/*-----  End of Service = <%= cameledName %>  ------*/