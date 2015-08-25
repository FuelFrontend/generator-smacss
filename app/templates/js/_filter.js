/*================================================================
Filter = <%= cameledName %>
==================================================================*/

app.filter('<%= cameledName %>', function () {
	'use strict';

	return function (input) {
		console.log('Filter == <%= cameledName %>');
		return;
	};
});

/*-----  End of Filter = <%= cameledName %>  ------*/
