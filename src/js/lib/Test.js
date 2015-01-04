quail.lib.Test = (function () {

  /**
   * A collection of Cases.
   */
  function Test (name, attributes) {
    return new Test.fn.init(name, attributes);
  }

  // Prototype object of the Test.
  Test.fn = Test.prototype = {
    constructor: Test,
    init: function (name, attributes) {
      this.listeners = {};
      this.length = 0;
      if (!name) {
        return this;
      }
      this.attributes = attributes || {};
      this.attributes.name = name;
      this.attributes.status = 'untested';
      this.attributes.complete = false;

      return this;
    },
    // Setting a length property makes it behave like an array.
    length: 0,
    // Details of the test.
    attributes: null,
    // Execute a callback for every element in the matched set.
    each: function (iterator) {
      var args = [].slice.call(arguments, 1);
      for (var i = 0, len = this.length; i < len; ++i) {
        args.unshift(this[i]);
        args.unshift(i);
        iterator.apply(this[i], args);
      }
      return this;
    },
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
        this.resolve();
      }
      return this;
    },
    add: function (_case) {
      this.listenTo(_case, 'resolve', this.caseResponded);
      this.listenTo(_case, 'timeout', this.caseResponded);
      // If the case is already resolved because it has a status, then trigger
      // its resolve event.
      if (_case.status) {
        _case.dispatch('resolve', _case);
      }
      this.push(_case);
      return _case;
    },
    invoke: function () {
      // This test is already running.
      if (this.testComplete) {
        throw new Error('The test ' + this.get('name') + ' is already running.');
      }
      // This test has already been run.
      if (this.attributes.complete) {
        throw new Error('The test ' + this.get('name') + ' has already been run.');
      }

      var type = this.get('type');
      var options = this.get('options') || {};
      var callback = this.get('callback');
      var test = this;

      // Set the test complete method to the closure function that dispatches
      // the complete event. This method needs to be debounced so it is only
      // called after a pause of invocations.
      this.testComplete = debounce(testComplete.bind(this), 400);

      // Invoke the complete dispatcher to prevent the test from never
      // completing in the off chance that no Cases are created.
      this.testComplete(false);

      if (type === 'custom') {
        if (typeof callback === 'function') {
          try {
            callback.call(this, quail, test, quail.lib.Case, options);
          }
          catch (e) {
            if (window.console && window.console.error) {
              window.console.error(e);
            }
          }
        }
        else if (type === 'custom' && typeof quail[callback] === 'function') {
          try {
            quail[callback].call(this, quail, test, quail.lib.Case, options);
          }
          catch (e) {
            if (window.console && window.console.error) {
              window.console.error(e);
            }
          }
        }
        else {
          throw new Error('The callback ' + callback + ' cannot be invoked.');
        }
      }
      else if (typeof quail.components[type] === 'function') {
        try {
          quail.components[type].call(this, quail, test, quail.lib.Case, options);
        }
        catch (e) {
          if (window.console && window.console.error) {
            window.console.error(e);
          }
        }
      }
      else {
        throw new Error('The component type ' + type + ' is not defined.');
      }

      // Invoke the complete dispatcher to prevent the test from never
      // completing in the off chance that no Cases are created.
      this.testComplete();

      return this;
    },
    /**
     * Finds cases by their status.
     */
    findByStatus: function (statuses) {
      if (!statuses) {
        return;
      }
      var test = new Test();
      // A single status or an array of statuses is allowed. Always act on an
      // array.
      if (typeof statuses === 'string') {
        statuses = [statuses];
      }
      // Loop the through the statuses and find tests with them.
      for (var i = 0, il = statuses.length; i < il; ++i) {
        var status = statuses[i];
        // Loop through the cases.
        this.each(function (index, _case) {
          var caseStatus = _case.get('status');
          if (caseStatus === status) {
            test.add(_case);
          }
        });
      }
      return test;
    },
    /**
     * Returns a set of cases with corresponding to th supplied selector.
     */
    findCasesBySelector: function (selector) {
      var cases = this.groupCasesBySelector();
      if (cases.hasOwnProperty(selector)) {
        return cases[selector];
      }
      return new Test();
    },
    /**
     * Returns a single Case object the matches the supplied HTML.
     *
     * We make the assumption, rightly or wrongly, that if the HTML is the
     * same for a number of cases in a Test, then the outcome will also
     * be the same, so only use this method if you are probing the result
     * of the case, not other specifics of it.
     *
     * @param string html
     *   A string representing an HTML structure.
     *
     * @needstests
     */
    findCaseByHtml: function (html) {
      var _case;
      for (var i = 0, il = this.length; i < il; ++i) {
        _case = this[i];
        if (html === _case.get('html')) {
          return _case;
        }
      }
      // Always return a Case object.
      return quail.lib.Case();
    },
    /**
     * Groups the cases by element selector.
     *
     * @return object
     *  A hash of cases, keyed by the element selector.
     */
    groupCasesBySelector: function () {
      var casesBySelector = {};
      // Loop through the cases.
      this.each(function (index, _case) {
        var selector = _case.get('selector');
        if (!casesBySelector[selector]) {
          casesBySelector[selector] = new Test();
        }
        casesBySelector[selector].add(_case);
      });
      return casesBySelector;
    },
    /**
     * Groups the cases by serialized HTML string.
     *
     * @todo, the html string index needs to be hashed to a uniform length.
     *
     * @return object
     *  A hash of cases, keyed by the element selector.
     */
    groupCasesByHtml: function () {
      var casesByHtml = {};
      // Loop through the cases.
      this.each(function (index, _case) {
        var html = _case.get('html');
        if (!casesByHtml[html]) {
          casesByHtml[html] = new Test();
        }
        casesByHtml[html].add(_case);
      });
      return casesByHtml;
    },
    /**
     * @needsdoc
     */
    getGuidelineCoverage: function (name) {
      var config = this.get('guidelines');
      return config && config[name] || {};
    },
    /**
     * Adds the test that owns the Case to the set of arguments passed up to
     * listeners of this test's cases.
     */
    caseResponded: function (eventName, _case) {
      this.dispatch(eventName, this, _case);
      // Attempt to declare the Test complete.
      if (typeof this.testComplete === 'function') {
        this.testComplete();
      }
    },
    /**
     * Evaluates the test's cases and sets the test's status.
     */
    determineStatus: function () {
      // Invoke post filtering. This is a very special case for color.js.
      var type = this.get('type');
      var passed;
      if (quail.components[type] && typeof quail.components[type].postInvoke === 'function') {
        passed = quail.components[type].postInvoke.call(this, this);
      }
      // The post invocation function for the component declares that this test
      // passed.
      if (passed === true) {
        this.set({
          'status': 'passed'
        });
      }
      // CantTell.
      else if (this.findByStatus(['cantTell']).length === this.length) {
        this.set({
          'status': 'cantTell'
        });
      }
      // inapplicable.
      else if (this.findByStatus(['inapplicable']).length === this.length) {
        this.set({
          'status': 'inapplicable'
        });
      }
      // Failed.
      else if (this.findByStatus(['failed', 'untested']).length) {
        this.set({
          'status': 'failed'
        });
      }
      else {
        this.set({
          'status': 'passed'
        });
      }
    },
    resolve: function () {
      this.dispatch('complete', this);
    },
    /**
     * A stub method implementation.
     *
     * It is assigned a function value when the Test is invoked. See the
     * testComplete function in outer scope.
     */
    testComplete: null,
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
    concat: [].concat,
    splice: [].splice
  };

  /**
   * Dispatches the complete event.
   *
   * This function is meant to be bound to a Test as a method through
   * a debounced proxy function.
   */
  function testComplete (complete) {
    complete = (typeof complete === 'undefined') ? true : complete;
    // @todo, this iteration would be faster with _.findWhere, that breaks on
    // the first match.
    this.each(function (index, _case) {
      if (!_case.get('status')) {
        complete = false;
      }
    });
    // If all the Cases have been evaluated, dispatch the event.
    if (complete) {
      this.testComplete = null;
      // @todo, this should be set with the set method and a silent flag.
      this.attributes.complete = true;
      this.determineStatus();
    }
    // Otherwise attempt to the complete the Test again after the debounce
    // period has expired.
    else {
      this.testComplete();
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

  // Give the init function the Test prototype.
  Test.fn.init.prototype = Test.fn;

  return Test;
}());
