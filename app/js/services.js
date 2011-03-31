/**
 * Simple RESTful resource for phone detail
 */
angular.service('resourceDetail', function($resource) {
	return $resource('/app/phones/:phoneId.json');
}, {$inject: ['$resource']});

/**
 * Simple RESTful resource for phone catalog (list of phones)
 */
angular.service('resourceCatalog', function($resource) {
	return $resource('/app/phones/all.json');
}, {$inject: ['$resource']});
