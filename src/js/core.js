$.fn.quail = function(options) {
  if (!this.length) {
    return this;
  }
  quail.options = options;
  quail.html = this;

  quail.run(options);

  return this;
};

$.expr[':'].quailCss = function(obj, index, meta) {
  var args = meta[3].split(/\s*=\s*/);
  return $(obj).css(args[0]).search(args[1]) > -1;
};

/**
 * Assembles data about the test and invokes appropriate callbacks.
 *
 * @param {string} type
 *   Possible values:  'inapplicable', 'failed', 'passed', 'cantTell',
 *   and 'untested'
 * @param {string} testName
 *   The name of the test.
 * @param {jQuery} $element
 *   The DOM element, wrapped in jQuery, that the test was run against.
 * @param {object} options
 */
function _processTestResult (type, testName, $element, options) {
  var test = quail.accessibilityTests.find(testName);
  var result = quail.accessibilityResults[testName];
  options = options || {};

  function isCallable (func) {
    return typeof func === 'function' || typeof func === 'object';
  }

  if (typeof quail.options.preFilter !== 'undefined') {
    if (quail.options.preFilter(testName, $element, options) === false) {
      return;
    }
  }
  var testability = test.get('testability');
  testability = (testability) ? testability : 'unknown';
  var info = {
    element     : $element,
    selector    : quail.defineUniqueSelector($element.length && $element[0] || null),
    location    : window && window.location || null,
    testName    : testName,
    test        : quail.accessibilityTests.find(testName),
    testability : testability,
    severity    : quail.testabilityTranslation[testability],
    options     : options
  };

  // Invoke test listeners;
  switch (type) {
  case 'inapplicable':
    result.status = 'inapplicable';
    if (isCallable(quail.options.testNotApplicable)) {
      quail.options.testNotApplicable(info);
    }
    break;
  case 'failed':
    // @todo, this currently stores just the failures. We need to pass all
    // results.
    result.elements.push($element);
    result.status = 'failed';
    if (isCallable(quail.options.testFailed)) {
      quail.options.testFailed(info);
    }
    break;
  case 'passed':
    result.status = 'passed';
    if (isCallable(quail.options.testPassed)) {
      quail.options.testPassed(info);
    }
    break;
  case 'cantTell':
  case 'untested':
    break;
  default:
    if (isCallable(quail.options.complete)) {
      quail.options.complete(info);
    }
    break;
  }
}

