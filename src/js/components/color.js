/**
 * Test callback for color tests. This handles both WAI and WCAG
 * color contrast/luminosity.
 */
quail.components.color = (function () {
  var img, i, rainbow, numberOfSamples;


  function buildCase(test, Case, element, status, id, message) {
    test.add(Case({
      element: element,
      expected: (function (element, id) {
        return quail.components.resolveExpectation(element, id);
      }(element, id)),
      message: message,
      status: status
    }));
  }

  var colors = {
    cache: {},
    /**
     * Returns the lumosity of a given foreground and background object,
     * in the format of {r: red, g: green, b: blue } in rgb color values.
     */
    getLuminosity : function(foreground, background) {
      var cacheKey = 'getLuminosity_' + foreground + '_' + background;
      foreground = colors.cleanup(foreground);
      background = colors.cleanup(background);

      if (colors.cache[cacheKey] !== undefined) {
        return colors.cache[cacheKey];
      }

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

      colors.cache[cacheKey] = Math.round((Math.max(l1, l2) + 0.05)/(Math.min(l1, l2) + 0.05)*10)/10;
      return colors.cache[cacheKey];
    },

    /**
     * Returns the average color for a given image
     * using a canvas element.
     */
    fetchImageColorAtPixel : function(img, x, y) {
      x = typeof x !== 'undefined' ? x : 1;
      y = typeof y !== 'undefined' ? y : 1;
      var can = document.createElement('canvas');
      var context = can.getContext('2d');
      context.drawImage(img, 0, 0);
      var data = context.getImageData(x, y, 1, 1).data;
      return 'rgb(' + data[0] + ',' + data[1] + ',' + data[2] + ')';
    },

    testElmContrast: function (algorithm, element, level) {
      var background = colors.getColor(element, 'background');
      return colors.testElmBackground(algorithm, element, background, level);
    },

    testElmBackground: function (algorithm, element, background, level) {
      var foreground = colors.getColor(element, 'foreground');
      var res;
      if (algorithm === 'wcag') {
        res = colors.passesWCAGColor(element, foreground, background, level);
      } else if (algorithm === 'wai') {
        res = colors.passesWAIColor(foreground, background);
      }
      return res;
    },

    testColorContrast: function (algorithm, element, foreground, background, level) {
      if (algorithm === 'wcag') {
        return colors.passesWCAGColor(element, foreground, background, level);
      } else if (algorithm === 'wai') {
        return colors.passesWAIColor(foreground, background);
      }
    },

    /**
     * Returns whether an element's color passes
     * WCAG at a certain contrast ratio.
     */
    passesWCAGColor : function(element, foreground, background, level) {
      var pxfsize = quail.components.convertToPx(element.css('fontSize'));
      if (typeof level === 'undefined') {
        if (pxfsize >= 18) {
          level = 3;
        }
        else {
          var fweight = element.css('fontWeight');
          if (pxfsize >= 14 &&  (fweight === 'bold' || parseInt(fweight, 10) >= 700)) {
            level = 3;
          }
          else {
            level = 4.5;
          }
        }
      }
      return (colors.getLuminosity(foreground, background) > level);
    },

    /**
     * Returns whether an element's color passes
     * WAI brightness levels.
     */
    passesWAIColor : function(foreground, background) {
      return (colors.getWAIErtContrast(foreground, background) > 500 &&
              colors.getWAIErtBrightness(foreground, background) > 125);
    },

    /**
     * Compused contrast of a foreground and background
     * per the ERT contrast spec.
     */
    getWAIErtContrast : function(foreground, background) {
      var diffs = colors.getWAIDiffs(foreground, background);
      return diffs.red + diffs.green + diffs.blue;
    },

    /**
     * Computed contrast of a foreground and background
     * per the ERT brightness spec.
     */
    getWAIErtBrightness : function(foreground, background) {
      var diffs = colors.getWAIDiffs(foreground, background);
      return ((diffs.red * 299) + (diffs.green * 587) + (diffs.blue * 114)) / 1000;

    },

    /**
     * Returns differences between two colors.
     */
    getWAIDiffs : function(foreground, background) {
      return {
        red:   Math.abs(foreground.r - background.r),
        green: Math.abs(foreground.g - background.g),
        blue:  Math.abs(foreground.b - background.b)
      };
    },

    /**
     * Retrieves the background or foreground of an element.
     * There are some normalizations here for the way
     * different browsers can return colors, and handling transparencies.
     */
    getColor : function(element, type) {
      var self = colors;
      if (!element.attr('data-cacheId')) {
        element.attr('data-cacheId', 'id_' + Math.random());
      }
      var cacheKey = 'getColor_' + type + '_' + element.attr('data-cacheId');
      if (colors.cache[cacheKey] !== undefined) {
        return colors.cache[cacheKey];
      }

      if (type === 'foreground') {
        colors.cache[cacheKey] = (element.css('color')) ? element.css('color') : 'rgb(0,0,0)';
        return colors.cache[cacheKey];
      }

      var bcolor = element.css('background-color');
      if (colors.hasBackgroundColor(bcolor)) {
        colors.cache[cacheKey] = bcolor;
        return colors.cache[cacheKey];
      }

      element.parents().each(function(){
        var pcolor = $(this).css('background-color');
        if (colors.hasBackgroundColor(pcolor)) {
          return self.cache[cacheKey] = pcolor;
        }
      });
      // Assume the background is white.
      colors.cache[cacheKey] = 'rgb(255,255,255)';
      return colors.cache[cacheKey];
    },

    getForeground: function(element) {
      return colors.getColor(element, 'foreground');
    },

    /**
     * Returns an object with rgba taken from a string.
     */
    cleanup : function(color) {
      if (typeof color === 'object') {
        return color;
      }

      if (color.substr(0, 1) === '#') {
        return { r : parseInt(color.substr(1, 2), 16),
                 g : parseInt(color.substr(3, 2), 16),
                 b : parseInt(color.substr(5, 2), 16),
                 a : false
               };
      }

      if (color.substr(0, 3) === 'rgb') {
        color = color.replace('rgb(', '').replace('rgba(', '').replace(')', '').split(',');
        return { r : color[0],
                 g : color[1],
                 b : color[2],
                 a : ((typeof color[3] === 'undefined') ? false : color[3])
               };
      }
    },

    /**
     * Returns background image of an element or its parents.
     */
    getBackgroundImage: function(element) {
      if (!element.attr('data-cacheId')) {
        element.attr('data-cacheId', 'id_' + Math.random());
      }

      var cacheKey = 'getBackgroundImage_' + element.attr('data-cacheId');
      if (colors.cache[cacheKey] !== undefined) {
        return colors.cache[cacheKey];
      }
      element = element[0];
      while(element && element.nodeType === 1 && element.nodeName !== 'BODY' && element.nodeName !== 'HTML') {
        var bimage = $(element).css('background-image');
        if (bimage && bimage !== 'none' && bimage.search(/^(.*?)url(.*?)$/i) !== -1) {
          colors.cache[cacheKey] = bimage.replace('url(', '').replace(/['"]/g, '').replace(')', '');
          return colors.cache[cacheKey];
        }
        element = element.parentNode;
      }
      colors.cache[cacheKey] = false;
      return false;
    },

    /**
     * Returns background image of an element or its parents.
     */
    getBackgroundGradient: function(element) {
      if (!element.attr('data-cacheId')) {
        element.attr('data-cacheId', 'id_' + Math.random());
      }

      var cacheKey = 'getBackgroundGradient_' + element.attr('data-cacheId');
      if (colors.cache[cacheKey] !== undefined) {
        return colors.cache[cacheKey];
      }

      var notEmpty = function(s) {
        return $.trim(s) !== '';
      };
      element = element[0];
      while(element && element.nodeType === 1 && element.nodeName !== 'BODY' && element.nodeName !== 'HTML') {
        // Exit if element has a background color.
        if (colors.hasBackgroundColor($(element).css('background-color'))) {
          colors.cache[cacheKey] = false;
          return false;
        }
        var bimage = $(element).css('backgroundImage');
        if (bimage && bimage !== 'none' && bimage.search(/^(.*?)gradient(.*?)$/i) !== -1) {
          var gradient = bimage.match(/gradient(\(.*\))/g);
          if (gradient.length > 0) {
            gradient = gradient[0].replace(/(linear|radial|from|\bto\b|gradient|top|left|bottom|right|\d*%)/g, '');
            colors.cache[cacheKey] = $.grep(gradient.match(/(rgb\([^\)]+\)|#[a-z\d]*|[a-z]*)/g), notEmpty);
            return colors.cache[cacheKey];
          }
        }
        element = element.parentNode;
      }
      colors.cache[cacheKey] = false;
      return false;
    },

    /**
     * Calculates average color of an image.
     */
    getAverageRGB: function(img) {
      var cacheKey = img.src;
      if (colors.cache[cacheKey] !== undefined) {
        return colors.cache[cacheKey];
      }

      var blockSize = 5, // only visit every 5 pixels
        defaultRGB = {r:0,g:0,b:0}, // for non-supporting envs
        canvas = document.createElement('canvas'),
        context = canvas.getContext && canvas.getContext('2d'),
        data, width, height,
        i = -4,
        length,
        rgb = {r:0, g:0, b:0, a:0},
        count = 0;

      if (!context) {
        colors.cache[cacheKey] = defaultRGB;
        return defaultRGB;
      }

      height = canvas.height = img.height;
      width = canvas.width = img.width;
      context.drawImage(img, 0, 0);

      try {
        data = context.getImageData(0, 0, width, height);
      } catch(e) {
        colors.cache[cacheKey] = defaultRGB;
        return defaultRGB;
      }

      length = data.data.length;

      while ((i += blockSize * 4) < length) {
        ++count;
        rgb.r += data.data[i];
        rgb.g += data.data[i+1];
        rgb.b += data.data[i+2];
      }

      // ~~ used to floor values
      rgb.r = ~~(rgb.r/count);
      rgb.g = ~~(rgb.g/count);
      rgb.b = ~~(rgb.b/count);

      colors.cache[cacheKey] = rgb;
      return rgb;
    },

    /**
     * Convert color to hex value.
     */
    colorToHex: function(c) {
      var m = /rgba?\((\d+), (\d+), (\d+)/.exec(c);
      return m ? '#' + (1 << 24 | m[1] << 16 | m[2] << 8 | m[3]).toString(16).substr(1) : c;
    },

    /**
     * Check if element has a background color.
     */
    hasBackgroundColor: function(bcolor) {
      return bcolor !== 'rgba(0, 0, 0, 0)' && bcolor !== 'transparent';
    },

    /**
     * Traverse visual tree for background property.
     */
    traverseVisualTreeForBackground: function(element, property) {
      if (!element.attr('data-cacheId')) {
        element.attr('data-cacheId', 'id_' + Math.random());
      }

      var cacheKey = 'traverseVisualTreeForBackground_' + element.attr('data-cacheId') + '_' + property;
      if (colors.cache[cacheKey] !== undefined) {
        return colors.cache[cacheKey];
      }

      var notempty = function(s) {
        return $.trim(s) !== '';
      };

      var foundIt;
      var scannedElements = [];

      // Scroll to make sure element is visible.
      element[0].scrollIntoView();

      // Get relative x and y.
      var x = element.offset().left - $(window).scrollLeft();
      var y = element.offset().top - $(window).scrollTop();

      // Hide current element.
      scannedElements.push({
        element: element,
        visibility: element.css('visibility')
      });
      element.css('visibility', 'hidden');

      // Get element at position x, y. This only selects visible elements.
      var el = document.elementFromPoint(x,y);
      while (foundIt === undefined && el && el.tagName !== 'BODY' && el.tagName !== 'HTML') {
        el = $(el);
        var bcolor = el.css('backgroundColor');
        var bimage;
        // Only check visible elements.
        switch (property) {
        case 'background-color':
          if (colors.hasBackgroundColor(bcolor)) {
            foundIt = bcolor;
          }
          break;
        case 'background-gradient':
          // Bail out if the element has a background color.
          if (colors.hasBackgroundColor(bcolor)) {
            foundIt = false;
            continue;
          }

          bimage = el.css('backgroundImage');
          if (bimage && bimage !== 'none' && bimage.search(/^(.*?)gradient(.*?)$/i) !== -1) {
            var gradient = bimage.match(/gradient(\(.*\))/g);
            if (gradient.length > 0) {
              gradient = gradient[0].replace(/(linear|radial|from|\bto\b|gradient|top|left|bottom|right|\d*%)/g, '');
              foundIt = $.grep(gradient.match(/(rgb\([^\)]+\)|#[a-z\d]*|[a-z]*)/g), notempty);
            }
          }
          break;
        case 'background-image':
          // Bail out if the element has a background color.
          if (colors.hasBackgroundColor(bcolor)) {
            foundIt = false;
            continue;
          }
          bimage = el.css('backgroundImage');
          if (bimage && bimage !== 'none' && bimage.search(/^(.*?)url(.*?)$/i) !== -1) {
            foundIt = bimage.replace('url(', '').replace(/['"]/g, '').replace(')', '');
          }
          break;
        }
        scannedElements.push({
          element: el,
          visibility: el.css('visibility')
        });
        el.css('visibility', 'hidden');
        el = document.elementFromPoint(x,y);
      }

      // Reset visibility.
      for(var i = 0; i < scannedElements.length; i++){
        scannedElements[i].element.css('visibility', scannedElements[i].visibility);
      }

      colors.cache[cacheKey] = foundIt;
      return foundIt;
    },

    /**
     * Get first element behind current with a background color.
     */
    getBehindElementBackgroundColor: function(element) {
      return colors.traverseVisualTreeForBackground(element, 'background-color');
    },

    /**
     * Get first element behind current with a background gradient.
     */
    getBehindElementBackgroundGradient: function(element) {
      return colors.traverseVisualTreeForBackground(element, 'background-gradient');
    },

    /**
     * Get first element behind current with a background image.
     */
    getBehindElementBackgroundImage: function(element) {
      return colors.traverseVisualTreeForBackground(element, 'background-image');
    }
  };

  var tests = {
    /**
     *
     */
    colorFontContrast: function (options, test, Case, element, id, $this) {
      // Check text and background color using DOM.
      // Build a case.

      if (!colors.testElmContrast(options.algorithm, $this)) {
        buildCase(test, Case, element, 'failed', id, 'The font contrast of the text impairs readability');
      }
      else {
        buildCase(test, Case, element, 'passed', id, 'The font contrast of the text is sufficient for readability');
      }
    },

    /**
     *
     */
    colorElementBehindContrast: function (id, test, Case, options, $this, element) {
      // Check text and background using element behind current element.
      var backgroundColorBehind;
      // The option element is problematic.
      if (!$this.is('option')) {
        backgroundColorBehind = colors.getBehindElementBackgroundColor($this);
      }
      if (!backgroundColorBehind) {
        return;
      }

      var testResult = colors.testElmBackground(options.algorithm, $this,
            backgroundColorBehind);

      // Build a case.
      if (!testResult) {
        buildCase(test, Case, element, 'failed', id, 'The element behind this element makes the text unreadable');
      }
      else {
        buildCase(test, Case, element, 'passed', id, 'The element behind this element does not affect readability');
      }

    },

    /**
     *
     */
    colorBackgroundImageContrast: function (id, test, Case, options, $this, element) {
      // Check if there's a backgroundImage using DOM.
      var backgroundImage = colors.getBackgroundImage($this);
      if (!backgroundImage) {
        return;
      }

      img = document.createElement('img');
      img.crossOrigin = "Anonymous";

      // Get average color of the background image. The image must first load
      // before information about it is available to the DOM.
      img.onload = function () {
        var averageColorBackgroundImage = colors.getAverageRGB(img);
        var testResult = colors.testElmBackground(options.algorithm, $this,
              averageColorBackgroundImage);

        // Build a case.
        if (!testResult) {
          buildCase(test, Case, element, 'failed', id, 'The element\'s background image makes the text unreadable');

        } else {
          buildCase(test, Case, element, 'passed', id, 'The element\'s background image does not affect readability');
        }
      };

      img.onerror = img.onabort = function () {
        buildCase(test, Case, element, 'cantTell', id, 'The element\'s background image could not be loaded (' + backgroundImage + ')');
      };

      // Load the image.
      img.src = backgroundImage;
    },

    /**
     *
     */
    colorElementBehindBackgroundImageContrast: function (id, test, Case, options, $this, element) {
      // Check if there's a backgroundImage using element behind current element.
      var behindBackgroundImage;

      // The option element is problematic.
      if (!$this.is('option')) {
        behindBackgroundImage = colors.getBehindElementBackgroundImage($this);
      }

      if (!behindBackgroundImage) {
        return;
      }

      img = document.createElement('img');
      img.crossOrigin = "Anonymous";
      // The image must first load before information about it is available to
      // the DOM.
      img.onload = function () {

        // Get average color of the background image.
        var averageColorBehindBackgroundImage = colors.getAverageRGB(img);
        var testResult = colors.testElmBackground(options.algorithm, $this,
              averageColorBehindBackgroundImage);
        if (!testResult) {
          buildCase(test, Case, element, 'failed', id, 'The background image of the element behind this element makes the text unreadable');

        } else {
          buildCase(test, Case, element, 'passed', id, 'The background image of the element behind this element does not affect readability');
        }
      };
      img.onerror = img.onabort = function () {
        buildCase(test, Case, element, 'cantTell', id, 'The background image of the element behind this element could not be loaded (' + behindBackgroundImage + ')');
      };
      // Load the image.
      img.src = behindBackgroundImage;

    },

    /**
     *
     */
    colorBackgroundGradientContrast: function (id, test, Case, options, $this, element) {
      // Check if there's a background gradient using DOM.
      var failureFound;
      var backgroundGradientColors = colors.getBackgroundGradient($this);

      if (!backgroundGradientColors) {
        return;
      }

      // Convert colors to hex notation.
      for (i = 0; i < backgroundGradientColors.length; i++) {
        if (backgroundGradientColors[i].substr(0, 3) === 'rgb') {
          backgroundGradientColors[i] = colors.colorToHex(backgroundGradientColors[i]);
        }
      }

      // Create a rainbow.
      /* global Rainbow */
      rainbow = new Rainbow();
      rainbow.setSpectrumByArray(backgroundGradientColors);
      // @todo, make the number of samples configurable.
      numberOfSamples = backgroundGradientColors.length * options.gradientSampleMultiplier;

      // Check each color.
      failureFound = false;
      for (i = 0; !failureFound && i < numberOfSamples; i++) {
        var testResult = colors.testElmBackground(options.algorithm, $this,
              '#' + rainbow.colourAt(i));

        if (!testResult) {
          buildCase(test, Case, element, 'failed', id, 'The background gradient makes the text unreadable');
          failureFound = true;
        }
      }

      // If no failure was found, the element passes for this case type.
      if (!failureFound) {
        buildCase(test, Case, element, 'passed', id, 'The background gradient does not affect readability');
      }
    },

    /**
     *
     */
    colorElementBehindBackgroundGradientContrast: function (id, test, Case, options, $this, element) {
      // Check if there's a background gradient using element behind current element.
      var behindGradientColors;
      var failureFound;
      // The option element is problematic.
      if (!$this.is('option')) {
        behindGradientColors = colors.getBehindElementBackgroundGradient($this);
      }

      if (!behindGradientColors) {
        return;
      }

      // Convert colors to hex notation.
      for (i = 0; i < behindGradientColors.length; i++) {
        if (behindGradientColors[i].substr(0, 3) === 'rgb') {
          behindGradientColors[i] = colors.colorToHex(behindGradientColors[i]);
        }
      }

      // Create a rainbow.
      /* global Rainbow */
      rainbow = new Rainbow();
      rainbow.setSpectrumByArray(behindGradientColors);
      numberOfSamples = behindGradientColors.length * options.gradientSampleMultiplier;

      // Check each color.
      failureFound = false;
      for (i = 0; !failureFound && i < numberOfSamples; i++) {
        failureFound = !colors.testElmBackground(options.algorithm, $this,
              '#' + rainbow.colourAt(i));
      }

      // If no failure was found, the element passes for this case type.
      if (failureFound) {
        buildCase(test, Case, element, 'failed', id, 'The background gradient of the element behind this element makes the text unreadable');
      } else {
        buildCase(test, Case, element, 'passed', id, 'The background gradient of the element behind this element does not affect readability');
      }
    }
  };

  /**
   *
   */
  function testCandidates(id, textNode, test, Case, options) {
    // We want a tag, not just the text node.
    var element = textNode.parentNode;
    var $this = $(element);

    // The nodeType of the element must be 1. Nodes of type 1 implement the Element
    // interface which is required of the first argument passed to window.getComputedStyle.
    // Failure to pass an Element <node> to window.getComputedStyle will raised an exception
    // if Firefox.
    if (element.nodeType !== 1) {
      return;
    }
    // Ignore elements whose content isn't displayed to the page.
    if (['script', 'style', 'title', 'object', 'applet', 'embed', 'template', 'noscript']
    .indexOf(element.nodeName.toLowerCase()) !== -1)  {
      return;
    }

    // Bail out if the text is not readable.
    if (quail.isUnreadable($this.text())) {
      buildCase(test, Case, element, 'cantTell', '', 'The text cannot be processed');
      return;
    }

    // Switch on the type of color test to run.
    if (tests[id]) {
      try {
        tests[id](id, test, Case, options, $this, element);
      } catch (e) {
        console.log(e);
      }
    }
  }


    /**
   * For the color test, if any case passes for a given element, then all the
   * cases for that element pass.
   */
  function postInvoke(test) {
    var passed = {};
    var groupsBySelector = test.groupCasesBySelector();

    /**
     * Determine the length of an object.
     *
     * @param object obj
     *   The object whose size will be determined.
     *
     * @return number
     *   The size of the object determined by the number of keys.
     */
    function size (obj) {
      return Object.keys(obj).length;
    }

    // Go through each selector group.
    var nub = '';
    for (var selector in groupsBySelector) {
      if (groupsBySelector.hasOwnProperty(selector)) {
        var cases = groupsBySelector[selector];
        cases.each(function (index, _case) {
          if (_case.get('status') === passed) {
            // This can just be an empty string. We only need the passed hash
            // to contain keys, not values.
            passed[selector] = nub;
          }
        });
      }
    }

    return size(passed) === size(groupsBySelector);
  }

  return {
    colors: colors,
    testCandidates: testCandidates,
    postInvoke: postInvoke,
    buildCase: buildCase
  };

}());
