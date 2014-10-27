/* A logical combo of Techniques and the intersection of their outcomes. */
quail.lib.SuccessCriteria = (function () {

  /**
   * A Collection of Tests.
   */
  function SuccessCriteria (tests) {
    return new SuccessCriteria.fn.init(tests);
  }

  // Prototype object of the SuccessCriteria.
  SuccessCriteria.fn = SuccessCriteria.prototype = {
    constructor: SuccessCriteria,
    init: function (options) {
      // Event listeners.
      this.listeners = {};

      // By default a Success Criteria is untested.
      this.attributes = this.attributes || {};
      this.attributes.status = 'untested';
      this.attributes.results = {};
      this.attributes.totals = {};

      // The evaluator is a callback that will be invoked when tests have
      // finished running.
      this.set(options || {});

      return this;
    },
    // Setting a length property makes it behave like an array.
    length: 0,
    // Details of the test.
    attributes: null,
    get: function (attr) {
      // Return the document wrapped in jQuery if scope is not defined.
      if (attr === '$scope') {
        var scope = this.attributes['scope'];
        var $scope = $(this.attributes['scope']);
        // @todo, pass in a ref to jQuery to this module.
        return (this.attributes[attr]) ? this.attributes[attr] : ((scope) ? $scope : $(document));
      }
      return this.attributes[attr];
    },
    set: function (attr, value) {
      var isStatusChanged = false;
      // Allow an object of attributes to be passed in.
      if (typeof attr === 'object') {
        for (var prop in attr) {
          if (attr.hasOwnProperty(prop)) {
            if (prop === 'status') {
              isStatusChanged = true;
            }
            this.attributes[prop] = attr[prop];
          }
        }
      }
      // Assign a single attribute value.
      else {
        this.attributes[attr] = value;
      }
      return this;
    },
    /**
     * Execute a callback for every element in the matched set.
     */
    each: function (iterator) {
      var args = [].slice.call(arguments, 1);
      for (var i = 0, len = this.length; i < len; ++i) {
        args.unshift(this[i]);
        args.unshift(i);
        var cont = iterator.apply(this[i], args);
        // Allow an iterator to break from the loop.
        if (cont === false) {
          break;
        }
      }
      return this;
    },
    /**
     * Add a Case to the Success Criteria instance, keyed by selector.
     */
    add: function (_case) {
      if (!this.find(_case.get('selector'))) {
        this.push(_case);
      }
    },
    /**
     * Finds a case by its selector.
     */
    find: function (selector) {
      for (var i = 0, il = this.length; i < il; ++i) {
        if (this[i].get('selector') === selector) {
          return this[i];
        }
      }
      return null;
    },
    /**
     * Adds a TestCollection to be listened to.
     *
     * There is a preEvaluator function run before tests are added to make sure
     * that the test is actually needed.
     */
    registerTests: function (testCollection) {
      var preEvaluator = this.get('preEvaluator');
      var hasPreEvaluator = typeof preEvaluator !== 'undefined';
      // true means we'll run all the tests as usual, false, we skip the whole thing.
      var passedPreEvaluation = true;
      if (hasPreEvaluator) {
        passedPreEvaluation = preEvaluator.call(this, testCollection);
      }
      if (!passedPreEvaluation) {
        this.set('status', 'inapplicable');
      }
      this.set('tests', testCollection);
      this.listenTo(testCollection, 'complete', this.evaluate);
    },
    /**
     * Returns a collection of tests for this success criteria.
     */
    filterTests: function (tests) {
      var criteriaTests = new quail.lib.TestCollection();
      var name = this.get('name');
      if (!name) {
        throw new Error('Success Criteria instances require a name in order to have tests filtered.');
      }
      var identifier = name.split(':')[1];
      tests.each(function (index, test) {
        var guidelineCoverage = test.getGuidelineCoverage('wcag');
        // Get tests for this success criteria.
        for (var criteriaID in guidelineCoverage) {
          if (guidelineCoverage.hasOwnProperty(criteriaID)) {
            if (criteriaID === identifier) {
              criteriaTests.add(test);
            }
          }
        }
      });
      return criteriaTests;
    },
    /**
     * Adds a Case conclusion to the Success Criteria.
     *
     * @param string conclusion
     * @param quail.lib.Case _case
     */
    addConclusion: function (conclusion, _case) {
      if (!this.get('results')[conclusion]) {
        this.get('results')[conclusion] = quail.lib.Test();
      }
      this.get('results')[conclusion].push(_case);
      // Incremement totals for this conclusion type.
      if (!this.get('totals')[conclusion]) {
        this.get('totals')[conclusion] = 0;
      }
      ++(this.get('totals')[conclusion]);
      // Incremement totals for the number of cases found.
      if (!this.get('totals')['cases']) {
        this.get('totals')['cases'] = 0;
      }
      ++(this.get('totals')['cases']);
    },
    /**
     * Runs the evaluator callbacks against the completed TestCollection.
     */
    evaluate: function (eventName, testCollection) {
      if (this.get('status') !== 'inapplicable') {
        var sc = this;
        var associatedTests = this.filterTests(testCollection);

        // If there are no associated tests, then this Success
        // Criteria has no coverage.
        if (associatedTests.length === 0) {
          this.set('status', 'noTestCoverage');
        }
        else {
          associatedTests.each(function (index, test) {
            test.each(function (index, _case) {
              sc.addConclusion(_case.get('status'), _case);
            });
          });
          if (size(this.get('results')) === 0) {
            this.set('status', 'noResults');
          }
          else {
            this.set('status', 'tested');
          }
        }
      }
      this.report();
    },
    /**
     * Dispatches the complete event.
     */
    report: function () {
      var args = Array.prototype.slice.call(arguments);
      args = [].concat(['successCriteriaEvaluated', this, this.get('tests')], args);
      this.dispatch.apply(this, args);
    },
    // @todo, make this a set of methods that all classes extend.
    listenTo: function (dispatcher, eventName, handler) {
      // @todo polyfill Function.prototype.bind.
      handler = handler.bind(this);
      dispatcher.registerListener.call(dispatcher, eventName, handler);
    },
    registerListener: function (eventName, handler) {
      // nb: 'this' is the dispatcher object, not the one that invoked listenTo.
      if (!this.listeners[eventName]) {
        this.listeners[eventName] = [];
      }

      this.listeners[eventName].push(handler);
    },
    dispatch: function (eventName) {
      if (this.listeners[eventName] && this.listeners[eventName].length) {
        var eventArgs = [].slice.call(arguments);
        this.listeners[eventName].forEach(function (handler) {
          // Pass any additional arguments from the event dispatcher to the
          // handler function.
          handler.apply(null, eventArgs);
        });
      }
    },
    push: [].push,
    sort: [].sort,
    splice: [].splice
  };

  /**
   * Determines the length of an object.
   *
   * @param object obj
   *   The object whose size will be determined.
   *
   * @return number
   *   The size of the object determined by the number of keys.
   */
  function size (obj) {
    return Object.keys(obj).length;
  }

  // Give the init function the SuccessCriteria prototype.
  SuccessCriteria.fn.init.prototype = SuccessCriteria.fn;

  return SuccessCriteria;
}());
