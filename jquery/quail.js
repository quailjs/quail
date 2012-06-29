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
        if(quail.accessibilityTests[testName].type == 'label') {
          quail.labelTest(testName, quail.accessibilityTests[testName]);
        }
        if(quail.accessibilityTests[testName].type == 'header') {
          quail.headerOrderTest(testName, quail.accessibilityTests[testName]);
        }
        if(quail.accessibilityTests[testName].type == 'event') {
          quail.scriptEventTest(testName, quail.accessibilityTests[testName]);
        }
        if(quail.accessibilityTests[testName].type == 'labelProximity') {
          quail.labelProximityTest(testName, quail.accessibilityTests[testName]);
        }
        if(quail.accessibilityTests[testName].type == 'color') {
          quail.colorTest(testName, quail.accessibilityTests[testName]);
        }
      });
    },

    isUnreadable : function(text) {
      if(typeof text != 'string') {
        return true;
      }
      return (text.trim().length) ? false : true;
    },

    isDataTable : function(table) {
      return (table.find('th').length && table.find('tr').length > 2) ? true : false;
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

    loadHasEventListener : function() {
      $.ajax({url : quail.options.jsonPath + '/../jquery/jquery.hasEventListener/jQuery.hasEventListener-2.0.3.min.js',
              async : false,
              dataType : 'script'
            });
    },
    options : { },


    placeholderTest : function(testName, options) {
      quail.loadString('placeholders');
      quail.html.find(options.selector).each(function() {
        if(typeof options.attribute !== 'undefined') {
          console.log(typeof $(this).attr(options.attribute));
          console.log( $(this).attr(options.attribute));
          if(typeof $(this).attr(options.attribute) === 'undefined'
             || (options.attribute == 'tabindex' 
                  && !$(this).attr(options.attribute)
                )
             ) {
            quail.accessibilityResults[testName].push($(this));
            return;
          }
          var text = $(this).attr(options.attribute);
        }
        else {
          var text = $(this).text();
        }
        if(typeof text == 'string') {
          var regex = /^([0-9]*)(k|kb|mb|k bytes|k byte)$/g;
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
          if(options.empty && typeof text != 'number') {
            quail.accessibilityResults[testName].push($(this));
          }
        }
      });
    },

    labelProximityTest : function(testName, options) {
        quail.html.find(options.selector).each(function() {
          var $label = quail.html.find('label[for=' + $(this).attr('id') + ']').first();
          if(!$label.length) {
            quail.accessibilityResults[testName].push($(this));
          }
          console.log($label.parent());
          if(!$(this).parent().is($label.parent())) {
            quail.accessibilityResults[testName].push($(this));
          }
        });
    },
    
    colorTest : function(testName, options) {
      if(options.bodyForegroundAttribute && options.bodyBackgroundAttribute) {
        var $body = quail.html.find('body');
        var foreground = $body.attr(options.bodyForegroundAttribute);
        var background = $body.attr(options.bodyBackgroundAttribute);
        if(typeof foreground == 'undefined') {
          foreground = 'rgb(0,0,0)';
        }
        if(typeof background == 'undefined') {
          foreground =  'rgb(255,255,255)';
        }
        if(!$body.css('color')) {
          $body.css('color', foreground);
        }
        if(!$body.css('background-color')) {
          $body.css('background-color', background);
        }
      }
      quail.html.find(options.selector).each(function() {
        if(options.algorithm == 'wai') {
        
        }
        if(options.algorithm == 'wcag' && !quail.colors.passesWCAG($(this))) {
           quail.accessibilityResults[testName].push($(this));
        }
      });
    },

    scriptEventTest : function(testName, options) {
      if(typeof jQuery.hasEventListener == 'undefined') {
        quail.loadHasEventListener();
      }
      quail.html.find(options.selector).each(function() {
        if($(this).attr(options.searchEvent)) {
          if(typeof options.correspondingEvent == 'undefined' ||
             !$(this).attr(options.correspondingEvent)) {
            quail.accessibilityResults[testName].push($(this));
          }
        }
        else {
          if($.hasEventListener($(this), options.searchEvent) && 
             (typeof options.correspondingEvent == 'undefined' ||
             !$.hasEventListener($(this), options.correspondingEvent))) {
            quail.accessibilityResults[testName].push($(this));
          }
        }
      });
    },

    labelTest : function(testName, options) {
      quail.html.find(options.selector).each(function() {
        if(!$(this).parent('label').length &&
          !quail.html.find('label[for=' + $(this).attr('id') + ']').length) {
            quail.accessibilityResults[testName].push($(this));
        }
      });
    },

    headerOrderTest : function(testName, options) {
      var current = parseInt(options.selector.substr(-1, 1));
      var nextHeading = false;
      quail.html.find('h1, h2, h3, h4, h5, h6').each(function() {
        var number = parseInt($(this).get(0).tagName.substr(-1, 1));
        if(nextHeading && (number - 1 > current || number + 1 < current)) {
          quail.accessibilityResults[testName].push($(this));
        }
        if(number == current) {
          nextHeading = $(this);
        }
        if(nextHeading && number != current) {
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
        if(words.length > 1 && $(this).text().toUpperCase() != $(this).text()) {
          $.each(words, function(index, word) {
            word = word.replace(/[^a-zA-Zs]/, '');
            if(word.toUpperCase() == word &&
               word.length > 1 &&
               typeof predefined[word.toUpperCase()] == 'undefined') {
              if(typeof alreadyReported[word.toUpperCase()] == 'undefined') {
                quail.accessibilityResults[testName].push($el);
              }
              alreadyReported[word.toUpperCase()] = word;
            }
          });
        }
      });
    },

    aLinksAreSeperatedByPrintableCharacters : function() {
      quail.html.find('a').each(function() {
        if($(this).next('a').length && quail.isUnreadable($(this).get(0).nextSibling.wholeText)) {
          quail.accessibilityResults.aLinksAreSeperatedByPrintableCharacters.push($(this));
        }
      });
    },

    blockquoteUseForQuotations : function() {
      quail.html.find('p').each(function() {
        if($(this).text().substr(0, 1).search(/[\'\"]/) > -1 &&
           $(this).text().substr(-1, 1).search(/[\'\"]/) > -1) {
          quail.accessibilityResults.blockquoteUseForQuotations.push($(this));
        }
      });
    },

    documentAcronymsHaveElement : function() {
      quail.acronymTest('documentAcronymsHaveElement', 'acronym');
    },

    documentAbbrIsUsed : function() {
      quail.acronymTest('documentAbbrIsUsed', 'abbr');
    },

    doctypeProvided : function() {
      if(!document.doctype) {
        quail.accessibilityResults.doctypeProvided.push(quail.html.find('html'));
      }
    },

    appletContainsTextEquivalent : function() {
      quail.html.find('applet[alt=], applet:not(applet[alt])').each(function() {
        if(quail.isUnreadable($(this).text())) {
          quail.accessibilityResults.appletContainsTextEquivalent.push($(this));
        }
      });
    },

    embedHasAssociatedNoEmbed : function() {
      if(quail.html.find('noembed').length) {
        return;
      }
      quail.html.find('embed').each(function() {
        quail.accessibilityResults.embedHasAssociatedNoEmbed.push($(this));
      });
    },
    
    emoticonsMissingAbbr : function() {
      var emoticons = quail.loadString('emoticons');
      console.log(emoticons);
      quail.html.find('p, div, h1, h2, h3, h4, h5, h6').each(function() {
        var $element = $(this);
        var $clone = $element.clone();
        $clone.find('abbr, acronym').each(function() {
          $(this).remove();
        });
        $.each($clone.text().split(' '), function(index, word) {
          if(emoticons.indexOf(word) > -1) {
            quail.accessibilityResults.emoticonsMissingAbbr.push($element);
          }
        });
      });
    },
    
    formWithRequiredLabel : function() {
       var redundant = quail.loadString('redundant');
       var labels = [];
       var lastStyle = currentStyle = false;
       quail.html.find('label').each(function() {
         var text = $(this).text().toLowerCase();
         var $label = $(this);
         $.each(redundant, function(index, word) {
           if(text.search(word) >= 0 && !quail.html.find('#' + $(this).attr('for')).attr('aria-required')) {
             quail.accessibilityResults.formWithRequiredLabel.push($label);
           }
         });
         currentStyle = $label.css('color') + $label.css('font-weight') + $label.css('background-color');
         if(lastStyle && currentStyle != lastStyle) {
           quail.accessibilityResults.formWithRequiredLabel.push($label);
         }
         lastStyle = currentStyle;
       });
    },
    
    headersUseToMarkSections : function() {
      quail.html.find('p').each(function() {
        var set = false;
        var $paragraph = $(this);
        $paragraph.find('strong:first, em:first, i:first, b:first').each(function() {
          if($paragraph.text() == $(this).text()) {
            quail.accessibilityResults.headersUseToMarkSections.push($paragraph);
          }
        });
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

    imgWithMathShouldHaveMathEquivalent : function() {
      quail.html.find('img:not(img:has(math), img:has(tagName))').each(function() {
        if(!$(this).parent.find('math').length) {
          quail.accessibilityResults.imgWithMathShouldHaveMathEquivalent.push($(this));
        }
      });
    },
    
    inputCheckboxRequiresFieldset : function() {
      quail.html.find(':checkbox').each(function() {
        if(!$(this).parents('fieldset').length) {
          quail.accessibilityResults.inputCheckboxRequiresFieldset.push($(this));
        }
      });
    },

    inputImageAltIsNotFileName : function() {
      quail.html.find('input[type=image][alt]').each(function() {
        if($(this).attr('src') == $(this).attr('alt')) {
          quail.accessibilityResults.inputImageAltIsNotFileName.push($(this));
        }
      });
    },

    inputImageAltIsShort : function() {
      quail.html.find('input[type=image]').each(function() {
        if($(this).attr('alt').length > 100) {
          quail.accessibilityResults.inputImageAltIsShort.push($(this));
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
    },

    imgGifNoFlicker : function() {
      quail.html.find('img[src$=".gif"]').each(function() {
        quail.accessibilityResults.imgGifNoFlicker.push($(this));
      });
    },
    
    imgWithMathShouldHaveMathEquivalent : function() {
      quail.html.find('img:not(img:has(math), img:has(tagName))').each(function() {
        if(!$(this).parent().find('math').length) {
          quail.accessibilityResults.imgWithMathShouldHaveMathEquivalent.push($(this));
        }
      });
    },
    
    listNotUsedForFormatting : function() {
      quail.html.find('ol, ul').each(function() {
        if($(this).find('li').length < 2) {
          quail.accessibilityResults.listNotUsedForFormatting.push($(this));
        }
      });
    },

    tabIndexFollowsLogicalOrder : function() {
      var index = 0;
      quail.html.find('[tabindex]').each(function() {
        if(parseInt($(this).attr('tabindex')) >= 0
           && parseInt($(this).attr('tabindex')) != index + 1) {
             quail.accessibilityResults.tabIndexFollowsLogicalOrder.push($(this));
           }
        index++;
      });
    },
    
    tableLayoutHasNoSummary : function() {
      quail.html.find('table[summary]').each(function() {
        if(!quail.isDataTable($(this)) && !quail.isUnreadable($(this).attr('summary'))) {
          quail.accessibilityResults.tableLayoutHasNoSummary.push($(this));
        }
      })
    },

    tableLayoutHasNoCaption : function() {
      quail.html.find('table:has(caption)').each(function() {
        if(!quail.isDataTable($(this))) {
          quail.accessibilityResults.tableLayoutHasNoCaption.push($(this));
        }
      });
    },

    tableHeaderLabelMustBeTerse : function() {
      quail.html.find('th, table tr:first td').each(function() {
        if($(this).text().length > 20 &&
           (!$(this).attr('abbr') || $(this).attr('abbr').length > 20)) {
          quail.accessibilityResults.tableHeaderLabelMustBeTerse.push($(this));
        }
      });
    },

    tableLayoutMakesSenseLinearized : function() {
      quail.html.find('table').each(function() {
        if(!quail.isDataTable($(this))) {
          quail.accessibilityResults.tableLayoutMakesSenseLinearized.push($(this));
        }
      });
    },
    
    tableLayoutDataShouldNotHaveTh : function() {
      quail.html.find('table:has(th)').each(function() {
        if(!quail.isDataTable($(this))) {
          quail.accessibilityResults.tableLayoutDataShouldNotHaveTh.push($(this));
        }
      });
    },

    tableUsesAbbreviationForHeader : function() {
      quail.html.find('th:not(th[abbr])').each(function() {
        if($(this).text().length > 20) {
          quail.accessibilityResults.tableUsesAbbreviationForHeader.push($(this));
        }
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
            quail.accessibilityResults.tableWithMoreHeadersUseID.push($table);
          }
        });
      });
    },
    
    preShouldNotBeUsedForTabularLayout : function() {
      quail.html.find('pre').each(function() {
        var rows = $(this).text().split(/[\n\r]+/);
        if(rows.length > 1 && $(this).text().search(/\t/) > -1) {
          quail.accessibilityResults.preShouldNotBeUsedForTabularLayout.push($(this));
        }
      });
    },

    suspectPHeaderTags : ['strong', 'b', 'em', 'i', 'u', 'font'],

    suspectPCSSStyles : ['color', 'font-weight', 'font-size', 'font-family'],
    
    tabularDataIsInTable : function() {
      quail.html.find('pre').each(function() {
        if($(this).html().search('\t') >= 0) {
          quail.accessibilityResults.tabularDataIsInTable.push($(this));
        }
      });
    },
    
    pNotUsedAsHeader : function() {
      var priorStyle = { };

      quail.html.find('p').each(function() {
        if(!$(this).text().search('.')) {
          var $paragraph = $(this);
          if(typeof $(this).find(':first-child').get(0) != 'undefined'
            && typeof quail.suspectPHeaderTags.indexOf($(this).find(':first-child').get(0).tagName) != 'undefined'
            && $(this).text() == $(this).find(':first-child').text()) {
              quail.accessibilityResults.pNotUsedAsHeader.push($(this));
          }
          $.each(quail.suspectPCSSStyles, function(index, style) {
            if(typeof priorStyle[style] != 'undefined' &&
               priorStyle[style] != $paragraph.css(style)) {
              quail.accessibilityResults.pNotUsedAsHeader.push($paragraph);
            }
            priorStyle[style] = $paragraph.css(style);
          });
          if($paragraph.css('font-weight') == 'bold') {
            quail.accessibilityResults.pNotUsedAsHeader.push($paragraph);
          }
        }
      });
    },

    documentTitleIsShort : function() {
      if(quail.html.find('head title:first').text().length > 150) {
        quail.accessibilityResults.documentTitleIsShort.push(quail.html.find('head title:first'));
      }
    }
  };

quail.colors = {
  
  getLuminosity : function(foreground, background) {
		foreground = quail.colors.cleanup(foreground);
		background = quail.colors.cleanup(background);
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

		if (foreground.r + foreground.g + foreground.b <= background.r + background.g + background.b) {
  		var l2 = (.2126 * R + 0.7152 * G + 0.0722 * B);
  		var l1 = (.2126 * R2 + 0.7152 * G2 + 0.0722 * B2);
		} else {
  		var l1 = (.2126 * R + 0.7152 * G + 0.0722 * B);
  		var l2 = (.2126 * R2 + 0.7152 * G2 + 0.0722 * B2);
		}

		return Math.round((l1 + 0.05)/(l2 + 0.05),2);
  },
  
  passesWCAG : function(element) {
    return (quail.colors.getLuminosity(quail.colors.getColor(element, 'foreground'), quail.colors.getColor(element, 'background')) > 5);
  },
  
  getColor : function(element, type) {
    if(type == 'foreground') {
      return (element.css('color')) ? element.css('color') : 'rgb(255,255,255)';
    }
    return (element.css('background-color')) ? element.css('background-color') : 'rgb(0,0,0)';
  },
  
  cleanup : function(color) {
    color = color.replace('rgb(', '').replace('rgba(', '').replace(')', '').split(',');
    return { r : color[0],
             g : color[1],
             b : color[2],
             a : ((typeof color[3] == 'undefined') ? false : color[3])
           };
  }
  
};

})(jQuery);