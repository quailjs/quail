describe("Case", function() {
  var _case;
  beforeEach(function () {
    _case = new quail.lib.Case({
      bird: 'sandpiper'
    });
  });
  it('should be an instance of Case', function () {
    expect(_case).to.be.instanceof(quail.lib.Case);
  });
  describe('get/set', function () {
    it('should retrieve attributes', function () {
      expect(_case.get('bird')).to.equal('sandpiper');
    });
    it('should set with a key/value argument pair', function () {
      _case.set('mammal', 'bear');
      expect(_case.get('mammal')).to.equal('bear');
    });
    it('should set with an object argument', function () {
      _case.set({'reptile': 'iguana'});
      expect(_case.get('reptile')).to.equal('iguana');
    });
  });
  describe('defineUniqueSelector', function() {
    var p;
    beforeEach(function () {
      var el = document.createElement('div');
      el.setAttribute('id', 'defineUniqueSelector-1');
      p = document.createElement('p');
      p.textContent = 'First paragraph';
      el.appendChild(p);

      _case = new quail.lib.Case({
        element: el
      });
      _case.resolve();
    });

    it('should create a unique selector', function () {
      expect(_case.get('selector')).to.equal('#defineUniqueSelector-1');
    });

    it('should store an html representation of the case target', function () {
      expect(_case.get('html')).to.equal('<div id="defineUniqueSelector-1"><p>First paragraph</p></div>');
    });
  });

  describe('setting element property', function () {
    var p;
    beforeEach(function () {
      var el = document.createElement('div');
      el.setAttribute('id', 'defineUniqueSelector-1');
      p = document.createElement('p');
      p.textContent = 'First paragraph';
      el.appendChild(p);

      _case = new quail.lib.Case();
      _case.set({
        element: p
      });
      _case.resolve();
    });

    it('should work', function () {
      expect(_case.get('selector')).to.equal('#defineUniqueSelector-1 p');
    });

    it('should store an html representation of the updated case target', function () {
      expect(_case.get('html')).to.equal('<p>First paragraph</p>');
    });
  });

});
