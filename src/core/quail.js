/**
 * @providesModule quail
 */

var TestCollection = require('TestCollection');
var wcag2 = require('wcag2');
var IsUnreadable = require('IsUnreadable');

// Function.prototype.bind = Function.prototype.bind || function (b) {
//   if (typeof this !== 'function') {
//     throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
//   }
//   var a = Array.prototype.slice;
//   var f = a.call(arguments, 1);
//   var self = this;
//   var C = function C () {};
//   var d = function d () {
//     return self.apply(
//       this instanceof C ? this : b || window,
//       f.concat(a.call(arguments))
//     );
//   };
//   C.prototype = self.prototype;
//   d.prototype = new C();
//   return d;
// };

var quail = {

  options: {},

  html: null,

  accessibilityResults: {},

  accessibilityTests: null,

  guidelines: {
    wcag: {
      /**
       * Perform WCAG specific setup.
       */
      setup: function (tests, listener, callbacks) {
        callbacks = callbacks || {};
        // Associate Success Criteria with the TestCollection.
        for (var sc in this.successCriteria) {
          if (this.successCriteria.hasOwnProperty(sc)) {
            var criteria = this.successCriteria[sc];
            criteria.registerTests(tests);
            if (listener && listener.listenTo && typeof listener.listenTo === 'function') {
              // Allow the invoker to listen to successCriteriaEvaluated events
              // on each SuccessCriteria.
              if (callbacks.successCriteriaEvaluated) {
                listener.listenTo(criteria, 'successCriteriaEvaluated', callbacks.successCriteriaEvaluated);
              }
            }
          }
        }
      },
      successCriteria: {}
    }
  },

  // @var TestCollection
  tests: {},

  /**
   * Main run function for quail.
   */
  run: function (options) {
    function buildTests (quail, assessmentList, options) {
      // An array of test names.
      if (assessmentList.constructor === Array) {
        for (var i = 0, il = assessmentList.length; i < il; ++i) {
          quail.tests.set(assessmentList[i], {
            type: 'custom',
            scope: options.html || null
          });
        }
      }
      else {
        // Create test configuration objects to appease the core app for now.
        var name;
        for (name in assessmentList) {
          if (assessmentList.hasOwnProperty(name)) {
            quail.tests.set(name, {
              type: 'custom',
              scope: options.html || null
            });
          }
        }
      }
    }

    /**
     * A private, internal run function.
     *
     * This function is called when the tests are collected, which might occur
     * after an AJAX request for a test JSON file.
     */
    function _run () {
      // Set up Guideline-specific behaviors.
      var noop = function () {};
      for (var guideline in quail.guidelines) {
        if (quail.guidelines[guideline] && typeof quail.guidelines[guideline].setup === 'function') {
          quail.guidelines[guideline].setup(quail.tests, this, {
            successCriteriaEvaluated: options.successCriteriaEvaluated || noop
          });
        }
      }

      // Invoke all the registered tests.
      quail.tests.run({
        preFilter: options.preFilter || function () {},
        caseResolve: options.caseResolve || function () {},
        testComplete: options.testComplete || function () {},
        testCollectionComplete: options.testCollectionComplete || function () {},
        complete: options.complete || function () {}
      });
    }

    // Create an empty TestCollection.
    quail.tests = TestCollection([], {
      scope: quail.html || null
    });

    // Let wcag2 run itself, will call quail again when it knows what
    // to
    if (options.guideline === 'wcag2') {
      wcag2.run(options);
    }

    // If a list of specific tests is provided, use them.
    else if (options.accessibilityTests) {
      buildTests(quail, options.accessibilityTests, options);
      _run.call(quail);
    }
  },

  // @todo, make this a set of methods that all classes extend.
  listenTo: function (dispatcher, eventName, handler) {
    // @todo polyfill Function.prototype.bind.
    handler = handler.bind(this);
    dispatcher.registerListener.call(dispatcher, eventName, handler);
  },

  getConfiguration: function (testName) {
    var test = this.tests.find(testName);
    var guidelines = test && test.get('guidelines');
    var guideline = guidelines && this.options.guidelineName && guidelines[this.options.guidelineName];
    var configuration = guideline && guideline.configuration;
    if (configuration) {
      return configuration;
    }
    return false;
  },

  /**
   * Read more about this function here: https://github.com/quailjs/quail/wiki/Layout-versus-data-tables
   */
  isDataTable: function (table) {
    // If there are less than three rows, why do a table?
    if (table.find('tr').length < 3) {
      return false;
    }
    // If you are scoping a table, it's probably not being used for layout
    if (table.find('th[scope]').length) {
      return true;
    }
    var numberRows = table.find('tr:has(td)').length;
    // Check for odd cell spanning
    var spanCells = table.find('td[rowspan], td[colspan]');
    var isDataTable = true;
    if (spanCells.length) {
      var spanIndex = {};
      spanCells.each(function () {
        if (typeof spanIndex[$(this).index()] === 'undefined') {
          spanIndex[$(this).index()] = 0;
        }
        spanIndex[$(this).index()]++;
      });
      $.each(spanIndex, function (index, count) {
        if (count < numberRows) {
          isDataTable = false;
        }
      });
    }
    // If there are sub tables, but not in the same column row after row, this is a layout table
    var subTables = table.find('table');
    if (subTables.length) {
      var subTablesIndexes = {};
      subTables.each(function () {
        var parentIndex = $(this).parent('td').index();
        if (parentIndex !== false && typeof subTablesIndexes[parentIndex] === 'undefined') {
          subTablesIndexes[parentIndex] = 0;
        }
        subTablesIndexes[parentIndex]++;
      });
      $.each(subTablesIndexes, function (index, count) {
        if (count < numberRows) {
          isDataTable = false;
        }
      });
    }
    return isDataTable;
  },

  /**
   *  Returns text contents for nodes depending on their semantics
   */
  getTextContents: function ($element) {
    if ($element.is('p, pre, blockquote, ol, ul, li, dl, dt, dd, figure, figcaption')) {
      return $element.text();
    }
    // Loop through all text nodes to get everything around children.
    var text = '';
    var children = $element[0].childNodes;
    for (var i = 0, il = children.length; i < il; i += 1) {
      // Only text nodes.
      if (children[i].nodeType === 3) {
        text += children[i].nodeValue;
      }
    }
    return text;
  },

  /**
   * Helper function to determine if a given URL is even valid.
   */
  validURL: function (url) {
    return url.search(' ') === -1;
  },

  cleanString: function (string) {
    return string.toLowerCase().replace(/^\s\s*/, '');
  },

  containsReadableText: function (element, children) {
    element = element.clone();
    element.find('option').remove();
    if (!IsUnreadable(element.text())) {
      return true;
    }
    if (!IsUnreadable(element.attr('alt'))) {
      return true;
    }
    if (children) {
      var readable = false;
      element.find('*').each(function () {
        if (quail.containsReadableText($(this), true)) {
          readable = true;
        }
      });
      if (readable) {
        return true;
      }
    }
    return false;
  }
};

module.exports = quail;
