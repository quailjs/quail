/**
 * Test callback for color tests. This handles both WAI and WCAG
 * color contrast/luminosity.
 */
quail.components.color = function(testName, options) {

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
    fetchImageColor : function() {
      var img = new Image();
      img.src = $(this).css('background-image').replace('url(', '').replace(/'/, '').replace(')', '');
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
      if (typeof level === 'undefined') {
        level = 5;
      }
      return (colors.getLuminosity(colors.getColor(element, 'foreground'), colors.getColor(element, 'background')) > level);
    },

    /**
     * Returns whether an element's color passes
     * WAI brightness levels.
     */
    passesWAI : function(element) {
      var foreground = colors.cleanup(colors.getColor(element, 'foreground'));
      var background = colors.cleanup(colors.getColor(element, 'background'));
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
      color = color.replace('rgb(', '').replace('rgba(', '').replace(')', '').split(',');
      return { r : color[0],
               g : color[1],
               b : color[2],
               a : ((typeof color[3] === 'undefined') ? false : color[3])
             };
    }

  };

  quail.html.find(options.options.selector).find(quail.textSelector).each(function() {
    if (!quail.isUnreadable($(this).text()) &&
        (options.options.algorithm === 'wcag' && !colors.passesWCAG($(this))) ||
        (options.options.algorithm === 'wai' && !colors.passesWAI($(this)))) {
      quail.testFails(testName, $(this));
    }
  });
};