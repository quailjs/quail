quail.tableUseColGroup = function() {
  quail.html.find('table').each(function() {
    if(quail.isDataTable($(this)) && !$(this).find('colgroup').length) {
      quail.testFails('tableUseColGroup', $(this));
    }
  });
};
