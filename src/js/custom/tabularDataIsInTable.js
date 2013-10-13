quail.tabularDataIsInTable = function() {
  quail.html.find('pre').each(function() {
    if($(this).html().search('\t') >= 0) {
      quail.testFails('tabularDataIsInTable', $(this));
    }
  });
};
