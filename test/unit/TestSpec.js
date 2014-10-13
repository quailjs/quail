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
});

/**
 * Test Class.

test('Invoke/custom', function () {
  expect(3);
  var cb = function (quail) {
    ok(quail, 'The custom callback was invoked');
  };
  __testQuail['customCallback'] = cb;
  __testQuail.components.customCallback = cb;
  var _test = new libs.Test('fakeLinkTest', {
    'type': 'custom',
    'callback': cb
  });
  _test.invoke();
  _test = new libs.Test('fakeLinkTest', {
    'type': 'custom',
    'callback': 'customCallback'
  });
  _test.invoke();
  _test = new libs.Test('fakeLinkTest', {
    'type': 'customCallback'
  });
  _test.invoke();
});
test('Iteration', function () {
  var _test = new libs.Test('fakeLinkTest', {
    'type': 'selector',
    'options': {
      'selector': 'a.unittest',
    }
  });
  _test.invoke();
  equal(_test.length, 2, 'Two Cases were created');
  var i;
  _test.each(function (index, _case) {
    i = index;
    ok(_case instanceof libs.Case, 'Case is the constructor of _case');
  });
  equal(i, 1, 'Test.fn.each looped 2 times');
});
test('findCasesBySelector', function () {
  var cases;
  var _test = new libs.Test('fakeLinkTest', {
    'type': 'selector',
    'options': {
      'selector': 'a.unittest',
    }
  });
  _test.invoke();
  cases = _test.findCasesBySelector('a.unittest');
  equal(cases.length, 2, 'Cases are grouped by selector');
});
test('findByStatus', function () {
  var cases;
  var _test = new libs.Test('fakeLinkTest', {
    'type': 'selector',
    'options': {
      'selector': 'a.unittest',
    }
  });
  _test.invoke();
  equal(_test.length, 2, 'Two Cases were created');
  // Filter by statuses.
  cases = _test.findByStatus('failed');
  equal(cases.length, 2, 'Two cases found.');
});
test('groupCasesBySelector', function () {
  var _test = new libs.Test('fakeLinkTest', {
    'type': 'selector',
    'options': {
      'selector': 'i.unittest',
    }
  });
  _test.invoke();
  var casesBySelector = _test.groupCasesBySelector();
  equal(casesBySelector['i.unittest'].length, 10, 'Cases are grouped by selector');
});
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
