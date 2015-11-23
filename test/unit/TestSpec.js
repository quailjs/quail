const TestCollection = require('TestCollection');
const Test = require('Test');
const Case = require('Case');
const $ = require('jquery/dist/jquery');
const quail = {};

describe('Test', function () {
  var _test;

  beforeEach(function () {
    quail['peregrine'] = function () {};
    _test = new Test('peregrine', {
      'bird': 'falcon'
    });
  });

  it('should be an instance of Test', function () {
    expect(_test).to.be.instanceof(Test);
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

  xdescribe('methods', function () {
    var _test;
    var _testCollection;

    beforeEach(function () {
      _testCollection = new TestCollection();
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
      _test = new Test('fakeLinkTest');
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
      var _testCollection;
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

    xdescribe('groupCasesBySelector', function () {
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

  xdescribe('groupCasesByHtml', function () {
    var _test;
    var _testCollection;

    beforeEach(function () {
      _testCollection = new TestCollection();
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
      _test = new Test('testCompleteTest');
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
      var _test = new Test('fakeLinkTest', {
        'guidelines': g
      });
      var coverage = _test.getGuidelineCoverage('wcag');
      expect(coverage).to.deep.equal(sc);
    });
  });

  xdescribe('event dispatching', function () {
    var _testCollection;
    beforeEach(function () {
      _testCollection = new TestCollection();
    });

    describe('resolve event', function () {

      beforeEach(function () {
        quail['testCompleteTest'] = function (quail, test, Case) {
          test.add(Case({
            element: $('<span class="koala"></span>')[0],
            status: 'passed'
          }));
        };
        _test = new Test('testCompleteTest');
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
        _test = new Test('testCompleteTest');
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
        _test.add(new Case());
        _test.invoke();
      });
    });
  });
});
