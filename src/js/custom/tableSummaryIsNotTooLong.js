quail.tableSummaryIsNotTooLong = function() {
  quail.html.find('table[summary]').each(function() {
    if($(this).attr('summary').trim().length > 100) {
      quail.testFails('tableSummaryIsNotTooLong', $(this));
    }
  });
};
