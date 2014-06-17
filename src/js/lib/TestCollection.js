quail.lib.TestCollection = (function () {

  /**
   * A Collection of Tests.
   */
  function TestCollection (tests) {
    return new TestCollection.fn.init(tests);
  }

  // Prototype object of the TestCollection.
  TestCollection.fn = TestCollection.prototype = {
    constructor: TestCollection,
    init: function (tests, options) {
      this.listeners = {};
      options = options || {};
      if (!tests) {
        return this;
      }
      if (typeof tests === 'object') {
        var test;
        for (var name in tests) {
          if (tests.hasOwnProperty(name)) {
            tests[name].scope = tests[name].scope || options.scope;
            test = new quail.lib.Test(name, tests[name]);
            this.listenTo(test, 'results', this.report);
            this.push(test);
          }
        }
        return this;
      }
      return this;
    },
    // Setting a length property makes it behave like an array.
    length: 0,
    // Invoke all the tests in a set.
    run: function (callbacks) {
      var tc = this;
      callbacks = callbacks || {};
      this.each(function (index, test) {
        // Allow a prefilter to remove a case.
        if (callbacks.preFilter) {
          tc.listenTo(test, 'resolve', function (eventName, test, _case) {
            var result = callbacks.preFilter(eventName, test, _case);
            if (result === false) {
              // Manipulate the attributes directly so that change events
              // are not triggered.
              _case.attributes.status = 'notTested';
              _case.attributes.expected = null;
            }
          });
        }
        // Allow the invoker to listen to resolve events on each Case.
        if (callbacks.caseResolve) {
          tc.listenTo(test, 'resolve', callbacks.caseResolve);
        }
        // Allow the invoker to listen to complete events on each Test.
        if (callbacks.testComplete) {
          tc.listenTo(test, 'complete', callbacks.testComplete);
        }
      });

      // Allow the invoker to listen to complete events for the
      // TestCollection.
      if (callbacks.testCollectionComplete) {
        tc.listenTo(tc, 'complete', callbacks.testCollectionComplete);
      }

      // Set the test complete method to the closure function that dispatches
      // the complete event. This method needs to be debounced so it is
      // only called after a pause of invocations.
      this.testsComplete = debounce(testsComplete.bind(this), 500);

      // Invoke each test.
      this.each(function(index, test) {
        test.invoke();
      });

      // Invoke the complete dispatcher to prevent the collection from never
      // completing in the off chance that no Tests are run.
      this.testsComplete();

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
     * Add a Test object to the set.
     */
    add: function (test) {
      // Don't add a test that already exists in this set.
      if (!this.find(test.get('name'))) {
        this.push(test);
      }
    },
    /**
     * Finds a test by its name.
     */
    find: function (testname) {
      for (var i = 0, il = this.length; i < il; ++i) {
        if (this[i].get('name') === testname) {
          return this[i];
        }
      }
      return null;
    },
    /**
     * @info, this should be a static method.
     */
    findByGuideline: function (guidelineName) {

      var methods = {
        'wcag': function (section, technique) {

          function findAllTestsForTechnique (guidelineName, sectionId, techniqueName) {
            // Return a TestCollection instance.
            var tests = new TestCollection();
            this.each(function (index, test) {
              // Get the configured guidelines for the test.
              var guidelines = test.get('guidelines');
              // If this test is configured for this section and it has
              // associated techniques, then loop thorugh them.
              var testTechniques = guidelines[guidelineName] && guidelines[guidelineName][sectionId] && guidelines[guidelineName][sectionId]['techniques'];
              if (testTechniques) {
                for (var i = 0, il = testTechniques.length; i < il; ++i) {
                  // If this test is configured for the techniqueName, add it
                  // to the list of tests.
                  if (testTechniques[i] === techniqueName) {
                    tests.listenTo(test, 'results', tests.report);
                    tests.add(test);
                  }
                }
              }
            });
            return tests;
          }
          var sectionId = section.id;
          var techniqueName = technique.get('name');
          if (sectionId && techniqueName) {
            return findAllTestsForTechnique.call(this, guidelineName, sectionId, techniqueName);
          }
        }
      };
      // Process the request using a specific guideline finding method.
      // @todo, make these pluggable eventually.
      if (methods[guidelineName]) {
        var args = [].slice.call(arguments, 1);
        return methods[guidelineName].apply(this, args);
      }
    },
    /**
     * Finds tests by their status.
     */
    findByStatus: function (statuses) {
      if (!statuses) {
        return;
      }
      var tests = new TestCollection();
      // A single status or an array of statuses is allowed. Always act on an
      // array.
      if (typeof statuses === 'string') {
        statuses = [statuses];
      }
      // Loop the through the statuses and find tests with them.
      for (var i = 0, il = statuses.length; i < il; ++i) {
        var status = statuses[i];
        // Loop through the tests.
        this.each(function (index, test) {
          var testStatus = test.get('status');
          if (testStatus === status) {
            tests.add(test);
          }
        });
      }
      return tests;
    },
    /**
     * Create a new test from a name and details.
     */
    set: function (testname, details) {
      for (var i = 0, il = this.length; i < il; ++i) {
        if (this[i].get('name') === testname) {
          this[i].set(details);
          return this[i];
        }
      }
      var test = quail.lib.Test(testname, details);
      this.push(test);
      return test;
    },
    /**
     * A stub method implementation.
     *
     * It is assigned a function value when the collection is run. See the
     * testsComplete function in outer scope.
     */
    testsComplete: null,
    report: function () {
      this.dispatch.apply(this, arguments);
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
   * Dispatches the complete event.
   *
   * This function is meant to be bound to a Test as a method through
   * a debounced proxy function.
   */
  function testsComplete () {
    var complete = true;
    // @todo, this iteration would be faster with _.findWhere, that breaks on
    // the first match.
    this.each(function (index, test) {
      if (!test.get('complete')) {
        complete = false;
      }
    });
    // If all the Tests have completed, dispatch the event.
    if (complete) {
      this.testsComplete = null;
      this.dispatch('complete', this);
    }
    // Otherwise attempt to the complete the Tests again after the debounce
    // period has expired.
    else {
      this.testsComplete();
    }
  }

  /**
   * Limits the invocations of a function in a given time frame.
   *
   * Adapted from underscore.js. Replace with debounce from underscore once class
   * loading with modules is in place.
   *
   * @param {Function} callback
   *   The function to be invoked.
   *
   * @param {Number} wait
   *   The time period within which the callback function should only be
   *   invoked once. For example if the wait period is 250ms, then the callback
   *   will only be called at most 4 times per second.
   */
  function debounce (func, wait, immediate) {

    "use strict";

    var timeout, result;
    return function () {
      var context = this;
      var args = arguments;
      var later = function () {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
        }
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) {
        result = func.apply(context, args);
      }
      return result;
    };
  }

  // Give the init function the TestCollection prototype.
  TestCollection.fn.init.prototype = TestCollection.fn;

  return TestCollection;
}());
