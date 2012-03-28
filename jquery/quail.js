/*
 * QUAIL Accessibility Information Library - jQuery Plugin
 * Powerful accessibility checking with jQuery
 *
 * Requires: jQuery v1.3+
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */

;(function($) {

  $.fn.quail = function(options) {
		if (!this.length) {
			return this;
		}
		quail.options = options;
		quail.html = this;
		quail.run();
		if(quail.options.getRawResults) {
		  return quail.getRawResults();
		}
		return this;
  };
  
  var quail = {
    
    run : function() {
      if(quail.options.reset) {
        quail.accessibilityResults = { };
      }
      if(!quail.accessibilityTests.length) {
        $.ajax({ url : quail.options.jsonPath + '/tests.json',
                 async : false,
                 dataType : 'json',
                 success : function(data) {
                    if(typeof data == 'object') {
                      quail.accessibilityTests = data;
                    }
                }});
      }
      quail.runTests();
    },
    
    runTests : function() {
      $.each(quail.options.guideline, function(index, testName) {
        if(typeof quail.accessibilityResults[testName] == 'undefined') {
          quail.accessibilityResults[testName] = [ ];
        }
        if(quail.accessibilityTests[testName].type == 'selector') {
          $(quail.html).find(quail.accessibilityTests[testName].selector).each(function() {
            quail.accessibilityResults[testName].push($(this));
          });
        }
        if(quail.accessibilityTests[testName].type == 'custom') {
          if(typeof quail[quail.accessibilityTests[testName].callback] !== 'undefined') {
            quail[quail.accessibilityTests[testName].callback]();
          }
        }
        if(quail.accessibilityTests[testName].type == 'placeholder') {
          quail.placeholderTest(testName, quail.accessibilityTests[testName]);
        }
      });
    },
    
    getRawResults : function(testName) {
      if(testName) {
        return quail.accessibilityResults[testName];
      }
      return quail.accessibilityResults; 
    },
    
    html : '',
    
    strings : { },
    
    accessibilityResults : { },
    
    accessibilityTests : { },
    
    loadTests : function() {
    
    },
    
    loadString : function(stringFile) {
      if(typeof quail.strings[stringFile] !== 'undefined') {
        return;
      }
      $.ajax({ url : quail.options.jsonPath + '/strings/' + stringFile + '.json',
               async: false,
               dataType : 'json',
               success : function(data) {
                quail.strings[stringFile] = data;
               }});
    },
    
    options : { },
    
    imgAltIsDifferent : function() {
      $(quail.html).find('img').each(function() {
        if($(this).attr('src') == $(this).attr('alt')) {
          quail.accessibilityResults.imgAltIsDifferent.push($(this));
        }
      });
    },
    
    imgAltIsTooLong : function() {
      $(quail.html).find('img[alt]').each(function() {
        if($(this).attr('alt').length > 100) {
          quail.accessibilityResults.imgAltIsTooLong.push($(this));
        }
      });
    },
    
    placeholderTest : function(testName, options) {
      quail.loadString('placeholders');
      $(quail.html).find(options.selector).each(function() {
        if(typeof options.attribute !== 'undefined') {
          var text = $(this).attr(options.attribute);
        }
        else {
          var text = $(this).text();
        }
        if(quail.strings.placeholders.search(text)) {
          quail.accessibilityResults.imgAltNotPlaceHolder.push($(this));
        }
      });
    }
  };
  
})(jQuery);