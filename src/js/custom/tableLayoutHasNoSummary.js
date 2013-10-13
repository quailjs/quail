quail.tableLayoutHasNoSummary = function() {
  quail.html.find('table[summary]').each(function() {
    if(!quail.isDataTable($(this)) && !quail.isUnreadable($(this).attr('summary'))) {
      quail.testFails('tableLayoutHasNoSummary', $(this));
    }
  });
};
