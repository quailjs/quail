quail.inputImageAltIsShort = function() {
  quail.html.find('input[type=image]').each(function() {
    if($(this).attr('alt').length > 100) {
      quail.testFails('inputImageAltIsShort', $(this));
    }
  });
};
