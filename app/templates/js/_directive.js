/*================================================================
Directive = <%= cameledName %>
==================================================================*/

app.directive('<%= cameledName %>', ['$rootScope', function ($rootScope) {
  'use strict';

	return {
		restrict: 'A',
		link: function (scope, element, attrs) {
			console.log('Directive === <%= cameledName %>');
		}
	};

}]);

/*-----  End of Directive = <%= cameledName %>  ------*/