describe('TestCollection', function () {

  var _testCollection;

  beforeEach(function () {
    _testCollection = new quail.lib.TestCollection({
      'peregrine': {
        'bird': 'falcon'
      }
    });
  });

  it('should be an instance of TestCollection', function () {
    expect(_testCollection).to.be.instanceof(quail.lib.TestCollection);
  });

  describe('set', function () {

    it('should create a new Test instance', function () {
      var _test = _testCollection.set('charlie', {
        'reptile': 'iguana'
      });
      expect(_test).to.be.instanceof(quail.lib.Test);
    });
  });

  describe('find', function () {
    it('should find tests by name', function () {
      var _test = _testCollection.find('peregrine');
      expect(_test.get('bird')).to.equal('falcon');
    });
  });

  describe('each', function () {
    beforeEach(function () {
      _testCollection = new quail.lib.TestCollection({
        'peregrine': {'bird': 'falcon'},
        'charlie': {'reptile': 'iguana'}
      });
    });

    it('should iterate over the two tests', function () {
      var spy = sinon.spy();
      _testCollection.each(spy);
      sinon.assert.calledTwice(spy);
    });
  });

  describe('findByStatus', function () {
    var tests;

    beforeEach(function () {
      _testCollection = new quail.lib.TestCollection({
        'peregrine': {'bird': 'falcon'},
        'charlie': {'reptile': 'iguana'},
        'wayne': {'mammal': 'squirrel'},
        'judy': {'fish': 'trout'},
        'george': {'rock': 'granite'}
      });
      _testCollection[1].set('status', 'passed');
      _testCollection[2].set('status', 'failed');
      _testCollection[3].set('status', 'cantTell');
      _testCollection[4].set('status', 'inapplicable');
    });

    it('should find test cases by a status string', function () {
      tests = _testCollection.findByStatus('untested');
      expect(tests.length).to.equal(1);
    });

    it('should find test cases by an array of statuses', function () {
      tests = _testCollection.findByStatus(['untested', 'passed', 'failed']);
      expect(tests.length).to.equal(3);
      tests = _testCollection.findByStatus(['cantTell', 'inapplicable']);
      expect(tests.length).to.equal(2);
    });
  });

  describe('event dispatching', function () {
    var listener;
    var callback;

    beforeEach(function () {
      _testCollection = new quail.lib.TestCollection();
      // @todo, we need a mockable object that will listen to events.
      listener = new quail.lib.TestCollection();
    });

    it('should dispatch the complete event', function (done) {
      this.timeout(2500);
      callback = function (eventName, testCollection) {
        expect(testCollection.length).to.equal(5);
        expect(eventName).to.equal('complete');
        done();
      };
      spy = sinon.spy(callback);

      listener.listenTo(_testCollection, 'complete', spy);
      // Create a few fake tests and add them to the collection.
      for (var i = 0; i < 5; ++i) {
        _test = new quail.lib.Test('fakeTest-' + i, {
          'type': 'selector',
          'options': {
            'selector': 'i.unittest'
          }
        });
        _testCollection.add(_test);
      }
      _testCollection.run();
    });

    it('should dispatch the complete event when a test times out', function (done) {
      this.timeout(2500);
      callback = function (eventName, testCollection) {
        expect(testCollection.length).to.equal(6);
        expect(eventName).to.equal('complete');
        done();
      };
      spy = sinon.spy(callback);

      listener.listenTo(_testCollection, 'complete', spy);
      // Create a few fake tests and add them to the collection.
      for (var i = 0; i < 5; ++i) {
        _test = new quail.lib.Test('fakeTest-' + i, {
          'type': 'selector',
          'options': {
            'selector': 'i.unittest'
          }
        });
        _testCollection.add(_test);
      }
      // Add a test that will time out.
      _testCollection.add(new quail.lib.Test('timeoutTest', {
        'type': 'selector'
      }));
      _testCollection.run();
    });
  });
});
