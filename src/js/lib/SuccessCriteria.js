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
    init: function (testCollection, options) {
      this.listeners = {};
      // Evaluators are callbacks that will be invoked when tests have finished
      // running.
      this.evaluators = [];
      options = options || {};
      if (!testCollection) {
        return this;
      }
      // Register a listener on the TestCollection complete event.
      this.listenTo(testCollection, 'complete', this.evaulate);

      return this;
    },
    /**
     * Adds a TestCollection to be listened to.
     */
    add: function (testCollection) {
      this.listenTo(testCollection, 'complete', this.evaluate);
    },
    /**
     * Registers a callback that will be run when all the tests are complete.
     */
    registerEvaluator: function (evaluator) {
      this.evaluators.push(evaluator);
    },
    /**
     * Runs the evaluator callbacks against the completed TestCollection.
     */
    evaluate: function (eventName, testCollection) {
      for (var i = 0, il = this.evaluators.length; i < il; ++i) {
        this.evaluators[i].call(null, testCollection);
      }
    },
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
    }
  };

  // Give the init function the SuccessCriteria prototype.
  SuccessCriteria.fn.init.prototype = SuccessCriteria.fn;

  return SuccessCriteria;
}());
