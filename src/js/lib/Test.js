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

      return this;
    },
    // Setting a length property makes it behave like an array.
    length: 0,
    // Details of the test.
    attributes: {},
    // Execute a callback for every element in the matched set.
    each: function (iterator) {
      var args = [].slice(arguments, 1);
      for (var i = 0, len = this.length; i < len; ++i) {
        args.unshift(this[i]);
        args.unshift(i);
        iterator.apply(this[i], args);
      }
      return this;
    },
    get: function (attr) {
      return this.attributes[attr];
    },
    set: function (attr, value) {
      // Allow an object of attributes to be passed in.
      if (typeof attr === 'object') {
        for (var prop in attr) {
          if (attr.hasOwnProperty(prop)) {
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
    add: function (_case) {
      this.listenTo(_case, 'resolved', this.caseResolved);
      // If the case is already resolved because it has a status, then trigger
      // its resolved event.
      if (_case.status) {
        _case.dispatch('resolved', _case);
      }
      this.push(_case);
    },
    invoke: function () {
      var name = this.get('name');
      var type = this.get('type');
      var options = this.get('options') || {};
      var callback = this.get('callback');
      var test = this;
      var _case;

      if (type === 'selector') {
        // If options.filter is defined, then options.selector is collecting
        // a set of candidate elements; it is not simply a selector to find
        // elements that fail the test.
        if (options.filter) {
          var candidates = quail.html.find(options.selector);
          // Not applicable.
          if (!candidates.length) {
            this.status = 'inapplicable';
            return;
          }
          else {
            // Passes.
            candidates.not(options.filter).each(function () {
              test.add(quail.lib.Case({
                status: 'passed',
                element: this
              }));
            });
            // Fails.
            candidates.filter(options.filter).each(function () {
              test.add(quail.lib.Case({
                status: 'failed',
                element: this
              }));
            });
          }
        }
        else {
          quail.html.find(options.selector).each(function() {
            test.add(quail.lib.Case({
              status: 'failed',
              element: this
            }));
          });
        }
      }
      else if (type === 'custom') {
        if (typeof callback === 'object' || typeof callback === 'function') {
          _case = quail.lib.Case();
          callback(quail, test, quail.lib.Case);
        }
        else {
          if (typeof quail[callback] !== 'undefined') {
            quail[callback](quail, test, quail.lib.Case);
          }
        }
      }
      else if (typeof quail.components[type] !== 'undefined') {
        quail.components[type](name, this.attributes);
      }
      return this;
    },
    /**
     * Adds the test that owns the Case to the set of arguments passed up to
     * listeners of this test's cases.
     */
    caseResolved: function (eventName, _case) {
      this.dispatch(eventName, this, _case);
    },
    // @todo, make this a set of methods that all classes extend.
    listenTo: function (dispatcher, eventName, handler) {
      // @todo polyfill Function.prototype.bind.
      handler = handler.bind(this);
      dispatcher.registerListener.call(dispatcher, eventName, handler);
    },
    registerListener: function (eventName, handler) {
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

  // Give the init function the Test prototype.
  Test.fn.init.prototype = Test.fn;

  return Test;
}());
