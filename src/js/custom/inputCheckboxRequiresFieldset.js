quail.inputCheckboxRequiresFieldset = function() {
  quail.html.find(':checkbox').each(function() {
    if(!$(this).parents('fieldset').length) {
      quail.testFails('inputCheckboxRequiresFieldset', $(this));
    }
  });
};
