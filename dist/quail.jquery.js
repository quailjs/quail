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

quail.components.acronym = function(testName, acronymTag) {
  var predefined = { };
  var alreadyReported = { };
  quail.html.find('acronym[title], abbr[title]').each(function() {
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
};
quail.components.color = function(testName, options) {
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
quail.components.convertToPx = function(unit) {
	var $test = $('<div style="display: none; font-size: 1em; margin: 0; padding:0; height: ' + unit + '; line-height: 1; border:0;">&nbsp;</div>').appendTo(quail.html);
	var height = $test.height();
	$test.remove();
	return height;
};

quail.components.event = function(testName, options) {
  var $items = (typeof options.selector === 'undefined') ?
                quail.html.find('*') :
                quail.html.find(options.selector);
  $items.each(function() {
    if(quail.components.hasEventListener($(this), options.searchEvent.replace('on', '')) &&
         (typeof options.correspondingEvent === 'undefined' ||
         !quail.components.hasEventListener($(this), options.correspondingEvent.replace('on', '')))) {
      quail.testFails(testName, $(this));
    }
  });
};
quail.components.hasEventListener = function(element, event) {
	if(typeof $(element).attr('on' + event) !== 'undefined') {
		return true;
	}
	return typeof $(element).get(0)[event] !== 'undefined';
};
quail.components.header = function(testName, options) {
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
};
quail.components.label = function(testName, options) {
  quail.html.find(options.selector).each(function() {
    if((!$(this).parent('label').length ||
        !quail.containsReadableText($(this).parent('label'))) &&
      (!quail.html.find('label[for=' + $(this).attr('id') + ']').length ||
       !quail.containsReadableText(quail.html.find('label[for=' + $(this).attr('id') + ']')))) {
        quail.testFails(testName, $(this));
    }
  });
};
quail.components.labelProximity = function(testName, options) {
  quail.html.find(options.selector).each(function() {
    var $label = quail.html.find('label[for=' + $(this).attr('id') + ']').first();
    if(!$label.length) {
      quail.testFails(testName, $(this));
    }
    if(!$(this).parent().is($label.parent())) {
      quail.testFails(testName, $(this));
    }
  });
};
quail.components.placeholder = function(testName, options) {
  quail.html.find(options.selector).each(function() {
    var text;
    if(typeof options.attribute !== 'undefined') {
      if(typeof $(this).attr(options.attribute) === 'undefined' ||
            (options.attribute === 'tabindex' &&
              $(this).attr(options.attribute) <= 0
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
};
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

quail.components.textStatistics = {

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
    return this.wordCount(text) / this.sentenceCount(text);
  },
  
  averageSyllablesPerWord : function(text) {
    var that = this;
    var count = 0;
    var wordCount = that.wordCount(text);
    if(!wordCount) {
      return 0;
    }
    $.each(text.split(' '), function(index, word) {
      count += that.syllableCount(word);
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
quail.components.video = {
    
  youTube : {
    
    videoID : '',
    
    apiUrl : 'http://gdata.youtube.com/feeds/api/videos/?q=%video&caption&v=2&alt=json',
    
    isVideo : function(url) {
      var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
      var match = url.match(regExp);
      if (match && match[7].length === 11) {
        this.videoID = match[7];
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
quail.strings.colors = {
    "aliceblue": "f0f8ff",
    "antiquewhite": "faebd7",
    "aqua": "00ffff",
    "aquamarine": "7fffd4",
    "azure": "f0ffff",
    "beige": "f5f5dc",
    "bisque": "ffe4c4",
    "black": "000000",
    "blanchedalmond": "ffebcd",
    "blue": "0000ff",
    "blueviolet": "8a2be2",
    "brown": "a52a2a",
    "burlywood": "deb887",
    "cadetblue": "5f9ea0",
    "chartreuse": "7fff00",
    "chocolate": "d2691e",
    "coral": "ff7f50",
    "cornflowerblue": "6495ed",
    "cornsilk": "fff8dc",
    "crimson": "dc143c",
    "cyan": "00ffff",
    "darkblue": "00008b",
    "darkcyan": "008b8b",
    "darkgoldenrod": "b8860b",
    "darkgray": "a9a9a9",
    "darkgreen": "006400",
    "darkkhaki": "bdb76b",
    "darkmagenta": "8b008b",
    "darkolivegreen": "556b2f",
    "darkorange": "ff8c00",
    "darkorchid": "9932cc",
    "darkred": "8b0000",
    "darksalmon": "e9967a",
    "darkseagreen": "8fbc8f",
    "darkslateblue": "483d8b",
    "darkslategray": "2f4f4f",
    "darkturquoise": "00ced1",
    "darkviolet": "9400d3",
    "deeppink": "ff1493",
    "deepskyblue": "00bfff",
    "dimgray": "696969",
    "dodgerblue": "1e90ff",
    "firebrick": "b22222",
    "floralwhite": "fffaf0",
    "forestgreen": "228b22",
    "fuchsia": "ff00ff",
    "gainsboro": "dcdcdc",
    "ghostwhite": "f8f8ff",
    "gold": "ffd700",
    "goldenrod": "daa520",
    "gray": "808080",
    "green": "008000",
    "greenyellow": "adff2f",
    "honeydew": "f0fff0",
    "hotpink": "ff69b4",
    "indianred": "cd5c5c",
    "indigo": "4b0082",
    "ivory": "fffff0",
    "khaki": "f0e68c",
    "lavender": "e6e6fa",
    "lavenderblush": "fff0f5",
    "lawngreen": "7cfc00",
    "lemonchiffon": "fffacd",
    "lightblue": "add8e6",
    "lightcoral": "f08080",
    "lightcyan": "e0ffff",
    "lightgoldenrodyellow": "fafad2",
    "lightgrey": "d3d3d3",
    "lightgreen": "90ee90",
    "lightpink": "ffb6c1",
    "lightsalmon": "ffa07a",
    "lightseagreen": "20b2aa",
    "lightskyblue": "87cefa",
    "lightslategray": "778899",
    "lightsteelblue": "b0c4de",
    "lightyellow": "ffffe0",
    "lime": "00ff00",
    "limegreen": "32cd32",
    "linen": "faf0e6",
    "magenta": "ff00ff",
    "maroon": "800000",
    "mediumaquamarine": "66cdaa",
    "mediumblue": "0000cd",
    "mediumorchid": "ba55d3",
    "mediumpurple": "9370d8",
    "mediumseagreen": "3cb371",
    "mediumslateblue": "7b68ee",
    "mediumspringgreen": "00fa9a",
    "mediumturquoise": "48d1cc",
    "mediumvioletred": "c71585",
    "midnightblue": "191970",
    "mintcream": "f5fffa",
    "mistyrose": "ffe4e1",
    "moccasin": "ffe4b5",
    "navajowhite": "ffdead",
    "navy": "000080",
    "oldlace": "fdf5e6",
    "olive": "808000",
    "olivedrab": "6b8e23",
    "orange": "ffa500",
    "orangered": "ff4500",
    "orchid": "da70d6",
    "palegoldenrod": "eee8aa",
    "palegreen": "98fb98",
    "paleturquoise": "afeeee",
    "palevioletred": "d87093",
    "papayawhip": "ffefd5",
    "peachpuff": "ffdab9",
    "peru": "cd853f",
    "pink": "ffc0cb",
    "plum": "dda0dd",
    "powderblue": "b0e0e6",
    "purple": "800080",
    "red": "ff0000",
    "rosybrown": "bc8f8f",
    "royalblue": "4169e1",
    "saddlebrown": "8b4513",
    "salmon": "fa8072",
    "sandybrown": "f4a460",
    "seagreen": "2e8b57",
    "seashell": "fff5ee",
    "sienna": "a0522d",
    "silver": "c0c0c0",
    "skyblue": "87ceeb",
    "slateblue": "6a5acd",
    "slategray": "708090",
    "snow": "fffafa",
    "springgreen": "00ff7f",
    "steelblue": "4682b4",
    "tan": "d2b48c",
    "teal": "008080",
    "thistle": "d8bfd8",
    "tomato": "ff6347",
    "turquoise": "40e0d0",
    "violet": "ee82ee",
    "wheat": "f5deb3",
    "white": "ffffff",
    "whitesmoke": "f5f5f5",
    "yellow": "ffff00",
    "yellowgreen": "9acd32"
};
quail.strings.emoticons = [
  ":)",
  ";)",
  ":-)",
  ":^)",
  "=)",
  "B)",
  "8)",
  "c8",
  "cB",
  "=]",
  ":]",
  "x]",
  ":-)",
  ":)",
  ":o)",
  "=]",
  ":-D",
  ":D",
  "=D",
  ":-(",
  ":(",
  "=(",
  ":/",
  ":P",
  ":o"
];

quail.strings.languageCodes = [
  "bh",
  "bi",
  "nb",
  "bs",
  "br",
  "bg",
  "my",
  "es",
  "ca",
  "km",
  "ch",
  "ce",
  "ny",
  "ny",
  "zh",
  "za",
  "cu",
  "cu",
  "cv",
  "kw",
  "co",
  "cr",
  "hr",
  "cs",
  "da",
  "dv",
  "dv",
  "nl",
  "dz",
  "en",
  "eo",
  "et",
  "ee",
  "fo",
  "fj",
  "fi",
  "nl",
  "fr",
  "ff",
  "gd",
  "gl",
  "lg",
  "ka",
  "de",
  "ki",
  "el",
  "kl",
  "gn",
  "gu",
  "ht",
  "ht",
  "ha",
  "he",
  "hz",
  "hi",
  "ho",
  "hu",
  "is",
  "io",
  "ig",
  "id",
  "ia",
  "ie",
  "iu",
  "ik",
  "ga",
  "it",
  "ja",
  "jv",
  "kl",
  "kn",
  "kr",
  "ks",
  "kk",
  "ki",
  "rw",
  "ky",
  "kv",
  "kg",
  "ko",
  "kj",
  "ku",
  "kj",
  "ky",
  "lo",
  "la",
  "lv",
  "lb",
  "li",
  "li",
  "li",
  "ln",
  "lt",
  "lu",
  "lb",
  "mk",
  "mg",
  "ms",
  "ml",
  "dv",
  "mt",
  "gv",
  "mi",
  "mr",
  "mh",
  "ro",
  "ro",
  "mn",
  "na",
  "nv",
  "nv",
  "nd",
  "nr",
  "ng",
  "ne",
  "nd",
  "se",
  "no",
  "nb",
  "nn",
  "ii",
  "ny",
  "nn",
  "ie",
  "oc",
  "oj",
  "cu",
  "cu",
  "cu",
  "or",
  "om",
  "os",
  "os",
  "pi",
  "pa",
  "ps",
  "fa",
  "pl",
  "pt",
  "pa",
  "ps",
  "qu",
  "ro",
  "rm",
  "rn",
  "ru",
  "sm",
  "sg",
  "sa",
  "sc",
  "gd",
  "sr",
  "sn",
  "ii",
  "sd",
  "si",
  "si",
  "sk",
  "sl",
  "so",
  "st",
  "nr",
  "es",
  "su",
  "sw",
  "ss",
  "sv",
  "tl",
  "ty",
  "tg",
  "ta",
  "tt",
  "te",
  "th",
  "bo",
  "ti",
  "to",
  "ts",
  "tn",
  "tr",
  "tk",
  "tw",
  "ug",
  "uk",
  "ur",
  "ug",
  "uz",
  "ca",
  "ve",
  "vi",
  "vo",
  "wa",
  "cy",
  "fy",
  "wo",
  "xh",
  "yi",
  "yo",
  "za",
  "zu"
];
quail.strings.placeholders = [
"title",
"untitled",
"untitled document",
"this is the title",
"the title",
"content",
" ",
"new page",
"new",
"nbsp",
"&nbsp;",
"spacer",
"image",
"img",
"photo",
"frame",
"frame title",
"iframe",
"iframe title",
"legend"
];
quail.strings.redundant = {
  "inputImage":[
    "submit",
    "button"
  ],
  "link":[
    "link to",
    "link",
    "go to",
    "click here",
    "link",
    "click",
    "more"
  ],
  "required":[
    "*"
  ]
};
quail.strings.siteMap = [
  "site map",
  "map",
  "sitemap"
];
quail.strings.suspiciousLinks = [
"click here",
"click",
"more",
"here",
"read more",
"download",
"add",
"delete",
"clone",
"order",
"view",
"read",
"clic aqu&iacute;",
"clic",
"haga clic",
"m&aacute;s",
"aqu&iacute;",
"image"
];
quail.strings.symbols = [
  "|",
  "*",
  /\*/g,
  "<br>*",
  '&bull;',
  '&#8226'
];

quail.aAdjacentWithSameResourceShouldBeCombined = function() {
  quail.html.find('a').each(function() {
    if($(this).next('a').attr('href') === $(this).attr('href')) {
      quail.testFails('aAdjacentWithSameResourceShouldBeCombined', $(this));
    }
  });
};

quail.aImgAltNotRepetative = function() {
  quail.html.find('a img[alt]').each(function() {
    if(quail.cleanString($(this).attr('alt')) === quail.cleanString($(this).parent('a').text())) {
      quail.testFails('aImgAltNotRepetative', $(this).parent('a'));
    }
  });
};

quail.aLinkTextDoesNotBeginWithRedundantWord = function() {
  quail.html.find('a').each(function() {
    var $link = $(this);
    var text = '';
    if($(this).find('img[alt]').length) {
      text = text + $(this).find('img[alt]:first').attr('alt');
    }
    text = text + $(this).text();
    text = text.toLowerCase();
    $.each(quail.strings.redundant.link, function(index, phrase) {
      if(text.search(phrase) > -1) {
        quail.testFails('aLinkTextDoesNotBeginWithRedundantWord', $link);
      }
    });
  });
};

quail.aLinksAreSeperatedByPrintableCharacters = function() {
  quail.html.find('a').each(function() {
    if($(this).next('a').length && quail.isUnreadable($(this).get(0).nextSibling.wholeText)) {
      quail.testFails('aLinksAreSeperatedByPrintableCharacters', $(this));
    }
  });
};

quail.aLinksNotSeparatedBySymbols = function() {
  quail.html.find('a').each(function() {
    if($(this).next('a').length &&
			quail.strings.symbols.indexOf($(this).get(0).nextSibling.wholeText.toLowerCase().trim()) !== -1 ) {
      quail.testFails('aLinksNotSeparatedBySymbols', $(this));
    }
  });
};

quail.aMustContainText = function() {
  quail.html.find('a').each(function() {
    if(!quail.containsReadableText($(this), true) && 
       !(($(this).attr('name') || $(this).attr('id')) && !$(this).attr('href'))) {
      quail.testFails('aMustContainText', $(this));
    }
  });
};

quail.aSuspiciousLinkText = function() {
  quail.html.find('a').each(function() {
    var text = $(this).text();
    $(this).find('img[alt]').each(function() {
      text = text + $(this).attr('alt');
    });
    if(quail.strings.suspiciousLinks.indexOf(quail.cleanString(text)) > -1) {
      quail.testFails('aSuspiciousLinkText', $(this));
    }
  });
};

quail.appletContainsTextEquivalent = function() {
  quail.html.find('applet[alt=], applet:not(applet[alt])').each(function() {
    if(quail.isUnreadable($(this).text())) {
      quail.testFails('appletContainsTextEquivalent', $(this));
    }
  });
};

quail.blockquoteUseForQuotations = function() {
  quail.html.find('p').each(function() {
    if($(this).text().substr(0, 1).search(/[\'\"]/) > -1 &&
       $(this).text().substr(-1, 1).search(/[\'\"]/) > -1) {
      quail.testFails('blockquoteUseForQuotations', $(this));
    }
  });
};

quail.doctypeProvided = function() {
  if($(quail.html.get(0).doctype).length === 0) {
    quail.testFails('doctypeProvided', quail.html.find('html'));
  }
};

quail.documentAbbrIsUsed = function() {
  quail.components.acronym('documentAbbrIsUsed', 'abbr');
};

quail.documentAcronymsHaveElement = function() {
  quail.components.acronym('documentAcronymsHaveElement', 'acronym');
};

quail.documentIDsMustBeUnique = function() {
  var ids = [];
  quail.html.find('*[id]').each(function() {
    if(ids.indexOf($(this).attr('id')) >= 0) {
      quail.testFails('documentIDsMustBeUnique', $(this));
    }
    ids.push($(this).attr('id'));
  });
};

quail.documentIsWrittenClearly = function() {
  quail.html.find(quail.textSelector).each(function() {
    var text = quail.components.textStatistics.cleanText($(this).text());
    if(Math.round((206.835 - (1.015 * quail.components.textStatistics.averageWordsPerSentence(text)) - (84.6 * quail.components.textStatistics.averageSyllablesPerWord(text)))) < 60) {
      quail.testFails('documentIsWrittenClearly', $(this));
    }
  });
};

quail.documentLangIsISO639Standard = function() {
  var language = quail.html.find('html').attr('lang');
  if(!language) {
    return;
  }
  if(quail.strings.languageCodes.indexOf(language) === -1) {
      quail.testFails('documentLangIsISO639Standard', quail.html.find('html'));
  }
};

quail.documentStrictDocType = function() {
  if(!$(quail.html.get(0).doctype).length ||
     quail.html.get(0).doctype.systemId.indexOf('strict') === -1) {
    quail.testFails('documentStrictDocType', quail.html.find('html'));
  }
};

quail.documentTitleIsShort = function() {
  if(quail.html.find('head title:first').text().length > 150) {
    quail.testFails('documentTitleIsShort', quail.html.find('head title:first'));
  }
};

quail.documentValidatesToDocType = function() {
  if(typeof document.doctype === 'undefined') {
    return;
  }
};

quail.documentVisualListsAreMarkedUp = function() {
  quail.html.find('p, div, h1, h2, h3, h4, h5, h6').each(function() {
    var $element = $(this);
    $.each(quail.strings.symbols, function(index, item) {
      if($element.text().split(item).length > 2) {
        quail.testFails('documentVisualListsAreMarkedUp', $element);
      }
    });
  });
};

quail.embedHasAssociatedNoEmbed = function() {
  if(quail.html.find('noembed').length) {
    return;
  }
  quail.html.find('embed').each(function() {
    quail.testFails('embedHasAssociatedNoEmbed', $(this));
  });
};

quail.emoticonsExcessiveUse = function() {
  var count = 0;
  quail.html.find('p, div, h1, h2, h3, h4, h5, h6').each(function() {
    var $element = $(this);
    $.each($element.text().split(' '), function(index, word) {
      if(quail.strings.emoticons.indexOf(word) > -1) {
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
};

quail.emoticonsMissingAbbr = function() {
  quail.html.find('p, div, h1, h2, h3, h4, h5, h6').each(function() {
    var $element = $(this);
    var $clone = $element.clone();
    $clone.find('abbr, acronym').each(function() {
      $(this).remove();
    });
    $.each($clone.text().split(' '), function(index, word) {
      if(quail.strings.emoticons.indexOf(word) > -1) {
        quail.testFails('emoticonsMissingAbbr', $element);
      }
    });
  });
};

quail.formWithRequiredLabel = function() {
   var redundant = quail.strings.redundant;
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
};

quail.headersUseToMarkSections = function() {
  quail.html.find('p').each(function() {
    var $paragraph = $(this);
    $paragraph.find('strong:first, em:first, i:first, b:first').each(function() {
      if($paragraph.text() === $(this).text()) {
        quail.testFails('headersUseToMarkSections', $paragraph);
      }
    });
  });
};

quail.imgAltIsDifferent = function() {
  quail.html.find('img[alt][src]').each(function() {
    if($(this).attr('src') === $(this).attr('alt') || $(this).attr('src').split('/').pop() === $(this).attr('alt')) {
      quail.testFails('imgAltIsDifferent', $(this));
    }
  });
};

quail.imgAltIsTooLong = function() {
  quail.html.find('img[alt]').each(function() {
    if($(this).attr('alt').length > 100) {
      quail.testFails('imgAltIsTooLong', $(this));
    }
  });
};

quail.imgAltNotEmptyInAnchor = function() {
  quail.html.find('a img').each(function() {
    if(quail.isUnreadable($(this).attr('alt')) &&
       quail.isUnreadable($(this).parent('a:first').text())) {
          quail.testFails('imgAltNotEmptyInAnchor', $(this));
    }
  });
};

quail.imgAltTextNotRedundant = function() {
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
};

quail.imgGifNoFlicker = function() {
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
};

quail.imgHasLongDesc = function() {
  quail.html.find('img[longdesc]').each(function() {
    if($(this).attr('longdesc') === $(this).attr('alt') ||
       !quail.validURL($(this).attr('longdesc'))) {
        quail.testFails('imgHasLongDesc', $(this));
    }
  });
};

quail.imgImportantNoSpacerAlt = function() {
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
};

quail.imgMapAreasHaveDuplicateLink = function() {
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
};

quail.imgNonDecorativeHasAlt = function() {
  quail.html.find('img[alt]').each(function() {
    if(quail.isUnreadable($(this).attr('alt')) &&
       ($(this).width() > 100 || $(this).height() > 100)) {
         quail.testFails('imgNonDecorativeHasAlt', $(this));
       }
  });
};

quail.imgWithMathShouldHaveMathEquivalent = function() {
  quail.html.find('img:not(img:has(math), img:has(tagName))').each(function() {
    if(!$(this).parent().find('math').length) {
      quail.testFails('imgWithMathShouldHaveMathEquivalent', $(this));
    }
  });
};

quail.inputCheckboxRequiresFieldset = function() {
  quail.html.find(':checkbox').each(function() {
    if(!$(this).parents('fieldset').length) {
      quail.testFails('inputCheckboxRequiresFieldset', $(this));
    }
  });
};

quail.inputImageAltIsNotFileName = function() {
  quail.html.find('input[type=image][alt]').each(function() {
    if($(this).attr('src') === $(this).attr('alt')) {
      quail.testFails('inputImageAltIsNotFileName', $(this));
    }
  });
};

quail.inputImageAltIsShort = function() {
  quail.html.find('input[type=image]').each(function() {
    if($(this).attr('alt').length > 100) {
      quail.testFails('inputImageAltIsShort', $(this));
    }
  });
};

quail.inputImageAltNotRedundant = function() {
  quail.html.find('input[type=image][alt]').each(function() {
    if(quail.strings.redundant.inputImage.indexOf(quail.cleanString($(this).attr('alt'))) > -1) {
      quail.testFails('inputImageAltNotRedundant', $(this));
    }
  });
};

quail.labelMustBeUnique = function() {
  var labels = { };
  quail.html.find('label[for]').each(function() {
    if(typeof labels[$(this).attr('for')] !== 'undefined') {
      quail.testFails('labelMustBeUnique', $(this));
    }
    labels[$(this).attr('for')] = $(this).attr('for');
  });
};

quail.labelsAreAssignedToAnInput = function() {
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
};

quail.listNotUsedForFormatting = function() {
  quail.html.find('ol, ul').each(function() {
    if($(this).find('li').length < 2) {
      quail.testFails('listNotUsedForFormatting', $(this));
    }
  });
};

quail.pNotUsedAsHeader = function() {
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
};

quail.paragarphIsWrittenClearly = function() {
  quail.html.find('p').each(function() {
    var text = quail.components.textStatistics.cleanText($(this).text());
    if(Math.round((206.835 - (1.015 * quail.components.textStatistics.averageWordsPerSentence(text)) - (84.6 * quail.components.textStatistics.averageSyllablesPerWord(text)))) < 60) {
      quail.testFails('paragarphIsWrittenClearly', $(this));
    }
  });
};

quail.preShouldNotBeUsedForTabularLayout = function() {
  quail.html.find('pre').each(function() {
    var rows = $(this).text().split(/[\n\r]+/);
    if(rows.length > 1 && $(this).text().search(/\t/) > -1) {
      quail.testFails('preShouldNotBeUsedForTabularLayout', $(this));
    }
  });
};

quail.selectJumpMenu = function() {
  if(quail.html.find('select').length === 0) {
    return;
  }
  
  quail.html.find('select').each(function() {
    if($(this).parent('form').find(':submit').length === 0 &&
       quail.components.hasEventListener($(this), 'change')) {
         quail.testFails('selectJumpMenu', $(this));
    }
  });
};

quail.siteMap = function() {
  var set = true;
  quail.html.find('a').each(function() {
    var text = $(this).text().toLowerCase();
    $.each(quail.strings.siteMap, function(index, string) {
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
};

quail.tabIndexFollowsLogicalOrder = function() {
  var index = 0;
  quail.html.find('[tabindex]').each(function() {
    if(parseInt($(this).attr('tabindex'), 10) >= 0 &&
       parseInt($(this).attr('tabindex'), 10) !== index + 1) {
         quail.testFails('tabIndexFollowsLogicalOrder', $(this));
       }
    index++;
  });
};

quail.tableHeaderLabelMustBeTerse = function() {
  quail.html.find('th, table tr:first td').each(function() {
    if($(this).text().length > 20 &&
       (!$(this).attr('abbr') || $(this).attr('abbr').length > 20)) {
      quail.testFails('tableHeaderLabelMustBeTerse', $(this));
    }
  });
};

quail.tableLayoutDataShouldNotHaveTh = function() {
  quail.html.find('table:has(th)').each(function() {
    if(!quail.isDataTable($(this))) {
      quail.testFails('tableLayoutDataShouldNotHaveTh', $(this));
    }
  });
};

quail.tableLayoutHasNoCaption = function() {
  quail.html.find('table:has(caption)').each(function() {
    if(!quail.isDataTable($(this))) {
      quail.testFails('tableLayoutHasNoCaption', $(this));
    }
  });
};

quail.tableLayoutHasNoSummary = function() {
  quail.html.find('table[summary]').each(function() {
    if(!quail.isDataTable($(this)) && !quail.isUnreadable($(this).attr('summary'))) {
      quail.testFails('tableLayoutHasNoSummary', $(this));
    }
  });
};

quail.tableLayoutMakesSenseLinearized = function() {
  quail.html.find('table').each(function() {
    if(!quail.isDataTable($(this))) {
      quail.testFails('tableLayoutMakesSenseLinearized', $(this));
    }
  });
};

quail.tableNotUsedForLayout = function() {
  quail.html.find('table').each(function() {
    if(!quail.isDataTable($(this))) {
      quail.testFails('tableNotUsedForLayout', $(this));
    }
  });
};

quail.tableSummaryDoesNotDuplicateCaption = function() {
  quail.html.find('table[summary]:has(caption)').each(function() {
    if(quail.cleanString($(this).attr('summary')) === quail.cleanString($(this).find('caption:first').text())) {
      quail.testFails('tableSummaryDoesNotDuplicateCaption', $(this));
    }
  });
};

quail.tableSummaryIsNotTooLong = function() {
  quail.html.find('table[summary]').each(function() {
    if($(this).attr('summary').trim().length > 100) {
      quail.testFails('tableSummaryIsNotTooLong', $(this));
    }
  });
};

quail.tableUseColGroup = function() {
  quail.html.find('table').each(function() {
    if(quail.isDataTable($(this)) && !$(this).find('colgroup').length) {
      quail.testFails('tableUseColGroup', $(this));
    }
  });
};

quail.tableUsesAbbreviationForHeader = function() {
  quail.html.find('th:not(th[abbr])').each(function() {
    if($(this).text().length > 20) {
      quail.testFails('tableUsesAbbreviationForHeader', $(this));
    }
  });
};

quail.tableUsesScopeForRow = function() {
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
};
quail.tableWithMoreHeadersUseID = function() {
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
};

quail.tabularDataIsInTable = function() {
  quail.html.find('pre').each(function() {
    if($(this).html().search('\t') >= 0) {
      quail.testFails('tabularDataIsInTable', $(this));
    }
  });
};

quail.textIsNotSmall = function() {
  quail.html.find(quail.textSelector).each(function() {
    var fontSize = $(this).css('font-size');
    if(fontSize.search('em') > 0) {
      fontSize = quail.components.convertToPx(fontSize);
    }
    fontSize = parseInt(fontSize.replace('px', ''), 10);
    if(fontSize < 10) {
      quail.testFails('textIsNotSmall', $(this));
    }
  });
};

quail.videosEmbeddedOrLinkedNeedCaptions = function() {
  quail.html.find('a').each(function() {
    var $link = $(this);
    $.each(quail.components.video, function(type, callback) {
      if(callback.isVideo($link.attr('href'))) {
        callback.hasCaptions(function(hasCaptions) {
          if(!hasCaptions) {
            quail.testFails('videosEmbeddedOrLinkedNeedCaptions', $link);
          }
        });
      }
    });
  });
};

})(jQuery);