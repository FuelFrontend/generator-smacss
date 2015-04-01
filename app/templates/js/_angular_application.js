/*================================================================
	    App <%= site_name %>
==================================================================*/
/*global angular*/

'use strict';

var app = angular.module('<%= site_name %>', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('', {
			controller: '',
			templateUrl: ''
		})

		.otherwise({ redirectTo: '/' });
}]);

