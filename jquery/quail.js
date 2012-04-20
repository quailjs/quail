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
      if(typeof quail.options.accessibilityTests != 'undefined') {
  		  quail.accessibilityTests = quail.options.accessibilityTests;
  		}
      else {
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
          quail.html.find(quail.accessibilityTests[testName].selector).each(function() {
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

    isUnreadable : function(text) {
      if(typeof text != 'string') {
        return true;
      }
      return (text.trim().length) ? false : true;
    },

    getRawResults : function(testName) {
      if(testName) {
        return quail.accessibilityResults[testName];
      }
      return quail.accessibilityResults;
    },

    html : { },

    strings : { },

    accessibilityResults : { },

    accessibilityTests : { },

    loadTests : function() {

    },

    validURL : function(url) {
      return (url.search(' ') == -1) ? true : false;
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


    placeholderTest : function(testName, options) {
      quail.loadString('placeholders');
      quail.html.find(options.selector).each(function() {
        if(typeof options.attribute !== 'undefined') {
          var text = $(this).attr(options.attribute);
        }
        else {
          var text = $(this).text();
        }
        if(typeof text == 'string') {
          var regex = /^([0-9]*)(k|kb|mb|k bytes|k byte)?$/g;
          var regexResults = regex.exec(text.toLowerCase());
          if(regexResults && regexResults[0].length) {
            quail.accessibilityResults[testName].push($(this));
          }
          else {
            if(options.empty && quail.isUnreadable(text)) {
              quail.accessibilityResults[testName].push($(this));
            }
            else {
              for(i in quail.strings.placeholders) {
                if(quail.strings.placeholders[i] == text) {
                  quail.accessibilityResults[testName].push($(this));
                }
              }
            }
          }
        }
        else {
          if(options.empty) {
            quail.accessibilityResults[testName].push($(this));
          }
        }
      });
    },

    doctypeProvided : function() {
      console.log(document.doctype);
    },

    appletContainsTextEquivalent : function() {
      quail.html.find('applet[alt=], applet:not(applet[alt])').each(function() {
        if(quail.isUnreadable($(this).text())) {
          quail.accessibilityResults.appletContainsTextEquivalent.push($(this));
        }
      });
    },

    imgAltIsDifferent : function() {
      quail.html.find('img[alt][src]').each(function() {
        if($(this).attr('src') == $(this).attr('alt')) {
          quail.accessibilityResults.imgAltIsDifferent.push($(this));
        }
      });
    },

    imgAltIsTooLong : function() {
      quail.html.find('img[alt]').each(function() {
        if($(this).attr('alt').length > 100) {
          quail.accessibilityResults.imgAltIsTooLong.push($(this));
        }
      });
    },

    imgImportantNoSpacerAlt : function() {
      quail.html.find('img[alt]').each(function() {
        var width = ($(this).width()) ? $(this).width() : parseInt($(this).attr('width'));
        var height = ($(this).height()) ? $(this).height() : parseInt($(this).attr('height'));
        if(quail.isUnreadable($(this).attr('alt').trim()) &&
           width > 50 &&
           height > 50) {
            quail.accessibilityResults.imgImportantNoSpacerAlt.push($(this));
        }
      });
    },

    imgAltNotEmptyInAnchor : function() {
      quail.html.find('a img').each(function() {
        if(quail.isUnreadable($(this).attr('alt')) &&
           quail.isUnreadable($(this).parent('a:first').text())) {
              quail.accessibilityResults.imgAltNotEmptyInAnchor.push($(this));
        }
      });
    },

    imgHasLongDesc : function() {
      quail.html.find('img[longdesc]').each(function() {
        if($(this).attr('longdesc') == $(this).attr('alt') ||
           !quail.validURL($(this).attr('longdesc'))) {
            quail.accessibilityResults.imgHasLongDesc.push($(this));
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
            if(typeof links[$(this).attr('href')] == 'undefined') {
              quail.accessibilityResults.imgMapAreasHaveDuplicateLink.push($image);
            }
          });
        }
      });
    }
  };

})(jQuery);