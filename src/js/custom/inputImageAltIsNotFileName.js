quail.inputImageAltIsNotFileName = function() {
  quail.html.find('input[type=image][alt]').each(function() {
    if($(this).attr('src') === $(this).attr('alt')) {
      quail.testFails('inputImageAltIsNotFileName', $(this));
    }
  });
};
