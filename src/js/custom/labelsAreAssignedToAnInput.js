quail.labelsAreAssignedToAnInput = function() {
  quail.html.find('label').each(function() {
    if(!$(this).attr('for')) {
      quail.testFails('labelsAreAssignedToAnInput', $(this));
    }
    else {
      if(!quail.html.find('#' + $(this).attr('for')).length ||
         !quail.html.find('#' + $(this).attr('for')).is('input, select, textarea')) {
        quail.testFails('labelsAreAssignedToAnInput', $(this));
      }
    }
  });
};
