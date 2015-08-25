/*================================================================
App <%= site_name %>
==================================================================*/
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
