quail.tableNotUsedForLayout = function() {
  quail.html.find('table').each(function() {
    if(!quail.isDataTable($(this))) {
      quail.testFails('tableNotUsedForLayout', $(this));
    }
  });
};
