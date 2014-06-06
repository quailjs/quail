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
    init: function (evaluator) {
      // Event listeners.
      this.listeners = {};
      this.attributes = {};

      if (typeof evaluator !== 'function') {
        return this;
      }
      // The evaluator is a callback that will be invoked when tests have
      // finished running.
      this.set('evaluator', evaluator);

      return this;
    },
    // Setting a length property makes it behave like an array.
    length: 0,
    // Details of the test.
    attributes: {},
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
        if (attr === 'status') {
          isStatusChanged = true;
        }
        this.attributes[attr] = value;
      }

      if (isStatusChanged) {
        this.report();
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
     */
    registerTests: function (testCollection) {
      this.set('tests', testCollection);
      this.listenTo(testCollection, 'complete', this.evaluate);
    },
    /**
     * Registers a callback that will be run when all the tests are complete.
     */
    registerEvaluator: function (evaluator) {
      this.set('evaluator', evaluator);
    },
    /**
     * Returns the union of the tests that were run and the required tests.
     */
    filterTests: function (tests, requiredTests) {
      var criteriaTests = [];
      tests.each(function (index, test) {
        var name = test.get('name');
        // Get the union of the tests that were run and the required tests.
        for (var i = 0, il = requiredTests.length; i < il; ++i) {
          if (name === requiredTests[i]) {
            criteriaTests.push(name);
          }
        }
      });
      return criteriaTests;
    },
    /**
     * Runs the evaluator callbacks against the completed TestCollection.
     */
    evaluate: function (eventName, testCollection) {
      // Sort the test cases by selector.
      var sc = this;
      testCollection.each(function (index, test) {
        test.each(function (index, _case) {
          sc.add(_case);
        });
      });
      this.get('evaluator').call(this, testCollection);
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

  // Give the init function the SuccessCriteria prototype.
  SuccessCriteria.fn.init.prototype = SuccessCriteria.fn;

  return SuccessCriteria;
}());
