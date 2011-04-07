describe('phonecat app', function() {

  beforeEach(function() {
    browser().navigateTo('../../app/index.html');
  });

  it('should automatically redirect to catalog (/phones/) when location hash/fragment is empty', function() {
    expect(browser().location().hash()).toBe("/phones/");
  });

  describe('catalog', function() {

    beforeEach(function() {
      browser().navigateTo('#/phones/');
    });

    function numberOfPhones() {
      return element('ng\\:include ul.phones li').count();
    }

    it('should display all phones', function() {
      expect(numberOfPhones()).toBe(32);
    });

    it('should render sorting links', function() {
      var content = element('ng\\:include').text(); 
      expect(content).toMatch(/Sort by/);
      expect(content).toMatch(/Newest/);
      expect(content).toMatch(/Alphabetical/);
    });

    it('image should be link to phone detail', function() {
      element('ng\\:include ul.phones li#phone-nexus-s a.thumb').click();
      expect(browser().location().hash()).toBe("/phones/nexus-s");
    });

    it('title should be link to phone detail', function() {
      element('ng\\:include ul.phones li#phone-nexus-s a.title').click();
      expect(browser().location().hash()).toBe("/phones/nexus-s");
    });

    describe('sorting', function() {
      it('should sort by age', function() {
        element('#sort-age', 'Sort by newest link').click();
        expect(element('ng\\:include ul.phones li:first').attr('id')).toEqual('phone-nexus-s');
        expect(element('ng\\:include ul.phones li:last').attr('id')).toEqual('phone-htc-mytouch');
      });

      it('should sort by name', function() {
        element('#sort-name', 'Sort by alphabet link').click();
        expect(element('ng\\:include ul.phones li:first').attr('id')).toEqual('phone-dell-streak');
        expect(element('ng\\:include ul.phones li:last').attr('id')).toEqual('phone-t-mobile-mytouch-4g');
      });
    });

    describe('filtering', function() {
      it('should search by name', function() {
        input('predicate.$').enter('samsung');
        expect(numberOfPhones()).toBe(8);
      });

      it('should filter by carrier', function() {
        element('ul.carrier li:last a', 'Filter by Verizon link').click();
        expect(numberOfPhones()).toBe(7);
      });
    });
  });

  describe('detail', function() {
    beforeEach(function() {
      browser().navigateTo('#/phones/nexus-s');
    });

    it('should display phone details', function() {
      var content = element('ng\\:include').text(); 
      expect(content).toMatch(/Nexus S/);      
      expect(content).toMatch(/Nexus S is the next generation of Nexus devices/);
    });

    it('should display default image', function() {
      expect(element('ng\\:include img.phone').attr('src')).toEqual('http://www.google.com/phone/image/medium/709001');
    });

    it('should change the image', function() {
      element('ng\\:include ul.phone-thumbs li:last a').click();
      expect(element('ng\\:include img.phone').attr('src')).toEqual('http://www.google.com/phone/image/medium/712001');
    });
  });
});