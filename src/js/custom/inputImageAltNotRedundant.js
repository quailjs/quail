quail.inputImageAltNotRedundant = function() {
  quail.html.find('input[type=image][alt]').each(function() {
    if(quail.strings.redundant.inputImage.indexOf(quail.cleanString($(this).attr('alt'))) > -1) {
      quail.testFails('inputImageAltNotRedundant', $(this));
    }
  });
};
