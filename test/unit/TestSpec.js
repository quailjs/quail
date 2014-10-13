describe('Test', function () {
  var _test;
  var scope;

  beforeEach(function () {
    _test = new quail.lib.Test('peregrine', {
      'bird': 'falcon'
    });

    // Create Dom elements for the test scope.
    var div = document.createElement('div');
    var html = '';
    html += '<a href="#" class="fail unittest">fake link</a>';
    html += '<a href="#" class="pass unittest">fake link</a>';
    html += '<b class="unittest">fake bold tag</b>';
    html += '<i class="unittest">fake italic tag</i>';
    html += '<i class="unittest">fake italic tag</i>';
    html += '<i class="unittest">fake italic tag</i>';
    html += '<i class="unittest">fake italic tag</i>';
    html += '<i class="unittest">fake italic tag</i>';
    html += '<i class="unittest">fake italic tag</i>';
    html += '<i class="unittest">fake italic tag</i>';
    html += '<i class="unittest">fake italic tag</i>';
    html += '<i class="unittest">fake italic tag</i>';
    html += '<i class="unittest">fake italic tag</i>';
    div.innerHTML = html;
    scope = div;
  });

  it('should be an instance of Test', function () {
    expect(_test instanceof quail.lib.Test).to.be.true;
  });

  describe('Get/Set', function () {
    it('should retrieve attributes', function () {
      expect(_test.get('name')).to.equal('peregrine');
      expect(_test.get('bird')).to.equal('falcon');
    });

    it('should set with a key/value argument pair', function () {
      _test.set('mammal', 'bear');
      expect(_test.get('mammal')).to.equal('bear');
    });

    it('should set with an object argument', function () {
      _test.set({
        'reptile': 'iguana'
      });
      expect(_test.get('reptile')).to.equal('iguana');
    });
  });

  describe('Invoke/selector', function () {
    beforeEach(function () {
      _test = new quail.lib.Test('fakeLinkTest', {
        'type': 'selector',
        'options': {
          'selector': 'a.unittest',
        },
        'scope': scope
      });
    });

    it('should create two Cases', function () {
      _test.invoke();
      expect(_test.length).to.equal(2);
      expect(_test[0] instanceof quail.lib.Case).to.be.true;
      expect(_test[0].get('status')).to.equal('failed');
      expect(_test[1] instanceof quail.lib.Case).to.be.true;
      expect(_test[1].get('status')).to.equal('failed');
    });

    it('should create one Case', function () {
      var options = _test.get('options');
      options.selector = 'a.unittest.malarkey';
      _test.set('options', options);
      _test.invoke();

      expect(_test.length).to.equal(1);
      expect(_test[0] instanceof quail.lib.Case).to.be.true;
      expect(_test[0].get('status')).to.equal('passed');
    });

    it('should create one Case', function () {
      var options = _test.get('options');
      options.selector = 'a.unittest.fail';
      _test.set('options', options);
      _test.invoke();

      expect(_test.length).to.equal(1);
      expect(_test[0] instanceof quail.lib.Case).to.be.true;
      expect(_test[0].get('status')).to.equal('failed');
    });
  });

  describe('invoke/custom', function () {
    var _test;
    var spy;
    var options;
    beforeEach(function () {
      var cb = function (quail) {};
      spy = sinon.spy(cb);
      quail.customCallback = spy;
    });

    it('should invoke a custom callback', function () {
      options = {
        'type': 'custom',
        'callback': spy
      };
      _test = new quail.lib.Test('fakeLinkTest', options);
      _test.invoke();
      sinon.assert.calledWith(spy, quail, _test, quail.lib.Case);
    });

    it('should invoke a callback', function () {
      quail.customCallback = spy;
      options = {
        'type': 'customCallback'
      };
      _test = new quail.lib.Test('fakeLinkTest', options);
    });
  });

  describe('methods', function () {
    var _test;

    beforeEach(function () {
      _test = new quail.lib.Test('fakeLinkTest', {
        'type': 'selector',
        'options': {
          'selector': 'a.unittest',
        },
        'scope': scope
      });
    });

    describe('each', function () {
      it('should create two Cases', function () {
        _test.invoke();
        expect(_test.length).to.equal(2);
      });

      it('should iterate over the two cases', function () {
        var spy = sinon.spy();
        _test.invoke();
        _test.each(spy);
        sinon.assert.calledTwice(spy);
      });
    });

    describe('findCasesBySelector', function () {
      it('should find cases by selector', function () {
        _test.invoke();
        var cases = _test.findCasesBySelector('a.unittest');
        expect(cases.length).to.equal(2);
      });
    });

    describe('findByStatus', function () {
      it('should find cases by status', function () {
        _test.invoke();
        var cases = _test.findByStatus('failed');
        expect(cases.length).to.equal(2);
      });
    });

    describe('groupCasesBySelector', function () {
      it('should group cases by selector', function () {
        var options = _test.get('options');
        options.selector = 'i.unittest';
        _test.set('options', options);
        _test.invoke();
        var casesBySelector = _test.groupCasesBySelector();
        expect(casesBySelector['i.unittest'].length).to.equal(10);
      });
    });
  });
});

/**
 * Test Class.
asyncTest('groupCasesByHtml', function () {
  expect(1);
  var _testCollection = new libs.TestCollection();
  var _test = new libs.Test('testCompleteTest', {
    'type': 'selector',
    'options': {
      'selector': 'i.unittest'
    }
  });
  _testCollection.listenTo(_test, 'complete', function (eventName, thisTest, _case) {
    var casesByHtml = thisTest.groupCasesByHtml();
    equal(casesByHtml['<i class="unittest">fake italic tag</i>'].length, 10, 'Cases are grouped by html');
    start();
  });
  _test.invoke();
});
test('getGuidelineCoverage', function () {
  var sc = {
    '1.1.1': {
      'techniques': [
        "F65",
        "G74",
        "H24"
      ]
    },
    '1.4.3': {
      'techniques': [
        "G145"
      ]
    }
  };
  var g = {
    'wcag': sc
  };
  var _test = new libs.Test('fakeLinkTest', {
    'type': 'selector',
    'guidelines': g,
    'options': {
      'selector': 'i.unittest',
    }
  });
  var coverage = _test.getGuidelineCoverage('wcag');
  deepEqual(coverage, sc);
});
asyncTest('Event dispatching: resolved', function () {
  expect(1);
  var _testCollection = new libs.TestCollection();
  var _test = new libs.Test('testCompleteTest', {
    'type': 'selector',
    'options': {
      'selector': 'b.unittest'
    }
  });
  _testCollection.listenTo(_test, 'resolve', function (eventName, thisTest, _case) {
    ok(eventName === 'resolve', 'Test bubbles up Case resolve events');
    start();
  });
  _test.invoke();
});
asyncTest('Event dispatching: complete', function () {
  expect(2);
  var count = 0;
  var _testCollection = new libs.TestCollection();
  // This selects 10 instances of this element.
  var _test = new libs.Test('testCompleteTest', {
    'type': 'selector',
    'options': {
      'selector': 'i.unittest'
    }
  });
  // The complete event should only be invoked once.
  _testCollection.listenTo(_test, 'complete', function (eventName, thisTest) {
    equal(thisTest.length, 11, 'Eleven Cases resolved.');
    ok(eventName === 'complete', 'Test dispatches a complete event when all Cases have resolved.');
    start();
  });
  // Add a Case that will time out.
  _test.add(new libs.Case());
  _test.invoke();
});
*/
