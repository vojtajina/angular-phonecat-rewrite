/**
 * Main controller 
 */
function MainCtrl($route, $location, $window) {
  $route.when('/phones/', {template: 'partials/catalog.html', controller: CatalogCtrl});
	$route.when('/phones/:phoneId', {template: 'partials/detail.html', controller: DetailCtrl});

	$route.onChange(function() {
	  if ($location.hash === '') {
	    $location.updateHash('/phones/');
	  } else {
  	  var route = this.currentRoute = $route.current;
  	  route.scope.params = route.params;
  	  $window.scrollTo(0, 0);
	  }
	});
}

MainCtrl.$inject = ['$route', '$location', '$window'];

/**
 * Catalog (list) controller
 */
function CatalogCtrl(resource) {
  this.phones = resource.query();
  this.orderField = 'age';
}

CatalogCtrl.$inject = ['resourceCatalog'];

/**
 * Phone detail controller
 */
function DetailCtrl(resource) {
  this.phone = resource.get({phoneId: this.params.phoneId});
  this.selectedImg = 0;
  this.selectImg = function(index) {
    this.selectedImg = index;
  };
}

DetailCtrl.$inject = ['resourceDetail'];