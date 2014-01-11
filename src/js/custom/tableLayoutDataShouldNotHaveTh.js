quail.tableLayoutDataShouldNotHaveTh = function() {
  quail.html.find('table:has(th)').each(function() {
    if(!quail.isDataTable($(this))) {
      quail.testFails('tableLayoutDataShouldNotHaveTh', $(this));
    }
  });
};
