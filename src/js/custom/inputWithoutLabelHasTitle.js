quail.inputWithoutLabelHasTitle = function() {
  quail.html.find('input, select, textarea').each(function() {
    if (!$(this).parent('label').length &&
      !quail.html.find('label[for=' + $(this).attr('id') + ']').length &&
      (!$(this).attr('title') || quail.isUnreadable($(this).attr('title')))) {
      quail.testFails('inputWithoutLabelHasTitle', $(this));
    }
  });
};