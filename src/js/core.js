// Polyfill Function.prototype.bind
// @see https://gist.github.com/dsingleton/1312328
Function.prototype.bind=Function.prototype.bind||function(b){if(typeof this!=="function"){throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");}var a=Array.prototype.slice,f=a.call(arguments,1),e=this,c=function(){},d=function(){return e.apply(this instanceof c?this:b||window,f.concat(a.call(arguments)));};c.prototype=this.prototype;d.prototype=new c();return d;};

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
function _processTestResult () {
  // var testability = test.get('testability');
  // testability = (testability) ? testability : 'unknown';
  // var info = {
  //   element     : $element,
  //   selector    : quail.defineUniqueSelector($element.length && $element[0] || null),
  //   location    : window && window.location || null,
  //   testName    : testName,
  //   test        : quail.tests.find(testName),
  //   testability : testability,
  //   severity    : quail.testabilityTranslation[testability],
  //   options     : options
  // };
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

  html : null,

  strings : { },

  accessibilityResults : { },

  accessibilityTests : null,

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
    if (options.reset) {
      quail.accessibilityResults = { };
    }

    function buildTests (quail, data, options) {
      // Filter for specific tests.
      if (options.guideline && options.guideline.length) {
        quail.tests = quail.lib.TestCollection([], {
          scope: quail.html || null
        });
        for (var i = 0, il = options.guideline.length; i < il; ++i) {
          var t = options.guideline[i];
          if (data[t]) {
            data[t].scope = quail.html || null;
            quail.tests.set(t, data[t]);
          }
        }
      }
      // Or use all of the tests.
      else {
        quail.tests = quail.lib.TestCollection(data, {
          scope: quail.html || null
        });
      }
    }

    // Create an empty TestCollection.
    quail.tests = quail.lib.TestCollection([], {
      scope: quail.html || null
    });
    // The quail builder at quailjs.org/build provides an in-scope test object.
    if (typeof quailBuilderTests !== 'undefined') {
      quail.tests = quail.lib.TestCollection(quailBuilderTests, {
        scope: quail.html || null
      });
    }
    // If a list of specific tests is provided, use them.
    else if (options.accessibilityTests) {
      buildTests(quail, options.accessibilityTests, options);
    }
    // Otherwise get the tests from the json data list.
    else {
      var url = options.jsonPath;
      // Get a specific guideline.
      if (typeof options.guideline === 'string') {
        url += '/guidelines/' + options.guideline;
      }

      $.ajax({
        url : url + '/tests.json',
        async : false,
        dataType : 'json',
        success : function (data) {
          if (typeof data === 'object') {
            buildTests(quail, data, options);
          }
        }
      });
    }
    // Push custom tests into the test collection.
    if (typeof options.customTests !== 'undefined') {
      for (var testName in options.customTests) {
        if (options.customTests.hasOwnProperty(testName)) {
          options.customTests[testName].scope = quail.html || null;
          quail.tests.set(testName, options.customTests[testName]);
        }
      }
    }

    /**
     * @deprecated. Just keeping this around so we know what the old API looks
     * like.
     */
    // var onResults = function (eventName, thisTest, _case) {
    //   // Call the complete callback.
    //   if(typeof quail.options.complete !== 'undefined') {
    //     var results = {
    //       totals : {
    //         severe : 0,
    //         moderate : 0,
    //         suggestion : 0
    //       },
    //       results : quail.accessibilityResults
    //     };
    //     $.each(results.results, function(testName, result) {
    //       results.totals[quail.testabilityTranslation[result.test.get('testability')]] += result.elements.length;
    //     });
    //     quail.options.complete(results);
    //   }
    // };

    // Invoke all the registered tests.
    quail.tests.run({
      preFilter: options.preFilter || function () {},
      caseResolve: options.caseResolve || function () {},
      testComplete: options.testComplete || function () {},
      complete: options.complete || function () {}
    });
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
  }
};

// Provide a global to access quail.
if (window) {
  window.quail = quail;
}
