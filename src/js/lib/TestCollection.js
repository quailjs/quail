quail.lib.TestCollection = (function ($, Test) {

  var TestCollection = function (tests) {
    return new TestCollection.fn.init(tests);
  };

  // Prototype object of the TestCollection.
  TestCollection.fn = TestCollection.prototype = {
    constructor: TestCollection,
    init: function (tests) {
      if (!tests) {
        return this;
      }
      if (typeof tests === 'object') {
        var arrTests = [];
        for (var name in tests) {
          if (tests.hasOwnProperty(name)) {
            arrTests.push({
              name: name,
              details: tests[name]
            });
          }
        }
        var ret = $.merge(this, arrTests);
        return ret;
      }
      return this;
    },
    // Setting a length property makes it behave like an array.
    length: 0,
    // Execute a callback for every element in the matched set.
    each: function(callback, args) {
      return $.each(this, callback, args);
    },
    find: function (name) {
      for (var i = 0, il = this.length; i < il; ++i) {
        if (this[i].name === name) {
          return this[i].details;
        }
      }
      // Return an empty TestCollection for chaining.
      return this.constructor(null);
    },
    set: function (name, details) {
      for (var i = 0, il = this.length; i < il; ++i) {
        if (this[i].name === name) {
          this[i].details = details;
        }
      }
      return this;
    },
    sort: [].sort,
    splice: [].splice
  };

  // Give the init function the TestCollection prototype.
  TestCollection.fn.init.prototype = TestCollection.fn;

  return TestCollection;
}(jQuery, quail.lib.Test));
