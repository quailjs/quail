import quail from '../../src/quail';

describe('Test', function () {
  var _test;

  beforeEach(function () {
    quail['peregrine'] = function () {};
    _test = new quail.lib.Test('peregrine', {
      'bird': 'falcon'
    });
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
      // Create two failed cases.
      quail['fakeLinkTest'] = function (quail, test, Case) {
        for (var i = 0, il = 2; i < il; ++i) {
          test.add(Case({
            element: $('<span></span>')[0],
            status: 'failed'
          }));
        }
      };
      _test = new quail.lib.Test('fakeLinkTest');
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
      // Create one passed case.
      quail['fakeLinkTest'] = function (quail, test, Case) {
        test.add(Case({
          element: $('<span></span>')[0],
          status: 'passed'
        }));
      };
      _test.invoke();

      expect(_test.length).to.equal(1);
      expect(_test[0]).to.be.instanceof(quail.lib.Case);
      expect(_test[0].get('status')).to.equal('passed');
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
  });

  describe('methods', function () {
    var _test;
    var _testCollection;

    beforeEach(function () {
      _testCollection = new quail.lib.TestCollection();
      quail['fakeLinkTest'] = function (quail, test, Case) {
        for (var i = 0, il = 5; i < il; ++i) {
          test.add(Case({
            element: $('<span class="koala"></span>')[0],
            status: 'passed'
          }));
          test.add(Case({
            element: $('<span class="piggy"></span>')[0],
            status: 'failed'
          }));
        }
      };
      _test = new quail.lib.Test('fakeLinkTest');
    });

    describe('each', function () {
      it('should create two Cases', function (done) {
        _testCollection.listenTo(_test, 'complete', function (eventName, thisTest, _case) {
          expect(_test.length).to.equal(10);
          done();
        });
        _test.invoke();
      });

      it('should iterate over the two cases', function (done) {
        var spy = sinon.spy();
        _testCollection.listenTo(_test, 'complete', function (eventName, thisTest, _case) {
          _test.each(spy);
          sinon.assert.callCount(spy, 10);
          done();
        });
        _test.invoke();
      });
    });

    describe('findCasesBySelector', function () {
      it('should find cases by selector', function (done) {
        _testCollection.listenTo(_test, 'complete', function (eventName, thisTest, _case) {
          var len = thisTest.findCasesBySelector('span.koala').length;
          len += thisTest.findCasesBySelector('span.piggy').length;
          expect(len).to.equal(10);
          done();
        });
        _test.invoke();
      });
    });

    describe('findByStatus', function () {
      it('should find cases by status', function (done) {
        _testCollection.listenTo(_test, 'complete', function (eventName, thisTest, _case) {
          var cases = _test.findByStatus('failed');
          expect(cases.length).to.equal(5);
          done();
        });
        _test.invoke();
      });
    });

    describe('groupCasesBySelector', function () {
      it('should group cases by selector', function (done) {
        _testCollection.listenTo(_test, 'complete', function (eventName, thisTest, _case) {
          var casesBySelector = thisTest.groupCasesBySelector();
          expect(casesBySelector['span.koala'].length).to.equal(5);
          expect(casesBySelector['span.piggy'].length).to.equal(5);
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
      quail['testCompleteTest'] = function (quail, test, Case) {
        for (var i = 0, il = 5; i < il; ++i) {
          test.add(Case({
            element: $('<span class="koala"></span>')[0],
            status: 'passed'
          }));
          test.add(Case({
            element: $('<span class="piggy"></span>')[0],
            status: 'failed'
          }));
        }
      };
      _test = new quail.lib.Test('testCompleteTest');
    });

    it('should group cases by HTML', function (done) {
      _testCollection.listenTo(_test, 'complete', function (eventName, thisTest, _case) {
        var casesByHtml = thisTest.groupCasesByHtml();
        expect(casesByHtml['<span class="koala"></span>'].length).to.equal(5);
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
      quail['fakeLinkTest'] = function (quail, test, Case) {
        for (var i = 0, il = 5; i < il; ++i) {
          test.add(Case({
            element: $('<span class="koala"></span>')[0],
            status: 'passed'
          }));
          test.add(Case({
            element: $('<span class="piggy"></span>')[0],
            status: 'failed'
          }));
        }
      };
      var _test = new quail.lib.Test('fakeLinkTest', {
        'guidelines': g
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
        quail['testCompleteTest'] = function (quail, test, Case) {
          test.add(Case({
            element: $('<span class="koala"></span>')[0],
            status: 'passed'
          }));
        };
        _test = new quail.lib.Test('testCompleteTest');
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
        quail['testCompleteTest'] = function (quail, test, Case) {
          for (var i = 0, il = 5; i < il; ++i) {
            test.add(Case({
              element: $('<span class="koala"></span>')[0],
              status: 'passed'
            }));
            test.add(Case({
              element: $('<span class="piggy"></span>')[0],
              status: 'failed'
            }));
          }
        };
        _test = new quail.lib.Test('testCompleteTest');
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
