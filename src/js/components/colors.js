/**
 * Test callback for color tests. This handles both WAI and WCAG
 * color contrast/luminosity.
 */
quail.components.color = function(quail, test, Case, options) {
  var colors = {
    /**
     * Returns the lumosity of a given foreground and background object,
     * in the format of {r: red, g: green, b: blue } in rgb color values.
     */
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
      var data = context.getImageData(0, 0, 1, 1).data;
      return 'rgb(' + data[0] + ',' + data[1] + ',' + data[2] + ')';
    },

    /**
     * Returns whether an element's color passes
     * WCAG at a certain contrast ratio.
     */
    passesWCAG : function(element, level) {
      return colors.passesWCAGColor(element, colors.getColor(element, 'foreground'), colors.getColor(element, 'background'), level);
    },

    /**
     * Returns whether an element's color passes
     * WCAG at a certain contrast ratio.
     */
    passesWCAGColor : function(element, foreground, background, level) {
      if (typeof level === 'undefined') {
        if (quail.components.convertToPx(element.css('font-size')) >= 18) {
          level = 3;
        }
        else if (quail.components.convertToPx(element.css('font-size')) >= 14 &&
          (element.css('font-weight') === 'bold' || parseInt(element.css('font-weight'), 10) >= 700)) {
          level = 3;
        }
        else {
          level = 5;
        }
      }
      return (colors.getLuminosity(foreground, background) > level);
    },

    /**
     * Returns whether an element's color passes
     * WAI brightness levels.
     */
    passesWAI : function(element) {
      var foreground = colors.cleanup(colors.getColor(element, 'foreground'));
      var background = colors.cleanup(colors.getColor(element, 'background'));
      return colors.passesWAIColor(foreground, background);
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
      var diff = { };
      diff.red = Math.abs(foreground.r - background.r);
      diff.green = Math.abs(foreground.g - background.g);
      diff.blue = Math.abs(foreground.b - background.b);
      return diff;
    },

    /**
     * Retrieves the background or foreground of an element.
     * There are some normalizations here for the way
     * different browsers can return colors, and handling transparencies.
     */
    getColor : function(element, type) {
      if (type === 'foreground') {
        return (element.css('color')) ? element.css('color') : 'rgb(255,255,255)';
      }

      if ((element.css('background-color') !== 'rgba(0, 0, 0, 0)' &&
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

    /**
     * Returns an object with rgba taken from a string.
     */
    cleanup : function(color) {
      if (typeof color === 'object') {
        return color;
      }
      color = color.replace('rgb(', '').replace('rgba(', '').replace(')', '').split(',');
      return { r : color[0],
               g : color[1],
               b : color[2],
               a : ((typeof color[3] === 'undefined') ? false : color[3])
             };
    },

    /**
     * Returns background image of an element or its parents.
     */
    getBackgroundImage: function(element) {
      while (element.length > 0) {
        if (element.css('background-image') && element.css('background-image') !== 'none') {
          return element.css('background-image').replace('url(', '').replace(/'/, '').replace(')', '');
        }
        element = element.parent();
      }
      return false;
    },

    /**
     * Calculates average color of an image.
     */
    getAverageRGB: function(img) {
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
        return defaultRGB;
      }

      height = canvas.height = img.height;
      width = canvas.width = img.width;
      context.drawImage(img, 0, 0);

      try {
        data = context.getImageData(0, 0, width, height);
      } catch(e) {
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

      return rgb;
    }
  };

  test.get('$scope').find(options.options.selector).filter(quail.textSelector).each(function() {
    var $this = $(this);
    if (!quail.isUnreadable($this.text())) {
      if ((options.options.algorithm === 'wcag' && !colors.passesWCAG($this)) ||
          (options.options.algorithm === 'wai' && !colors.passesWAI($this))) {
        test.add(Case({
          element: this,
          expected: $this.closest('.quail-test').data('expected'),
          status: 'failed'
        }));
      }
      else {
        // Check if there's a background-image.
        var backgroundImage = colors.getBackgroundImage($this);
        if (backgroundImage) {
          var img = new Image();
          img.src = backgroundImage;

          // Get average color of the background image.
          var averageColor = colors.getAverageRGB(img);
          if ((options.options.algorithm === 'wcag' && !colors.passesWCAGColor($this, colors.getColor($this, 'foreground'), averageColor)) ||
              (options.options.algorithm === 'wai' && !colors.passesWAIColor(colors.getColor($this, 'foreground'), averageColor))) {
            test.add(Case({
              element: this,
              expected: $this.closest('.quail-test').data('expected'),
              status: 'failed'
            }));
          }
          else {
            test.add(Case({
              element: this,
              expected: $this.closest('.quail-test').data('expected'),
              status: 'passed'
            }));
          }
        }
        else {
          test.add(Case({
            element: this,
            expected: $this.closest('.quail-test').data('expected'),
            status: 'passed'
          }));
        }
      }
    }
    else {
      test.add(Case({
        element: this,
        expected: $this.closest('.quail-test').data('expected'),
        status: 'passed'
      }));
    }
  });
};
