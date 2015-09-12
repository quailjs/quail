import quail from '../../src/quail';

describe('textNodeFilter', function () {
  var filter;
  var element;

  beforeEach(function () {
    filter = quail.components.textNodeFilter;
  });
  describe('given an element without content', function () {
    beforeEach(function () {
      element = $('<div></div>').get(0);
    });
    it('should return false', function () {
      expect(filter(element)).to.be.false;
    });
  });
  describe('given an element without text nodes', function () {
    beforeEach(function () {
      element = $('<div><p>hello</p></div>').get(0);
    });
    it('should return false', function () {
      expect(filter(element)).to.be.false;
    });
  });
  describe('given an element with text nodes that are only whitespace', function () {
    beforeEach(function () {
      element = $([
        '<div>',
          '            \n',
          '            \n',
        '</div>'
      ].join('\n')).get(0);
    });
    it('should return false', function () {
      expect(filter(element)).to.be.false;
    });
  });
  describe('given an element with a text node', function () {
    beforeEach(function () {
      element = $([
        '<div>',
          'hi',
        '</div>'
      ].join('\n')).get(0);
    });
    it('should return true', function () {
      expect(filter(element)).to.be.true;
    });
  });
  describe('given an element with a text node and whitespace text nodes', function () {
    beforeEach(function () {
      element = $([
        '<div>',
          '            \n',
          'hi',
          '            \n',
        '</div>'
      ].join('\n')).get(0);
    });
    it('should return true', function () {
      expect(filter(element)).to.be.true;
    });
  });
  describe('given an element with a text node and a dom node', function () {
    beforeEach(function () {
      element = $([
        '<div>',
          '<p>derp</p>',
          'hi',
        '</div>'
      ].join('\n')).get(0);
    });
    it('should return true', function () {
      expect(filter(element)).to.be.true;
    });
  });
  describe('given an element with just dom nodes', function () {
    beforeEach(function () {
      element = $([
        '<div>',
          '<p>derp</p>',
          '<p>derp</p>',
          '<p>derp</p>',
          '<p>derp</p>',
          '<p>derp</p>',
        '</div>'
      ].join('\n')).get(0);
    });
    it('should return false', function () {
      expect(filter(element)).to.be.false;
    });
  });
  describe('given an element with dom nodes and whitespace text nodes', function () {
    beforeEach(function () {
      element = $([
        '<div>',
          '<p>derp</p>',
          '            \n',
          '<p>derp</p>',
          '            \n',
          '<p>derp</p>',
          '            \n',
          '<p>derp</p>',
          '            \n',
          '<p>derp</p>',
          '            \n',
        '</div>'
      ].join('\n')).get(0);
    });
    it('should return false', function () {
      expect(filter(element)).to.be.false;
    });
  });
  describe('given an element with dom nodes, whitespace text nodes, and one real text node', function () {
    beforeEach(function () {
      element = $([
        '<div>',
          '<p>derp</p>',
          '            \n',
          '<p>derp</p>',
          '            \n',
          '<p>derp</p>',
          '            \n',
          '<p>derp</p>',
          '            \n',
          '<p>derp</p>',
          '            \n',
          'hi',
        '</div>'
      ].join('\n')).get(0);
    });
    it('should return true', function () {
      expect(filter(element)).to.be.true;
    });
  });
});
