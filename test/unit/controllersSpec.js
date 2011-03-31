describe('controller', function() {
  var ctrl, scope, browser, response;
  beforeEach(function() {
    this.addMatchers({
      toEqualAsynchronousData: function(expected) {
        browser.xhr.flush();
        return angular.equals(this.actual, expected);
      }
    });

    scope = angular.scope();
    browser = scope.$service('$browser');
  });

  describe('main', function() {});

  describe('detail', function() {
    beforeEach(function() {
      scope.params = {phoneId: 2};
      response = {id: 2, name: 'Phone 2'};
      browser.xhr.expectGET('/app/phones/2.json').respond(response);
      ctrl = scope.$new(DetailCtrl);
    });

    it('should load phone data', function() {
      expect(ctrl.phone).toEqualAsynchronousData(response);
    });

    it('should set default image to 0', function() {
      expect(ctrl.selectedImg).toEqual(0);
    });
    
    it('should change image', function() {
      ctrl.selectImg(2);
      expect(ctrl.selectedImg).toEqual(2);
    });
  });

  describe('catalog', function() {
    beforeEach(function() {
      response = [{id: 1}, {id: 2}];
      browser.xhr.expectGET('/app/phones/all.json').respond(response);
      ctrl = scope.$new(CatalogCtrl);
    });

    it('should load phones', function() {
      expect(ctrl.phones).toEqualAsynchronousData(response);
    });

    it('should set default orderField to age', function() {
      expect(ctrl.orderField).toEqual('age');
    });
  });
});
