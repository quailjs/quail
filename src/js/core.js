$.fn.quail = function(options) {
  if (!this.length) {
    return this;
  }
  quail.options = options;

  quail.html = this;
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
  textSelector : 'p, h1, h2, h3, h4, h5, h6, div, pre, blockquote, aside, article, details, summary, figcaption, footer, header, hgroup, nav, section, strong, em, del, i, b',
  
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
        results.totals[quail.testabilityTranslation[quail.accessibilityTests[testName].testability]] += result.elements.length;      });
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
      var severity = 
      quail.options.testFailed({element  : $element,
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
      if(typeof quail.accessibilityTests[testName] === 'undefined') {
        return;
      }
      var testType = quail.accessibilityTests[testName].type;
      if(typeof quail.accessibilityResults[testName] === 'undefined') {
        quail.accessibilityResults[testName] = { test : quail.accessibilityTests[testName], elements : [ ] };
      }
      if(testType === 'selector') {
        quail.html.find(quail.accessibilityTests[testName].selector).each(function() {
          quail.testFails(testName, $(this));
        });
      }
      if(testType === 'custom') {
        if(typeof quail.accessibilityTests[testName].callback === 'object' ||
           typeof quail.accessibilityTests[testName].callback === 'function') {
          quail.accessibilityTests[testName].callback(quail);
        }
        else {
          if(typeof quail[quail.accessibilityTests[testName].callback] !== 'undefined') {
            quail[quail.accessibilityTests[testName].callback]();
          }
        }
      }
      if(typeof quail.components[testType] !== 'undefined') {
        quail.components[testType](testName, quail.accessibilityTests[testName]);
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
  }
};
