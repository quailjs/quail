quail.lib.WCAGGuideline = (function () {

  /**
   * A Collection of Tests.
   */
  var WCAGGuideline = function (tests) {
    return new WCAGGuideline.fn.init(tests);
  };

  // Prototype object of the WCAGGuideline.
  WCAGGuideline.fn = WCAGGuideline.prototype = {
    constructor: WCAGGuideline,
    init: function (guideline) {
      if (!guideline) {
        return this;
      }
      if (typeof guideline === 'object') {
        for (var sectionNumber in guideline) {
          if (guideline.hasOwnProperty(sectionNumber)) {
            this.push(quail.lib.Section(sectionNumber, guideline[sectionNumber]));
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
      // Return an empty WCAGGuideline for chaining.
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

  // Give the init function the WCAGGuideline prototype.
  WCAGGuideline.fn.init.prototype = WCAGGuideline.fn;

  return WCAGGuideline;
}());
