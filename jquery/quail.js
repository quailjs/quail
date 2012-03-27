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
        $.ajax({ url : quail.options.jsonPath,
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
          quail.html.find(quail.accessibilityTests[testName].selector).each(function() {
            quail.accessibilityResults[testName].push($(this));
          });
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
    
    accessibilityResults : { },
    
    accessibilityTests : { },
    
    loadTests : function() {
    
    },
    
    options : { },
  };
  
})(jQuery);