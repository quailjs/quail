$.fn.quail = function(options) {
  if (!this.length) {
    return this;
  }
  quail.options = options;
  quail.html = this;

  //The quail builder at quailjs.org/build provides an in-scope test object.
  if(typeof quailBuilderTests !== 'undefined' &&
     typeof options.accessibilityTests === 'undefined') {
    quail.options.accessibilityTests = quailBuilderTests;
  }
  quail.run();
  
  return this;
};

$.expr[':'].quailCss = function(obj, index, meta, stack) {
  var args = meta[3].split(/\s*=\s*/);
  return $(obj).css(args[0]).search(args[1]) > -1;
};

var quail = {
  
  options : { },

  components : { },
  
  testabilityTranslation : {
		0			: 'suggestion',
		0.5		: 'moderate',
		1			: 'severe'
  },
  
  html : { },

  strings : { },

  accessibilityResults : { },

  accessibilityTests : { },
  
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
   * Suspect CSS styles that might indicate a paragarph tag is being used as a header.
   */
  suspectPCSSStyles : ['color', 'font-weight', 'font-size', 'font-family'],
  
  /**
   * Elements that can (naturally) recieve keyboard focus.
   */
  focusElements : 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]',

  /**
   * Regular expression to find emoticons.
   */
  emoticonRegex: /((?::|;|B|P|=)(?:-)?(?:\)|\(|o|O|D|P))/g,
  /**
   * Main run function for quail. It bundles up some accessibility tests,
   * and if tests are not passed, it instead fetches them using getJSON.
   */
  run : function() {
    if(quail.options.reset) {
      quail.accessibilityResults = { };
    }
    if(typeof quail.options.accessibilityTests !== 'undefined') {
      quail.accessibilityTests = quail.options.accessibilityTests;
    }
    else {
      $.ajax({ url : quail.options.jsonPath + '/tests.json',
               async : false,
               dataType : 'json',
               success : function(data) {
                  if(typeof data === 'object') {
                    quail.accessibilityTests = data;
                  }
              }});
    }
    if(typeof quail.options.customTests !== 'undefined') {
      for (var testName in quail.options.customTests) {
        quail.accessibilityTests[testName] = quail.options.customTests[testName];
      }
    }
    if(typeof quail.options.guideline === 'string') {
      $.ajax({ url : quail.options.jsonPath + '/guidelines/' + quail.options.guideline +'.tests.json',
               async : false,
               dataType : 'json',
               success : function(data) {
                  quail.options.guideline = data;
              }});
    }
    if(typeof quail.options.guideline === 'undefined') {
      quail.options.guideline = [ ];
      for (var guidelineTestName in quail.accessibilityTests) {
        quail.options.guideline.push(guidelineTestName);
      }
    }

    quail.runTests();
    if(typeof quail.options.complete !== 'undefined') {
      var results = {totals : {severe : 0, moderate : 0, suggestion : 0 },
                    results : quail.accessibilityResults };
      $.each(results.results, function(testName, result) {
        results.totals[quail.testabilityTranslation[quail.accessibilityTests[testName].testability]] += result.elements.length;
      });
      quail.options.complete(results);
    }
  },

  getConfiguration : function(testName) {
    if(typeof this.options.guidelineName === 'undefined' ||
       typeof this.accessibilityTests[testName].guidelines === 'undefined' ||
       typeof this.accessibilityTests[testName].guidelines[this.options.guidelineName] === 'undefined' ||
       typeof this.accessibilityTests[testName].guidelines[this.options.guidelineName].configuration === 'undefined') {
      return false;
    }
    return this.accessibilityTests[testName].guidelines[this.options.guidelineName].configuration;
  },
  
  /**
   * Utility function called whenever a test fails.
   * If there is a callback for testFailed, then it
   * packages the object and calls it.
   */
  testFails : function(testName, $element, options) {
    options = options || {};
    
    if(typeof quail.options.preFilter !== 'undefined') {
      if(quail.options.preFilter(testName, $element, options) === false) {
        return;
      }
    }

    quail.accessibilityResults[testName].elements.push($element);
    if(typeof quail.options.testFailed !== 'undefined') {
      var testability = (typeof quail.accessibilityTests[testName].testability !== 'undefined') ?
                     quail.accessibilityTests[testName].testability :
                     'unknown';
      
      quail.options.testFailed({element  : $element,
                             selector    : quail.defineUniqueSelector($element.length && $element[0] || null),
                             location    : window && window.location || null,
                             testName    : testName,
                             test        : quail.accessibilityTests[testName],
                             testability : testability,
                             severity    : quail.testabilityTranslation[testability],
                             options     : options
                             });
    }
  },

  /**
  * Iterates over all the tests in the provided guideline and
  * figures out which function or object will handle it.
  * Custom callbacks are included directly, others might be part of a category
  * of tests.
  */
  runTests : function() {
    $.each(quail.options.guideline, function(index, testName) {
      var test = quail.accessibilityTests[testName];
      if(!test) {
        return;
      }
      var testType = test.type;
      var options = test.options || {};
      quail.accessibilityResults[testName] = quail.accessibilityResults[testName] || {
        test: test,
        elements : []
      };

      if(testType === 'selector') {
        quail.html.find(options.selector).each(function() {
          quail.testFails(testName, $(this));
        });
      }
      if(testType === 'custom') {
        if(typeof test.callback === 'object' || typeof test.callback === 'function') {
          test.callback(quail);
        }
        else {
          if(typeof quail[test.callback] !== 'undefined') {
            quail[test.callback]();
          }
        }
      }
      if(typeof quail.components[testType] !== 'undefined') {
        quail.components[testType](testName, test);
      }
    });
  },

  /**
   * Helper function to determine if a string of text is even readable.
   * @todo - This will be added to in the future... we should also include
   * phonetic tests.
   */
  isUnreadable : function(text) {
    if(typeof text !== 'string') {
      return true;
    }
    return (text.trim().length) ? false : true;
  },

  /**
   * Read more about this function here: https://github.com/kevee/quail/wiki/Layout-versus-data-tables
   */
  isDataTable : function(table) {
    //If there are less than three rows, why do a table?
    if(table.find('tr').length < 3) {
      return false;
    }
    //If you are scoping a table, it's probably not being used for layout
    if(table.find('th[scope]').length) {
      return true;
    }
    var numberRows = table.find('tr:has(td)').length;
    //Check for odd cell spanning
    var spanCells = table.find('td[rowspan], td[colspan]');
    var isDataTable = true;
    if(spanCells.length) {
      var spanIndex = {};
      spanCells.each(function() {
        if(typeof spanIndex[$(this).index()] === 'undefined') {
          spanIndex[$(this).index()] = 0;
        }
        spanIndex[$(this).index()]++;
      });
      $.each(spanIndex, function(index, count) {
        if(count < numberRows) {
          isDataTable = false;
        }
      });
    }
    //If there are sub tables, but not in the same column row after row, this is a layout table
    var subTables = table.find('table');
    if(subTables.length) {
      var subTablesIndexes = {};
      subTables.each(function() {
        var parentIndex = $(this).parent('td').index();
        if(parentIndex !== false && typeof subTablesIndexes[parentIndex] === 'undefined') {
          subTablesIndexes[parentIndex] = 0;
        }
        subTablesIndexes[parentIndex]++;
      });
      $.each(subTablesIndexes, function(index, count) {
        if(count < numberRows) {
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
    if($element.is('p, pre, blockquote, ol, ul, li, dl, dt, dd, figure, figcaption')) {
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
    return (url.search(' ') === -1) ? true : false;
  },
  
  cleanString : function(string) {
    return string.toLowerCase().replace(/^\s\s*/, '');
  },

  containsReadableText : function(element, children) {
    element = element.clone();
    element.find('option').remove();
    if(!quail.isUnreadable(element.text())) {
      return true;
    }
    if(!quail.isUnreadable(element.attr('alt'))) {
      return true;
    }
    if(children) {
      var readable = false;
      element.find('*').each(function() {
        if(quail.containsReadableText($(this), true)) {
          readable = true;
        }
      });
      if(readable) {
        return true;
      }
    }
    return false;
  },

  /**
   * Creates a page-unique selector for the selected DOM element.
   *
   * @param jQuery $element
   *   An element in a jQuery wrapper.
   *
   * @return String
   *   A unique selector for this element.
   */
  defineUniqueSelector: function (element) {
    /**
     * Indicates whether the selector string represents a unique DOM element.
     *
     * @param String selector
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
     * @param DOM element
     *
     * @return String
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
     * @param DOM element
     *
     * @return String
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
     * @param DOM element
     *
     * @return String
     *   A selector of attributes or an empty string.
     */
    function applyAttributes (element) {
      var selector = '';
      var attributes = ['href', 'type'];
      var value;
      // Try to make a selector from the element's classes.
      for (var i = 0, len = attributes.length; i < len; i++) {
        value = element.attributes[attributes[i]] && element.attributes[attributes[i]].value;
        if (value) {
          // If the attr is href and it points to a specific user account,
          // just tack on the attr name and not the value.
          if (attributes[i] === 'href' && (/user\/[a-zA-z0-9]+/).test(value)) {
            selector += '[' + attributes[i] + ']';
          }
          else {
            selector += '[' + attributes[i] + '="' + value + '"]';
          }
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
     * @param DOM element
     *
     * @return String
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
     * @param array list
     * @param function comparator
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
