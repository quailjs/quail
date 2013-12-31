quail.tableLayoutMakesSenseLinearized = function() {
  quail.html.find('table').each(function() {
    if(!quail.isDataTable($(this))) {
      quail.testFails('tableLayoutMakesSenseLinearized', $(this));
    }
  });
};
