quail.tableSummaryDoesNotDuplicateCaption = function() {
  quail.html.find('table[summary]:has(caption)').each(function() {
    if(quail.cleanString($(this).attr('summary')) === quail.cleanString($(this).find('caption:first').text())) {
      quail.testFails('tableSummaryDoesNotDuplicateCaption', $(this));
    }
  });
};
