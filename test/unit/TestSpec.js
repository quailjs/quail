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
    expect(_test).to.be.instanceof(quail.lib.Test);
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
      expect(_test[0]).to.be.instanceof(quail.lib.Case);
      expect(_test[0].get('status')).to.equal('failed');
      expect(_test[1]).to.be.instanceof(quail.lib.Case);
      expect(_test[1].get('status')).to.equal('failed');
    });

    it('should create one Case', function () {
      var options = _test.get('options');
      options.selector = 'a.unittest.malarkey';
      _test.set('options', options);
      _test.invoke();

      expect(_test.length).to.equal(1);
      expect(_test[0]).to.be.instanceof(quail.lib.Case);
      expect(_test[0].get('status')).to.equal('passed');
    });

    it('should create one Case', function () {
      var options = _test.get('options');
      options.selector = 'a.unittest.fail';
      _test.set('options', options);
      _test.invoke();

      expect(_test.length).to.equal(1);
      expect(_test[0]).to.be.instanceof(quail.lib.Case);
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
    var _testCollection;

    beforeEach(function () {
      _testCollection = new quail.lib.TestCollection();
      _test = new quail.lib.Test('fakeLinkTest', {
        'type': 'selector',
        'options': {
          'selector': 'a.unittest',
        },
        'scope': scope
      });
    });

    describe('each', function () {
      it('should create two Cases', function (done) {
        _testCollection.listenTo(_test, 'complete', function (eventName, thisTest, _case) {
          expect(_test.length).to.equal(2);
          done();
        });
        _test.invoke();
      });

      it('should iterate over the two cases', function (done) {
        var spy = sinon.spy();
        _testCollection.listenTo(_test, 'complete', function (eventName, thisTest, _case) {
          _test.each(spy);
          sinon.assert.calledTwice(spy);
          done();
        });
        _test.invoke();
      });
    });

    describe('findCasesBySelector', function () {
      it('should find cases by selector', function (done) {
        _testCollection.listenTo(_test, 'complete', function (eventName, thisTest, _case) {
          var cases = thisTest.findCasesBySelector('a[href="#"].fail.unittest');
          cases = cases.concat(thisTest.findCasesBySelector('a[href="#"].pass.unittest'));
          expect(cases.length).to.equal(2);
          done();
        });
        _test.invoke();
      });
    });

    describe('findByStatus', function () {
      it('should find cases by status', function (done) {
        _testCollection.listenTo(_test, 'complete', function (eventName, thisTest, _case) {
          var cases = _test.findByStatus('failed');
          expect(cases.length).to.equal(2);
          done();
        });
        _test.invoke();
      });
    });

    describe('groupCasesBySelector', function () {
      it('should group cases by selector', function (done) {
        var options = _test.get('options');
        options.selector = 'i.unittest';
        _test.set('options', options);

        _testCollection.listenTo(_test, 'complete', function (eventName, thisTest, _case) {
          var casesBySelector = thisTest.groupCasesBySelector();
          expect(casesBySelector['i.unittest'].length).to.equal(10);
          done();
        });
        _test.invoke();
      });
    });
  });

  describe('groupCasesByHtml', function () {
    var _test;
    var _testCollection;

    beforeEach(function () {
      _testCollection = new quail.lib.TestCollection();
      _test = new quail.lib.Test('testCompleteTest', {
        'type': 'selector',
        'options': {
          'selector': 'i.unittest'
        },
        'scope': scope
      });
    });

    it('should group cases by HTML', function (done) {
      _testCollection.listenTo(_test, 'complete', function (eventName, thisTest, _case) {
        var casesByHtml = thisTest.groupCasesByHtml();
        expect(casesByHtml['<i class="unittest">fake italic tag</i>'].length).to.equal(10);
        done();
      });
      _test.invoke();
    });
  });

  describe('getGuidelineCoverage', function () {
    it('should expose its guideline coverage', function () {
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
      var _test = new quail.lib.Test('fakeLinkTest', {
        'type': 'selector',
        'guidelines': g,
        'options': {
          'selector': 'i.unittest',
        },
        'scope': scope
      });
      var coverage = _test.getGuidelineCoverage('wcag');
      expect(coverage).to.deep.equal(sc);
    });
  });

  describe('event dispatching', function () {

    beforeEach(function () {
      _testCollection = new quail.lib.TestCollection();
    });

    describe('resolve event', function () {

      beforeEach(function () {
        _test = new quail.lib.Test('testCompleteTest', {
          'type': 'selector',
          'options': {
            'selector': 'b.unittest'
          },
          'scope': scope
        });
      });

      it('should fire the resolved event', function (done) {
        _testCollection.listenTo(_test, 'resolve', function (eventName, thisTest, _case) {
          expect(eventName).to.equal('resolve');
          done();
        });
        _test.invoke();
      });
    });

    describe('complete event', function () {
      var spy;
      var callback;

      beforeEach(function () {
        _test = new quail.lib.Test('testCompleteTest', {
          'type': 'selector',
          'options': {
            'selector': 'i.unittest'
          },
          'scope': scope
        });
      });

      it('should fire the event when all test cases are complete', function (done) {
        this.timeout(2500);
        callback = function (eventName, thisTest) {
          expect(thisTest.length).to.equal(10);
          expect(eventName).to.equal('complete');
          done();
        };
        spy = sinon.spy(callback);
        // The complete event should only be invoked once.
        _testCollection.listenTo(_test, 'complete', spy);
        _test.invoke();
      });

      it('should fire the event when a test case times out', function (done) {
        this.timeout(2500);
        callback = function (eventName, thisTest) {
          expect(thisTest.length).to.equal(11);
          expect(eventName).to.equal('complete');
          done();
        };
        spy = sinon.spy(callback);
        // The complete event should only be invoked once.
        _testCollection.listenTo(_test, 'complete', spy);
        _test.add(new quail.lib.Case());
        _test.invoke();
      });
    });
  });
});
