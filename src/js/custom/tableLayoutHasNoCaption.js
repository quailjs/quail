quail.tableLayoutHasNoCaption = function() {
  quail.html.find('table:has(caption)').each(function() {
    if(!quail.isDataTable($(this))) {
      quail.testFails('tableLayoutHasNoCaption', $(this));
    }
  });
};
