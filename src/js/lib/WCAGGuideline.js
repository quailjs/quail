// Iterates over Techniques.

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
    init: function (config) {
      if (!config) {
        return this;
      }
      this.techniques = [];
      var guidelines, section, techniques, techniqueName, technique;

      if (typeof config === 'object') {
        if (config.guidelines) {
          guidelines = config.guidelines;
          for (var sectionNumber in guidelines) {
            if (guidelines.hasOwnProperty(sectionNumber)) {
              section = guidelines[sectionNumber];
              // Create a section object. Exclude techniques. These will be
              // instantiated as object later.
              if (section.techniques && section.techniques.length) {
                techniques = section.techniques;
                delete section.techniques;
              }
              // Instantiate a Section object.
              section = quail.lib.Section(sectionNumber, section);
              // Find all the techniques in the sections.
              if (techniques.length) {
                for (var i = 0, il = techniques.length; i < il; ++i) {
                  techniqueName = techniques[i];
                  // The technique requires a definition (description) within
                  // the guideline.
                  if (!config.techniques[techniqueName]) {
                    throw new Error('Definition for Technique ' + techniqueName + ' is missing from the guideline specification');
                  }
                  // Create a new technique instance if this one does not exist
                  // yet.
                  technique = this.findTechnique(techniqueName);
                  if (!technique) {
                    technique = quail.lib.Technique(techniqueName, config.techniques[techniqueName]);
                    this.techniques.push(technique);
                  }
                  // Add the technique to the currently processing section.
                  section.addTechnique(technique);
                }
              }
              this.push(section);
            }
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
      var args = [].slice.call(arguments, 1);
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
      return null;
    },
    findTechnique : function (techniqueName) {
      for (var i = 0, il = this.techniques.length; i < il; ++i) {
        if (this.techniques[i].get('name') === techniqueName) {
          return this.techniques[i];
        }
      }
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
    evaluate: function () {
      /* loop through all the techniques and evaluate them against the page. */
    },
    results: function () {
      /* return evaluation results */
      /* Filter by SC? */
    },
    push: [].push,
    sort: [].sort,
    splice: [].splice
  };

  // Give the init function the WCAGGuideline prototype.
  WCAGGuideline.fn.init.prototype = WCAGGuideline.fn;

  return WCAGGuideline;
}());
