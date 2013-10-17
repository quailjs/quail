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