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
    init: function (tests) {
      if (!tests) {
        return this;
      }
      if (typeof tests === 'object') {
        for (var name in tests) {
          if (tests.hasOwnProperty(name)) {
            this.push(quail.lib.Test(name, tests[name]));
          }
        }
        return this;
      }
      return this;
    },
    // Setting a length property makes it behave like an array.
    length: 0,
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
    find: function (testname) {
      for (var i = 0, il = this.length; i < il; ++i) {
        if (this[i].get('name') === testname) {
          return this[i];
        }
      }
      // Return an empty TestCollection for chaining.
      return null;
    },
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
    push: [].push,
    sort: [].sort,
    splice: [].splice
  };

  // Give the init function the TestCollection prototype.
  TestCollection.fn.init.prototype = TestCollection.fn;

  return TestCollection;
}());
