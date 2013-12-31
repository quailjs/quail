quail.labelMustBeUnique = function() {
  var labels = { };
  quail.html.find('label[for]').each(function() {
    if(typeof labels[$(this).attr('for')] !== 'undefined') {
      quail.testFails('labelMustBeUnique', $(this));
    }
    labels[$(this).attr('for')] = $(this).attr('for');
  });
};