var quail = {

  options : { },

  components : { },

  lib : { },

  testabilityTranslation : {
    0      : 'suggestion',
    0.5    : 'moderate',
    1      : 'severe'
  },

  html : { },

  strings : { },

  accessibilityResults : { },

  accessibilityTests : { },

  // @var TestCollection
  tests : { },

  /**
   * A list of HTML elements that can contain actual text.
   */
  textSelector : ':not(:empty)',

  /**
   * Suspect tags that would indicate a paragraph is being used as a header.
   * I know, font tag, I know. Don't get me started.
   */
  suspectPHeaderTags : ['strong', 'b', 'em', 'i', 'u', 'font'],

  /**
   * Suspect CSS styles that might indicate a paragraph tag is being used as a header.
   */
  suspectPCSSStyles : ['color', 'font-weight', 'font-size', 'font-family'],

  /**
   * Elements that can (naturally) receive keyboard focus.
   */
  focusElements : 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]',

  /**
   * Regular expression to find emoticons.
   */
  emoticonRegex: /((?::|;|B|P|=)(?:-)?(?:\)|\(|o|O|D|P))/g,

  /**
   * A list of self-closing tags.
   */
  selfClosingTags : ['area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr'],

  /**
   * Main run function for quail. It bundles up some accessibility tests,
   * and if tests are not passed, it instead fetches them using getJSON.
   */
  run : function (options) {
    if (quail.options.reset) {
      quail.accessibilityResults = { };
    }
    // Create an empty TestCollection.
    quail.tests = quail.lib.TestCollection();
    // If test defintions are available, iterate through specific tests for this
    // run (supplied in options.guidelines).
    if (quail.options.accessibilityTests) {
      if (quail.options.guideline && quail.options.guideline.length) {
        for (var i = 0, il = quail.options.guideline.length; i < il; ++i) {
          var testName = quail.options.guideline[i];
          if (quail.options.accessibilityTests[testName]) {
            quail.tests.set(testName, quail.options.accessibilityTests[testName]);
          }
        }
      }
      // The quail builder at quailjs.org/build provides an in-scope test object.
      else if (typeof quailBuilderTests !== 'undefined') {
        quail.tests = quail.lib.TestCollection(quailBuilderTests);
      }
      // Use all the tests available as a default.
      else {
        quail.tests = quail.lib.TestCollection(options.accessibilityTests);
      }
    }
    // @todo, make this a runtime configuration option.
    if(!quail.tests.length) {
      $.ajax({
        url : quail.options.jsonPath + '/tests.json',
        async : false,
        dataType : 'json',
        success : function (data) {
          if(typeof data === 'object') {
            quail.tests = quail.lib.TestCollection(data);
          }
        }
      });
    }
    if (typeof quail.options.customTests !== 'undefined') {
      for (var testName in quail.options.customTests) {
        if (quail.options.customTests.hasOwnProperty(testName)) {
          quail.tests.set(testName, quail.options.customTests[testName]);
        }
      }
    }
    // @todo, make this a runtime configuration option.
    if(typeof quail.options.guideline === 'string') {
      $.ajax({
        url : quail.options.jsonPath + '/guidelines/' + quail.options.guideline +'.tests.json',
        async : false,
        dataType : 'json',
        success : function(data) {
          quail.tests = quail.lib.TestCollection(data);
        }
      });
    }

    quail.listenTo(quail.tests, 'results', function (eventName, test) {
      // Process the cases.
      var options = $.extend({},test.get('options'), quail.options);
      test.each(function (index, _case) {
        _processTestResult(_case.get('status'), testName, $(_case.get('element')), options);
      });

      // Call the complete callback.
      if(typeof quail.options.complete !== 'undefined') {
        var results = {
          totals : {
            severe : 0,
            moderate : 0,
            suggestion : 0
          },
          results : quail.accessibilityResults
        };
        $.each(results.results, function(testName, result) {
          results.totals[quail.testabilityTranslation[result.test.get('testability')]] += result.elements.length;
        });
        quail.options.complete(results);
      }
    });
    // Invoke all the registered tests.
    quail.tests.run();
  },

  // @todo, make this a set of methods that all classes extend.
  listenTo: function (dispatcher, eventName, handler) {
    // @todo polyfill Function.prototype.bind.
    handler = handler.bind(this);
    dispatcher.registerListener.call(dispatcher, eventName, handler);
  },

  getConfiguration : function(testName) {
    var test = this.tests.find(testName);
    var guidelines = test && test.get('guidelines');
    var guideline = guidelines && this.options.guidelineName && guidelines[this.options.guidelineName];
    var configuration = guideline && guideline.configuration;
    if (configuration) {
      return configuration;
    }
    return false;
  },

  getGuideline: function (guidelineName) {
    return null; /* a Guideline instance */
  },

  /**
   * Utility function called whenever a test fails.
   * If there is a callback for testFailed, then it
   * packages the object and calls it.
   *
   * @deprecated
   */
  testFails : function(testName, $element, options) {
    _processTestResult('failed', testName, $element, options);
  },

  /**
   * Helper function to determine if a string of text is even readable.
   * @todo - This will be added to in the future... we should also include
   * phonetic tests.
   */
  isUnreadable : function(text) {
    if (typeof text !== 'string') {
      return true;
    }
    return (text.trim().length) ? false : true;
  },

  /**
   * Read more about this function here: https://github.com/kevee/quail/wiki/Layout-versus-data-tables
   */
  isDataTable : function(table) {
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
      spanCells.each(function() {
        if (typeof spanIndex[$(this).index()] === 'undefined') {
          spanIndex[$(this).index()] = 0;
        }
        spanIndex[$(this).index()]++;
      });
      $.each(spanIndex, function(index, count) {
        if (count < numberRows) {
          isDataTable = false;
        }
      });
    }
    // If there are sub tables, but not in the same column row after row, this is a layout table
    var subTables = table.find('table');
    if (subTables.length) {
      var subTablesIndexes = {};
      subTables.each(function() {
        var parentIndex = $(this).parent('td').index();
        if (parentIndex !== false && typeof subTablesIndexes[parentIndex] === 'undefined') {
          subTablesIndexes[parentIndex] = 0;
        }
        subTablesIndexes[parentIndex]++;
      });
      $.each(subTablesIndexes, function(index, count) {
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
  getTextContents : function($element) {
    if ($element.is('p, pre, blockquote, ol, ul, li, dl, dt, dd, figure, figcaption')) {
      return $element.text();
    }
    return $element.clone()
                   .children()
                   .remove()
                   .end()
                   .text();
  },

  /**
   * Helper function to determine if a given URL is even valid.
   */
  validURL : function(url) {
    return url.search(' ') === -1;
  },

  cleanString : function(string) {
    return string.toLowerCase().replace(/^\s\s*/, '');
  },

  containsReadableText : function(element, children) {
    element = element.clone();
    element.find('option').remove();
    if (!quail.isUnreadable(element.text())) {
      return true;
    }
    if (!quail.isUnreadable(element.attr('alt'))) {
      return true;
    }
    if (children) {
      var readable = false;
      element.find('*').each(function() {
        if (quail.containsReadableText($(this), true)) {
          readable = true;
        }
      });
      if (readable) {
        return true;
      }
    }
    return false;
  },

  /**
   * Creates a page-unique selector for the selected DOM element.
   *
   * @param {jQuery} element
   *   An element in a jQuery wrapper.
   *
   * @return {string}
   *   A unique selector for this element.
   */
  defineUniqueSelector: function (element) {
    /**
     * Indicates whether the selector string represents a unique DOM element.
     *
     * @param {string} selector
     *   A string selector that can be used to query a DOM element.
     *
     * @return Boolean
     *   Whether or not the selector string represents a unique DOM element.
     */
    function isUniquePath (selector) {
      return $(selector).length === 1;
    }

    /**
     * Creates a selector from the element's id attribute.
     *
     * Temporary IDs created by the module that contain "visitorActions" are excluded.
     *
     * @param {HTMLElement} element
     *
     * @return {string}
     *   An id selector or an empty string.
     */
    function applyID (element) {
      var selector = '';
      var id = element.id || '';
      if (id.length > 0) {
        selector = '#' + id;
      }
      return selector;
    }

    /**
     * Creates a selector from classes on the element.
     *
     * Classes with known functional components like the word 'active' are
     * excluded because these often denote state, not identity.
     *
     * @param {HTMLElement} element
     *
     * @return {string}
     *   A selector of classes or an empty string.
     */
    function applyClasses (element) {
      var selector = '';
      // Try to make a selector from the element's classes.
      var classes = element.className || '';
      if (classes.length > 0) {
        classes = classes.split(/\s+/);
        // Filter out classes that might represent state.
        classes = reject(classes, function (cl) {
          return (/active|enabled|disabled|first|last|only|collapsed|open|clearfix|processed/).test(cl);
        });
        if (classes.length > 0) {
          return '.' + classes.join('.');
        }
      }
      return selector;
    }

    /**
     * Finds attributes on the element and creates a selector from them.
     *
     * @param {HTMLElement} element
     *
     * @return {string}
     *   A selector of attributes or an empty string.
     */
    function applyAttributes (element) {
      var selector = '';
      var attributes = ['href', 'type'];
      var value;
      if (typeof element === 'undefined' ||
        typeof element.attributes === 'undefined' ||
        element.attributes === null) {
        return selector;
      }
      // Try to make a selector from the element's classes.
      for (var i = 0, len = attributes.length; i < len; i++) {
        value = element.attributes[attributes[i]] && element.attributes[attributes[i]].value;
        if (value) {
          selector += '[' + attributes[i] + '="' + value + '"]';
        }
      }
      return selector;
    }

    /**
     * Creates a unique selector using id, classes and attributes.
     *
     * It is possible that the selector will not be unique if there is no
     * unique description using only ids, classes and attributes of an
     * element that exist on the page already. If uniqueness cannot be
     * determined and is required, you will need to add a unique identifier
     * to the element through theming development.
     *
     * @param {HTMLElement} element
     *
     * @return {string}
     *   A unique selector for the element.
     */
    function generateSelector (element) {
      var selector = '';
      var scopeSelector = '';
      var pseudoUnique = false;
      var firstPass = true;

      do {
        scopeSelector = '';
        // Try to apply an ID.
        if ((scopeSelector = applyID(element)).length > 0) {
          selector = scopeSelector + ' ' + selector;
          // Assume that a selector with an ID in the string is unique.
          break;
        }

        // Try to apply classes.
        if (!pseudoUnique && (scopeSelector = applyClasses(element)).length > 0) {
          // If the classes don't create a unique path, tack them on and
          // continue.
          selector = scopeSelector + ' ' + selector;
          // If the classes do create a unique path, mark this selector as
          // pseudo unique. We will keep attempting to find an ID to really
          // guarantee uniqueness.
          if (isUniquePath(selector)) {
            pseudoUnique = true;
          }
        }

        // Process the original element.
        if (firstPass) {
          // Try to add attributes.
          if ((scopeSelector = applyAttributes(element)).length > 0) {
            // Do not include a space because the attributes qualify the
            // element. Append classes if they exist.
            selector = scopeSelector + selector;
          }

          // Add the element nodeName.
          selector = element.nodeName.toLowerCase() + selector;

          // The original element has been processed.
          firstPass = false;
        }

        // Try the parent element to apply some scope.
        element = element.parentNode;
      } while (element && element.nodeType === 1 && element.nodeName !== 'BODY' && element.nodeName !== 'HTML');

      return selector.trim();
    }

    /**
     * Helper function to filter items from a list that pass the comparator
     * test.
     *
     * @param {Array} list
     * @param {function} comparator
     *   A function that return a boolean. True means the list item will be
     *   discarded from the list.
     * @return array
     *   A list of items the excludes items that passed the comparator test.
     */
    function reject (list, comparator) {
      var keepers = [];
      for (var i = 0, il = list.length; i < il; i++) {
        if (!comparator.call(null, list[i])) {
          keepers.push(list[i]);
        }
      }
      return keepers;
    }

    return element && generateSelector(element);
  }
};

$.getJSON('/dist/tests.json', {}, function (result, status, jqXHR) {
  var tests;
  quail.tests = new quail.lib.TestCollection(result);
  // Register event listeners to the guideline Techniques.
  var wcag = $.getJSON('/dist/guidelines/wcag.json', {}, function (result, status, jqXHR) {
    var guideline = new quail.lib.WCAGGuideline(result);
    // Round up the tests for each section in the guideline.
    guideline.each(function (index, section) {
      section.each(function (index, technique) {
        // returns a TestCollection.
        tests = quail.tests.findByGuideline('wcag', section, technique);
        if (tests.length) {
          // tests.listenTo(technique, 'invoke', tests.run);
          technique.listenTo(tests, 'results', technique.report);
        }
      });
    });
  });
});

// Provide a global to access quail.
if (window) {
  window.quail = quail;
}
