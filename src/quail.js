/*! QUAIL quailjs.org | quailjs.org/license */

;(function($) {

  $.fn.quail = function(options) {
    if (!this.length) {
      return this;
    }
    quail.options = options;

    quail.html = this;
    quail.run();
    
    return this;
  };

  var quail = {
    
    options : { },
    
    testCallbacks : {
      'placeholder'    : 'placeholderTest',
      'label'          : 'labelTest',
      'header'         : 'headerOrderTest',
      'event'          : 'scriptEventTest',
      'labelProximity' : 'labelProximityTest',
      'color'          : 'colorTest'
    },
    
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
        $.ajax({ url : quail.options.jsonPath + '/guidelines/' + quail.options.guideline +'.json',
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
          results.totals[quail.testabilityTranslation[quail.accessibilityTests[testName].testability]] += result.length;
        });
        quail.options.complete(results);
      }
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

      quail.accessibilityResults[testName].push($element);
      if(typeof quail.options.testFailed !== 'undefined') {
        var testability = (typeof quail.accessibilityTests[testName].testability !== 'undefined') ?
                       quail.accessibilityTests[testName].testability :
                       'unknown';
        var severity = 
        quail.options.testFailed({element  : $element,
                               testName    : testName,
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
          quail.accessibilityResults[testName] = [ ];
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
        if(typeof quail[quail.testCallbacks[testType]] !== 'undefined') {
          quail[quail.testCallbacks[testType]](testName, quail.accessibilityTests[testName]);
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

    /**
     * Helper function to load a string from the jsonPath directory.
     */
    loadString : function(stringFile) {
      if(typeof quail.strings[stringFile] !== 'undefined') {
        return quail.strings[stringFile];
      }
      $.ajax({ url : quail.options.jsonPath + '/strings/' + stringFile + '.json',
               async: false,
               dataType : 'json',
               success : function(data) {
                quail.strings[stringFile] = data;
               }});
      return quail.strings[stringFile];
    },
    
    cleanString : function(string) {
      return string.toLowerCase().replace(/^\s\s*/, '');
    },
    
    /**
     * If a test uses the hasEventListener plugin, load it.
     * @todo - Allow this to be configured, although since we can
     * just check if it's there and if so, not load it, people could just
     * include the script.
     */
    loadHasEventListener : function() {
      if(typeof jQuery.hasEventListener !== 'undefined') {
        return;
      }
      $.ajax({url : quail.options.jsonPath + '/../../libs/jquery.hasEventListener/jquery.hasEventListener-2.0.3.min.js',
              async : false,
              dataType : 'script'
            });
    },

    /**
     * Loads the pixToEm jQuery plugin.
     */
    loadPixelToEm : function() {
      if(typeof jQuery.toPx !== 'undefined') {
        return;
      }
      $.ajax({url : quail.options.jsonPath + '/../../libs/jquery.pxToEm/pxem.jQuery.js',
              async : false,
              dataType : 'script'
            });
    },

    /**
     * Placeholder test - checks that an attribute or the content of an
     * element itself is not a placeholder (i.e. "click here" for links).
     */
    placeholderTest : function(testName, options) {
      quail.loadString('placeholders');
      quail.html.find(options.selector).each(function() {
        var text;
        if(typeof options.attribute !== 'undefined') {
          if(typeof $(this).attr(options.attribute) === 'undefined' ||
                (options.attribute === 'tabindex' &&
                  !$(this).attr(options.attribute)
                )
             ) {
            quail.testFails(testName, $(this));
            return;
          }
          text = $(this).attr(options.attribute);
        }
        else {
          text = $(this).text();
          $(this).find('img[alt]').each(function() {
            text += $(this).attr('alt');
          });
        }
        if(typeof text === 'string') {
          text = quail.cleanString(text);
          var regex = /^([0-9]*)(k|kb|mb|k bytes|k byte)$/g;
          var regexResults = regex.exec(text.toLowerCase());
          if(regexResults && regexResults[0].length) {
            quail.testFails(testName, $(this));
          }
          else {
            if(options.empty && quail.isUnreadable(text)) {
              quail.testFails(testName, $(this));
            }
            else {
              if(quail.strings.placeholders.indexOf(text) > -1 ) {
                quail.testFails(testName, $(this));
              }
            }
          }
        }
        else {
          if(options.empty && typeof text !== 'number') {
            quail.testFails(testName, $(this));
          }
        }
      });
    },

    /**
     * Tests that a label element is close (DOM-wise) to it's target form element.
     */
    labelProximityTest : function(testName, options) {
        quail.html.find(options.selector).each(function() {
          var $label = quail.html.find('label[for=' + $(this).attr('id') + ']').first();
          if(!$label.length) {
            quail.testFails(testName, $(this));
          }
          if(!$(this).parent().is($label.parent())) {
            quail.testFails(testName, $(this));
          }
        });
    },
    
    /**
     * Test callback for color tests. This handles both WAI and WCAG
     * color contrast/luminosity.
     */
    colorTest : function(testName, options) {
      if(options.bodyForegroundAttribute && options.bodyBackgroundAttribute) {
        var $body = quail.html.find('body').clone(false, false);
        var foreground = $body.attr(options.bodyForegroundAttribute);
        var background = $body.attr(options.bodyBackgroundAttribute);
        if(typeof foreground === 'undefined') {
          foreground = 'rgb(0,0,0)';
        }
        if(typeof background === 'undefined') {
          foreground =  'rgb(255,255,255)';
        }
        $body.css('color', foreground);
        $body.css('background-color', background);
        if((options.algorithm === 'wcag' && !quail.colors.passesWCAG($body)) ||
           (options.algorithm === 'wai' && !quail.colors.passesWAI($body))) {
           quail.testFails(testName, $body);
        }
      }
      quail.html.find(options.selector).filter(quail.textSelector).each(function() {
        if(!quail.isUnreadable($(this).text()) &&
           (options.algorithm === 'wcag' && !quail.colors.passesWCAG($(this))) ||
           (options.algorithm === 'wai' && !quail.colors.passesWAI($(this)))) {
           quail.testFails(testName, $(this));
        }
      });
    },

    /**
     * Test callback for tests that look for script events
     *  (like a mouse event has a keyboard event as well).
     */
    scriptEventTest : function(testName, options) {
      quail.loadHasEventListener();
      var $items = (typeof options.selector === 'undefined') ?
                    quail.html.find('body').find('*') :
                    quail.html.find(options.selector);
      $items.each(function() {
        var $element = $(this).get(0);
        if($(this).attr(options.searchEvent)) {
          if(typeof options.correspondingEvent === 'undefined' ||
             !$(this).attr(options.correspondingEvent)) {
            quail.testFails(testName, $(this));
          }
        }
        else {
          if($.hasEventListener($element, options.searchEvent.replace('on', '')) &&
             (typeof options.correspondingEvent === 'undefined' ||
             !$.hasEventListener($element, options.correspondingEvent.replace('on', '')))) {
            quail.testFails(testName, $(this));
          }
        }
      });
    },

    labelTest : function(testName, options) {
      quail.html.find(options.selector).each(function() {
        if((!$(this).parent('label').length ||
            !quail.containsReadableText($(this).parent('label'))) &&
          (!quail.html.find('label[for=' + $(this).attr('id') + ']').length ||
           !quail.containsReadableText(quail.html.find('label[for=' + $(this).attr('id') + ']')))) {
            quail.testFails(testName, $(this));
        }
      });
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
    
    headerOrderTest : function(testName, options) {
      var current = parseInt(options.selector.substr(-1, 1), 10);
      var nextHeading = false;
      quail.html.find('h1, h2, h3, h4, h5, h6').each(function() {
        var number = parseInt($(this).get(0).tagName.substr(-1, 1), 10);
        if(nextHeading && (number - 1 > current || number + 1 < current)) {
          quail.testFails(testName, $(this));
        }
        if(number === current) {
          nextHeading = $(this);
        }
        if(nextHeading && number !== current) {
          nextHeading = false;
        }
      });
    },
    
    acronymTest : function(testName, acronymTag) {
      var predefined = { };
      var alreadyReported = { };
      quail.html.find(acronymTag + '[title]').each(function() {
        predefined[$(this).text().toUpperCase()] = $(this).attr('title');
      });
      quail.html.find('p, div, h1, h2, h3, h4, h5').each(function(){
        var $el = $(this);
        var words = $(this).text().split(' ');
        if(words.length > 1 && $(this).text().toUpperCase() !== $(this).text()) {
          $.each(words, function(index, word) {
            word = word.replace(/[^a-zA-Zs]/, '');
            if(word.toUpperCase() === word &&
               word.length > 1 &&
               typeof predefined[word.toUpperCase()] === 'undefined') {
              if(typeof alreadyReported[word.toUpperCase()] === 'undefined') {
                quail.testFails(testName, $el, {acronym : word.toUpperCase()});
              }
              alreadyReported[word.toUpperCase()] = word;
            }
          });
        }
      });
    },
    
    aAdjacentWithSameResourceShouldBeCombined : function() {
      quail.html.find('a').each(function() {
        if($(this).next('a').attr('href') === $(this).attr('href')) {
          quail.testFails('aAdjacentWithSameResourceShouldBeCombined', $(this));
        }
      });
    },
    
    aImgAltNotRepetative : function() {
      quail.html.find('a img[alt]').each(function() {
        if(quail.cleanString($(this).attr('alt')) === quail.cleanString($(this).parent('a').text())) {
          quail.testFails('aImgAltNotRepetative', $(this).parent('a'));
        }
      });
    },

    aLinksAreSeperatedByPrintableCharacters : function() {
      quail.html.find('a').each(function() {
        if($(this).next('a').length && quail.isUnreadable($(this).get(0).nextSibling.wholeText)) {
          quail.testFails('aLinksAreSeperatedByPrintableCharacters', $(this));
        }
      });
    },
    
    aLinkTextDoesNotBeginWithRedundantWord : function() {
      var redundant = quail.loadString('redundant');
      quail.html.find('a').each(function() {
        var $link = $(this);
        var text = '';
        if($(this).find('img[alt]').length) {
          text = text + $(this).find('img[alt]:first').attr('alt');
        }
        text = text + $(this).text();
        text = text.toLowerCase();
        $.each(redundant.link, function(index, phrase) {
          if(text.search(phrase) > -1) {
            quail.testFails('aLinkTextDoesNotBeginWithRedundantWord', $link);
          }
        });
      });
    },
    
    aMustContainText : function() {
      quail.html.find('a').each(function() {
        if(!quail.containsReadableText($(this), true) && 
           !(($(this).attr('name') || $(this).attr('id')) && !$(this).attr('href'))) {
          quail.testFails('aMustContainText', $(this));
        }
      });
    },
    
    aSuspiciousLinkText : function() {
      var suspiciousText = quail.loadString('suspicious_links');
      quail.html.find('a').each(function() {
        var text = $(this).text();
        $(this).find('img[alt]').each(function() {
          text = text + $(this).attr('alt');
        });
        if(suspiciousText.indexOf(quail.cleanString(text)) > -1) {
          quail.testFails('aSuspiciousLinkText', $(this));
        }
      });
    },
    
    blockquoteUseForQuotations : function() {
      quail.html.find('p').each(function() {
        if($(this).text().substr(0, 1).search(/[\'\"]/) > -1 &&
           $(this).text().substr(-1, 1).search(/[\'\"]/) > -1) {
          quail.testFails('blockquoteUseForQuotations', $(this));
        }
      });
    },

    documentAcronymsHaveElement : function() {
      quail.acronymTest('documentAcronymsHaveElement', 'acronym');
    },

    documentAbbrIsUsed : function() {
      quail.acronymTest('documentAbbrIsUsed', 'abbr');
    },

    documentTitleIsShort : function() {
      if(quail.html.find('head title:first').text().length > 150) {
        quail.testFails('documentTitleIsShort', quail.html.find('head title:first'));
      }
    },
    
    documentVisualListsAreMarkedUp : function() {
      var listQueues = [/\*/g, '<br>*', '&bull;', '&#8226'];
      quail.html.find('p, div, h1, h2, h3, h4, h5, h6').each(function() {
        var $element = $(this);
        $.each(listQueues, function(index, item) {
          if($element.text().split(item).length > 2) {
            quail.testFails('documentVisualListsAreMarkedUp', $element);
          }
        });
      });
    },
    
    documentValidatesToDocType : function() {
      if(typeof document.doctype === 'undefined') {
        return;
      }
    },
    
    documentIDsMustBeUnique : function() {
      var ids = [];
      quail.html.find('*[id]').each(function() {
        if(ids.indexOf($(this).attr('id')) >= 0) {
          quail.testFails('documentIDsMustBeUnique', $(this));
        }
        ids.push($(this).attr('id'));
      });
    },
    
    documentIsWrittenClearly : function() {
      quail.html.find(quail.textSelector).each(function() {
        var text = quail.textStatistics.cleanText($(this).text());
        if(Math.round((206.835 - (1.015 * quail.textStatistics.averageWordsPerSentence(text)) - (84.6 * quail.textStatistics.averageSyllablesPerWord(text)))) < 60) {
          quail.testFails('documentIsWrittenClearly', $(this));
        }
      });
    },
    
    documentLangIsISO639Standard : function() {
      var languages = quail.loadString('language_codes');
      var language = quail.html.find('html').attr('lang');
      if(!language) {
        return;
      }
      if(languages.indexOf(language) === -1) {
          quail.testFails('documentLangIsISO639Standard', quail.html.find('html'));
      }
    },
    
    doctypeProvided : function() {
      if($(quail.html.get(0).doctype).length === 0) {
        quail.testFails('doctypeProvided', quail.html.find('html'));
      }
    },

    appletContainsTextEquivalent : function() {
      quail.html.find('applet[alt=], applet:not(applet[alt])').each(function() {
        if(quail.isUnreadable($(this).text())) {
          quail.testFails('appletContainsTextEquivalent', $(this));
        }
      });
    },
    
    documentStrictDocType : function() {
      if(!$(quail.html.get(0).doctype).length ||
         quail.html.get(0).doctype.systemId.indexOf('strict') === -1) {
        quail.testFails('documentStrictDocType', quail.html.find('html'));
      }
    },

    embedHasAssociatedNoEmbed : function() {
      if(quail.html.find('noembed').length) {
        return;
      }
      quail.html.find('embed').each(function() {
        quail.testFails('embedHasAssociatedNoEmbed', $(this));
      });
    },
    
    emoticonsExcessiveUse : function() {
      var emoticons = quail.loadString('emoticons');
      var count = 0;
      quail.html.find('p, div, h1, h2, h3, h4, h5, h6').each(function() {
        var $element = $(this);
        $.each($element.text().split(' '), function(index, word) {
          if(emoticons.indexOf(word) > -1) {
            count++;
          }
          if(count > 4) {
            return;
          }
        });
        if(count > 4) {
          quail.testFails('emoticonsExcessiveUse', $element);
        }
      });
    },
    
    emoticonsMissingAbbr : function() {
      var emoticons = quail.loadString('emoticons');
      quail.html.find('p, div, h1, h2, h3, h4, h5, h6').each(function() {
        var $element = $(this);
        var $clone = $element.clone();
        $clone.find('abbr, acronym').each(function() {
          $(this).remove();
        });
        $.each($clone.text().split(' '), function(index, word) {
          if(emoticons.indexOf(word) > -1) {
            quail.testFails('emoticonsMissingAbbr', $element);
          }
        });
      });
    },
    
    formWithRequiredLabel : function() {
       var redundant = quail.loadString('redundant');
       var lastStyle, currentStyle = false;
       redundant.required[redundant.required.indexOf('*')] = /\*/g;
       quail.html.find('label').each(function() {
         var text = $(this).text().toLowerCase();
         var $label = $(this);
         $.each(redundant.required, function(index, word) {
           if(text.search(word) >= 0 && !quail.html.find('#' + $label.attr('for')).attr('aria-required')) {
             quail.testFails('formWithRequiredLabel', $label);
           }
         });
         currentStyle = $label.css('color') + $label.css('font-weight') + $label.css('background-color');
         if(lastStyle && currentStyle !== lastStyle) {
           quail.testFails('formWithRequiredLabel', $label);
         }
         lastStyle = currentStyle;
       });
    },
    
    headersUseToMarkSections : function() {
      quail.html.find('p').each(function() {
        var $paragraph = $(this);
        $paragraph.find('strong:first, em:first, i:first, b:first').each(function() {
          if($paragraph.text() === $(this).text()) {
            quail.testFails('headersUseToMarkSections', $paragraph);
          }
        });
      });
    },

    imgAltIsDifferent : function() {
      quail.html.find('img[alt][src]').each(function() {
        if($(this).attr('src') === $(this).attr('alt') || $(this).attr('src').split('/').pop() === $(this).attr('alt')) {
          quail.testFails('imgAltIsDifferent', $(this));
        }
      });
    },

    imgAltIsTooLong : function() {
      quail.html.find('img[alt]').each(function() {
        if($(this).attr('alt').length > 100) {
          quail.testFails('imgAltIsTooLong', $(this));
        }
      });
    },
    
    imgAltTextNotRedundant : function() {
      var altText = {};
      quail.html.find('img[alt]').each(function() {
        if(typeof altText[$(this).attr('alt')] === 'undefined') {
          altText[$(this).attr('alt')] = $(this).attr('src');
        }
        else {
          if(altText[$(this).attr('alt')] !== $(this).attr('src')) {
            quail.testFails('imgAltTextNotRedundant', $(this));
          }
        }
      });
    },
    
    inputCheckboxRequiresFieldset : function() {
      quail.html.find(':checkbox').each(function() {
        if(!$(this).parents('fieldset').length) {
          quail.testFails('inputCheckboxRequiresFieldset', $(this));
        }
      });
    },

    inputImageAltIsNotFileName : function() {
      quail.html.find('input[type=image][alt]').each(function() {
        if($(this).attr('src') === $(this).attr('alt')) {
          quail.testFails('inputImageAltIsNotFileName', $(this));
        }
      });
    },

    inputImageAltIsShort : function() {
      quail.html.find('input[type=image]').each(function() {
        if($(this).attr('alt').length > 100) {
          quail.testFails('inputImageAltIsShort', $(this));
        }
      });
    },
    
    inputImageAltNotRedundant : function() {
      var redundant = quail.loadString('redundant');
      quail.html.find('input[type=image][alt]').each(function() {
        if(redundant.inputImage.indexOf(quail.cleanString($(this).attr('alt'))) > -1) {
          quail.testFails('inputImageAltNotRedundant', $(this));
        }
      });
    },

    imgImportantNoSpacerAlt : function() {
      quail.html.find('img[alt]').each(function() {
        var width = ($(this).width()) ? $(this).width() : parseInt($(this).attr('width'), 10);
        var height = ($(this).height()) ? $(this).height() : parseInt($(this).attr('height'), 10);
        if(quail.isUnreadable($(this).attr('alt').trim()) &&
           $(this).attr('alt').length > 0 &&
           width > 50 &&
           height > 50) {
            quail.testFails('imgImportantNoSpacerAlt', $(this));
        }
      });
    },
    
    imgNonDecorativeHasAlt : function() {
      quail.html.find('img[alt]').each(function() {
        if(quail.isUnreadable($(this).attr('alt')) &&
           ($(this).width() > 100 || $(this).height() > 100)) {
             quail.testFails('imgNonDecorativeHasAlt', $(this));
           }
      });
    },

    imgAltNotEmptyInAnchor : function() {
      quail.html.find('a img').each(function() {
        if(quail.isUnreadable($(this).attr('alt')) &&
           quail.isUnreadable($(this).parent('a:first').text())) {
              quail.testFails('imgAltNotEmptyInAnchor', $(this));
        }
      });
    },

    imgHasLongDesc : function() {
      quail.html.find('img[longdesc]').each(function() {
        if($(this).attr('longdesc') === $(this).attr('alt') ||
           !quail.validURL($(this).attr('longdesc'))) {
            quail.testFails('imgHasLongDesc', $(this));
        }
      });
    },

    imgMapAreasHaveDuplicateLink : function() {
      var links = { };
      quail.html.find('a').each(function() {
        links[$(this).attr('href')] = $(this).attr('href');
      });
      quail.html.find('img[usemap]').each(function() {
        var $image = $(this);
        var $map = quail.html.find($image.attr('usemap'));
        if(!$map.length) {
          $map = quail.html.find('map[name="' + $image.attr('usemap').replace('#', '') + '"]');
        }
        if($map.length) {
          $map.find('area').each(function() {
            if(typeof links[$(this).attr('href')] === 'undefined') {
              quail.testFails('imgMapAreasHaveDuplicateLink', $image);
            }
          });
        }
      });
    },

    imgGifNoFlicker : function() {
      quail.html.find('img[src$=".gif"]').each(function() {
        var $image = $(this);
        $.ajax({url      : $image.attr('src'),
                async    : false,
                dataType : 'text',
                success  : function(data) {
                  if(data.search('NETSCAPE2.0') !== -1) {
                    quail.testFails('imgGifNoFlicker', $image);
                  }
        }});
      });
    },
    
    imgWithMathShouldHaveMathEquivalent : function() {
      quail.html.find('img:not(img:has(math), img:has(tagName))').each(function() {
        if(!$(this).parent().find('math').length) {
          quail.testFails('imgWithMathShouldHaveMathEquivalent', $(this));
        }
      });
    },
    
    labelMustBeUnique : function() {
      var labels = { };
      quail.html.find('label[for]').each(function() {
        if(typeof labels[$(this).attr('for')] !== 'undefined') {
          quail.testFails('labelMustBeUnique', $(this));
        }
        labels[$(this).attr('for')] = $(this).attr('for');
      });
    },
    
    labelsAreAssignedToAnInput : function() {
      quail.html.find('label').each(function() {
        if(!$(this).attr('for')) {
          quail.testFails('labelsAreAssignedToAnInput', $(this));
        }
        else {
          if(!quail.html.find('#' + $(this).attr('for')).length ||
             !quail.html.find('#' + $(this).attr('for')).is('input, select, textarea')) {
            quail.testFails('labelsAreAssignedToAnInput', $(this));
          }
        }
      });
    },
    
    listNotUsedForFormatting : function() {
      quail.html.find('ol, ul').each(function() {
        if($(this).find('li').length < 2) {
          quail.testFails('listNotUsedForFormatting', $(this));
        }
      });
    },
    
    paragarphIsWrittenClearly : function() {
      quail.html.find('p').each(function() {
        var text = quail.textStatistics.cleanText($(this).text());
        if(Math.round((206.835 - (1.015 * quail.textStatistics.averageWordsPerSentence(text)) - (84.6 * quail.textStatistics.averageSyllablesPerWord(text)))) < 60) {
          quail.testFails('paragarphIsWrittenClearly', $(this));
        }
      });
    },
    
    siteMap : function() {
      var mapString = quail.loadString('site_map');
      var set = true;
      quail.html.find('a').each(function() {
        var text = $(this).text().toLowerCase();
        $.each(mapString, function(index, string) {
          if(text.search(string) > -1) {
            set = false;
            return;
          }
        });
        if(set === false) {
          return;
        }
      });
      if(set) {
        quail.testFails('siteMap', quail.html.find('body'));
      }
    },

    pNotUsedAsHeader : function() {
      var priorStyle = { };

      quail.html.find('p').each(function() {
        if($(this).text().search('.') < 1) {
          var $paragraph = $(this);
          $.each(quail.suspectPHeaderTags, function(index, tag) {
            if($paragraph.find(tag).length) {
              $paragraph.find(tag).each(function() {
                if($(this).text().trim() === $paragraph.text().trim()) {
                  quail.testFails('pNotUsedAsHeader', $paragraph);
                }
              });
            }
          });
          $.each(quail.suspectPCSSStyles, function(index, style) {
            if(typeof priorStyle[style] !== 'undefined' &&
               priorStyle[style] !== $paragraph.css(style)) {
              quail.testFails('pNotUsedAsHeader', $paragraph);
            }
            priorStyle[style] = $paragraph.css(style);
          });
          if($paragraph.css('font-weight') === 'bold') {
            quail.testFails('pNotUsedAsHeader', $paragraph);
          }
        }
      });
    },
    
    preShouldNotBeUsedForTabularLayout : function() {
      quail.html.find('pre').each(function() {
        var rows = $(this).text().split(/[\n\r]+/);
        if(rows.length > 1 && $(this).text().search(/\t/) > -1) {
          quail.testFails('preShouldNotBeUsedForTabularLayout', $(this));
        }
      });
    },
    
    selectJumpMenu : function() {
      if(quail.html.find('select').length === 0) {
        return;
      }
      quail.loadHasEventListener();
      
      quail.html.find('select').each(function() {
        if(($(this).parent('form').find(':submit').length === 0 ) &&
           ($.hasEventListener($(this), 'change') ||
           $(this).attr('onchange'))) {
             quail.testFails('selectJumpMenu', $(this));
        }
      });
    },

    tableHeaderLabelMustBeTerse : function() {
      quail.html.find('th, table tr:first td').each(function() {
        if($(this).text().length > 20 &&
           (!$(this).attr('abbr') || $(this).attr('abbr').length > 20)) {
          quail.testFails('tableHeaderLabelMustBeTerse', $(this));
        }
      });
    },

    tabIndexFollowsLogicalOrder : function() {
      var index = 0;
      quail.html.find('[tabindex]').each(function() {
        if(parseInt($(this).attr('tabindex'), 10) >= 0 &&
           parseInt($(this).attr('tabindex'), 10) !== index + 1) {
             quail.testFails('tabIndexFollowsLogicalOrder', $(this));
           }
        index++;
      });
    },
    
    tableLayoutDataShouldNotHaveTh : function() {
      quail.html.find('table:has(th)').each(function() {
        if(!quail.isDataTable($(this))) {
          quail.testFails('tableLayoutDataShouldNotHaveTh', $(this));
        }
      });
    },
    
    tableLayoutHasNoSummary : function() {
      quail.html.find('table[summary]').each(function() {
        if(!quail.isDataTable($(this)) && !quail.isUnreadable($(this).attr('summary'))) {
          quail.testFails('tableLayoutHasNoSummary', $(this));
        }
      });
    },

    tableLayoutHasNoCaption : function() {
      quail.html.find('table:has(caption)').each(function() {
        if(!quail.isDataTable($(this))) {
          quail.testFails('tableLayoutHasNoCaption', $(this));
        }
      });
    },

    tableLayoutMakesSenseLinearized : function() {
      quail.html.find('table').each(function() {
        if(!quail.isDataTable($(this))) {
          quail.testFails('tableLayoutMakesSenseLinearized', $(this));
        }
      });
    },
    
    tableNotUsedForLayout : function() {
      quail.html.find('table').each(function() {
        if(!quail.isDataTable($(this))) {
          quail.testFails('tableNotUsedForLayout', $(this));
        }
      });
    },
    
    tableSummaryDoesNotDuplicateCaption : function() {
      quail.html.find('table[summary]:has(caption)').each(function() {
        if(quail.cleanString($(this).attr('summary')) === quail.cleanString($(this).find('caption:first').text())) {
          quail.testFails('tableSummaryDoesNotDuplicateCaption', $(this));
        }
      });
    },
    
    tableSummaryIsNotTooLong : function() {
      quail.html.find('table[summary]').each(function() {
        if($(this).attr('summary').trim().length > 100) {
          quail.testFails('tableSummaryIsNotTooLong', $(this));
        }
      });
    },

    tableUsesAbbreviationForHeader : function() {
      quail.html.find('th:not(th[abbr])').each(function() {
        if($(this).text().length > 20) {
          quail.testFails('tableUsesAbbreviationForHeader', $(this));
        }
      });
    },
    
    tableUseColGroup : function() {
      quail.html.find('table').each(function() {
        if(quail.isDataTable($(this)) && !$(this).find('colgroup').length) {
          quail.testFails('tableUseColGroup', $(this));
        }
      });
    },
    
    tableUsesScopeForRow : function() {
      quail.html.find('table').each(function() {
        $(this).find('td:first-child').each(function() {
          var $next = $(this).next('td');
          if(($(this).css('font-weight') === 'bold' && $next.css('font-weight') !== 'bold') ||
             ($(this).find('strong').length && !$next.find('strong').length)) {
               quail.testFails('tableUsesScopeForRow', $(this));
             }
        });
        $(this).find('td:last-child').each(function() {
          var $prev = $(this).prev('td');
          if(($(this).css('font-weight') === 'bold' && $prev.css('font-weight') !== 'bold') ||
             ($(this).find('strong').length && !$prev.find('strong').length)) {
               quail.testFails('tableUsesScopeForRow', $(this));
             }
        });
      });
    },
    
    tableWithMoreHeadersUseID : function() {
      quail.html.find('table:has(th)').each(function() {
        var $table = $(this);
        var rows = 0;
        $table.find('tr').each(function() {
          if($(this).find('th').length) {
            rows++;
          }
          if(rows > 1 && !$(this).find('th[id]').length) {
            quail.testFails('tableWithMoreHeadersUseID', $table);
          }
        });
      });
    },
    
    textIsNotSmall : function() {
      quail.loadPixelToEm();
      quail.html.find(quail.textSelector).each(function() {
        var fontSize = $(this).css('font-size');
        if(fontSize.search('em') > 0) {
          fontSize = $(this).toPx({scope : quail.html});
        }
        fontSize = parseInt(fontSize.replace('px', ''), 10);
        if(fontSize < 10) {
          quail.testFails('textIsNotSmall', $(this));
        }
      });
    },
    
    videosEmbeddedOrLinkedNeedCaptions : function() {
      quail.html.find('a').each(function() {
        var $link = $(this);
        $.each(quail.videoServices, function(type, callback) {
          if(callback.isVideo($link.attr('href'))) {
            callback.hasCaptions(function(hasCaptions) {
              if(!hasCaptions) {
                quail.testFails('videosEmbeddedOrLinkedNeedCaptions', $link);
              }
            });
          }
        });
      });
    },
    
    tabularDataIsInTable : function() {
      quail.html.find('pre').each(function() {
        if($(this).html().search('\t') >= 0) {
          quail.testFails('tabularDataIsInTable', $(this));
        }
      });
    }
  };

  /**
   * Utility object for statistics, like average, variance, etc.
   */
  quail.statistics = {
  
    setDecimal : function( num, numOfDec ){
      var pow10s = Math.pow( 10, numOfDec || 0 );
      return ( numOfDec ) ? Math.round( pow10s * num ) / pow10s : num;
    },
    
    average : function( numArr, numOfDec ){
      var i = numArr.length,
        sum = 0;
      while( i-- ){
        sum += numArr[ i ];
      }
      return quail.statistics.setDecimal( (sum / numArr.length ), numOfDec );
    },
    
    variance : function( numArr, numOfDec ){
      var avg = quail.statistics.average( numArr, numOfDec ),
        i = numArr.length,
        v = 0;
     
      while( i-- ){
        v += Math.pow( (numArr[ i ] - avg), 2 );
      }
      v /= numArr.length;
      return quail.statistics.setDecimal( v, numOfDec );
    },
    
    standardDeviation : function( numArr, numOfDec ){
      var stdDev = Math.sqrt( quail.statistics.variance( numArr, numOfDec ) );
      return quail.statistics.setDecimal( stdDev, numOfDec );
    }
  };
    
  /**
   * Utility object to test for color contrast.
   */
  quail.colors = {
  
    getLuminosity : function(foreground, background) {
      foreground = this.cleanup(foreground);
      background = this.cleanup(background);
      
      var RsRGB = foreground.r/255;
      var GsRGB = foreground.g/255;
      var BsRGB = foreground.b/255;
      var R = (RsRGB <= 0.03928) ? RsRGB/12.92 : Math.pow((RsRGB+0.055)/1.055, 2.4);
      var G = (GsRGB <= 0.03928) ? GsRGB/12.92 : Math.pow((GsRGB+0.055)/1.055, 2.4);
      var B = (BsRGB <= 0.03928) ? BsRGB/12.92 : Math.pow((BsRGB+0.055)/1.055, 2.4);
  
      var RsRGB2 = background.r/255;
      var GsRGB2 = background.g/255;
      var BsRGB2 = background.b/255;
      var R2 = (RsRGB2 <= 0.03928) ? RsRGB2/12.92 : Math.pow((RsRGB2+0.055)/1.055, 2.4);
      var G2 = (GsRGB2 <= 0.03928) ? GsRGB2/12.92 : Math.pow((GsRGB2+0.055)/1.055, 2.4);
      var B2 = (BsRGB2 <= 0.03928) ? BsRGB2/12.92 : Math.pow((BsRGB2+0.055)/1.055, 2.4);
      var l1, l2;
      l1 = (0.2126 * R + 0.7152 * G + 0.0722 * B);
      l2 = (0.2126 * R2 + 0.7152 * G2 + 0.0722 * B2);
  
      return Math.round((Math.max(l1, l2) + 0.05)/(Math.min(l1, l2) + 0.05)*10)/10;
    },

    fetchImageColor : function(){
      var img = new Image();
      var src = $(this).css('background-image').replace('url(', '').replace(/'/, '').replace(')', '');
      img.src = src;
      var can = document.createElement('canvas'); 
      var context = can.getContext('2d');
      context.drawImage(img, 0, 0);
      var data = context.getImageData(0, 0, 1, 1).data;
      return 'rgb(' + data[0] + ',' + data[1] + ',' + data[2] + ')';
    },

    passesWCAG : function(element) {
      return (quail.colors.getLuminosity(quail.colors.getColor(element, 'foreground'), quail.colors.getColor(element, 'background')) > 5);
    },
    
    passesWAI : function(element) {
      var foreground = quail.colors.cleanup(quail.colors.getColor(element, 'foreground'));
      var background = quail.colors.cleanup(quail.colors.getColor(element, 'background'));
      return (quail.colors.getWAIErtContrast(foreground, background) > 500 &&
              quail.colors.getWAIErtBrightness(foreground, background) > 125);
    },
    
    getWAIErtContrast : function(foreground, background) {
      var diffs = quail.colors.getWAIDiffs(foreground, background);
      return diffs.red + diffs.green + diffs.blue;
    },
  
    getWAIErtBrightness : function(foreground, background) {
      var diffs = quail.colors.getWAIDiffs(foreground, background);
      return ((diffs.red * 299) + (diffs.green * 587) + (diffs.blue * 114)) / 1000;
  
    },
    
    getWAIDiffs : function(foreground, background) {
       var diff = { };
       diff.red = Math.abs(foreground.r - background.r);
       diff.green = Math.abs(foreground.g - background.g);
       diff.blue = Math.abs(foreground.b - background.b);
       return diff;
    },
    
    getColor : function(element, type) {
      if(type === 'foreground') {
        return (element.css('color')) ? element.css('color') : 'rgb(255,255,255)';
      }
      //return (element.css('background-color')) ? element.css('background-color') : 'rgb(0,0,0)';
      if((element.css('background-color') !== 'rgba(0, 0, 0, 0)' &&
          element.css('background-color') !== 'transparent') ||
         element.get(0).tagName === 'body') {
        return (element.css('background-color')) ? element.css('background-color') : 'rgb(0,0,0)';
      }
      var color = 'rgb(0,0,0)';
      element.parents().each(function(){
        if ($(this).css('background-color') !== 'rgba(0, 0, 0, 0)' &&
            $(this).css('background-color') !== 'transparent') {
            color = $(this).css('background-color');
            return false;
        }
      });
      return color;
    },
    
    cleanup : function(color) {
      color = color.replace('rgb(', '').replace('rgba(', '').replace(')', '').split(',');
      return { r : color[0],
               g : color[1],
               b : color[2],
               a : ((typeof color[3] === 'undefined') ? false : color[3])
             };
    }
  
  };
  
  /**
   * Utility object that runs text statistics, like sentence count,
   * reading level, etc.
   */
  quail.textStatistics = {
  
    cleanText : function(text) {
      return text.replace(/[,:;()\-]/, ' ')
                 .replace(/[\.!?]/, '.')
                 .replace(/[ ]*(\n|\r\n|\r)[ ]*/, ' ')
                 .replace(/([\.])[\. ]+/, '$1')
                 .replace(/[ ]*([\.])/, '$1')
                 .replace(/[ ]+/, ' ')
                 .toLowerCase();
                 
    },
    
    sentenceCount : function(text) {
      var copy = text;
      return copy.split('.').length + 1;
    },
    
    wordCount : function(text) {
      var copy = text;
      return copy.split(' ').length + 1;
    },
    
    averageWordsPerSentence : function(text) {
      return quail.textStatistics.wordCount(text) / quail.textStatistics.sentenceCount(text);
    },
    
    averageSyllablesPerWord : function(text) {
      var count = 0;
      var wordCount = quail.textStatistics.wordCount(text);
      if(!wordCount) {
        return 0;
      }
      $.each(text.split(' '), function(index, word) {
        count += quail.textStatistics.syllableCount(word);
      });
      return count / wordCount;
    },
    
    syllableCount : function(word) {
      var matchedWord = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '')
                            .match(/[aeiouy]{1,2}/g);
      if(!matchedWord || matchedWord.length === 0) {
        return 1;
      }
      return matchedWord.length;
    }
  };
  
  /**
   * Helper object that tests videos.
   * @todo - allow this to be exteded more easily.
   */
  quail.videoServices = {
      
    youTube : {
      
      videoID : '',
      
      apiUrl : 'http://gdata.youtube.com/feeds/api/videos/?q=%video&caption&v=2&alt=json',
      
      isVideo : function(url) {
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
        var match = url.match(regExp);
        if (match && match[7].length === 11) {
          quail.videoServices.youTube.videoID = match[7];
          return true;
        }
        return false;
      },
      
      hasCaptions : function(callback) {
        $.ajax({url : this.apiUrl.replace('%video', this.videoID),
                async : false,
                dataType : 'json',
                success : function(data) {
                  callback((data.feed.openSearch$totalResults.$t > 0) ? true : false);
                }
        });
      }
    }
  };

}(jQuery));