quail.inputImageAltNotRedundant = function() {
  var redundant = quail.loadString('redundant');
  quail.html.find('input[type=image][alt]').each(function() {
    if(redundant.inputImage.indexOf(quail.cleanString($(this).attr('alt'))) > -1) {
      quail.testFails('inputImageAltNotRedundant', $(this));
    }
  });
};
