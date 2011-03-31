describe('service', function() {
  var scope, browser, response;
  
  beforeEach(function() {
    this.addMatchers({
      toEqualAsynchronousData: function(expected) {
        browser.xhr.flush();
        return angular.equals(this.actual, expected);
      }
    });
  
    scope = angular.scope();
    browser = scope.$service('$browser');
    response = [{}];
  });
  
  describe('resourceDetail', function() {
    it('should load details of given phone', function() {
      browser.xhr.expectGET('/app/phones/2.json').respond(response);
      var resource = scope.$service('resourceDetail');
      expect(resource.query({phoneId: 2})).toEqualAsynchronousData(response);
    });
  });
  
  describe('resourceCatalog', function() {
    it('should load all phones', function() {
      browser.xhr.expectGET('/app/phones/all.json').respond(response);
      var resource = scope.$service('resourceCatalog');
      expect(resource.query()).toEqualAsynchronousData(response);
    });
  });
  
  // or test more low level (create instance without scope)
  // or test through controller
});