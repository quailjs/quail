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
		if (!$(this).length) {
			return this;
		}
		quail.options = options;
		quail.run();
		return;
  };
  
  var quail = {
    
    run : function() {
      if(!quail.accessibilityTests.length) {
        console.log(quail.options.jsonPath);
        $.getJSON(quail.options.jsonPath, function(data) {
          if(typeof data == 'object') {
            quail.accessibilityTests = data;
          }
          quail.runTests();
        });
      }
    },
    
    runTests : function() {
    
    },
    
    accessibilityResults : [ ],
    
    accessibilityTests : { },
    
    loadTests : function() {
    
    },
    
    options : { },
  };
  
})(jQuery);