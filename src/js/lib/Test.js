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
      return _case;
    },
    invoke: function () {
      var type = this.get('type');
      var options = this.get('options') || {};
      var callback = this.get('callback');
      var test = this;
      var _case;

      switch(type) {
      case 'selector':
        this.get('$scope').each(function() {
          var $scope = $(this);
          var candidates = $(this).find(options.selector);
          // Passes.
          if (!candidates.length) {
            // Passes.
            _case = quail.lib.Case({
              element: undefined,
              expected: $scope.data('expected') || $scope.find('[data-expected]').data('expected')
            });
            test.add(_case);
            _case.set({status: 'passed'});
          }
          else {
            // Fails.
            candidates.each(function () {
              // Get the data-expected attribute.
              _case = quail.lib.Case({
                element: this,
                expected: $(this).closest('.quail-test').data('expected')
              });
              test.add(_case);
              _case.set({status: 'failed'});
            });
          }
        });
        break;
      case 'custom':
        if (typeof callback === 'object' || typeof callback === 'function') {
          callback(quail, test, quail.lib.Case);
        }
        else {
          if (typeof quail[callback] !== 'undefined') {
            quail[callback](quail, test, quail.lib.Case);
          }
        }
        break;
      default:
        if (typeof quail.components[type] !== 'undefined') {
          quail.components[type](quail, test, quail.lib.Case, this.attributes);
        }
        break;
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

  // Give the init function the Test prototype.
  Test.fn.init.prototype = Test.fn;

  return Test;
}());
