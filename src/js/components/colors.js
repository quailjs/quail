/**
 * Test callback for color tests. This handles both WAI and WCAG
 * color contrast/luminosity.
 */
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