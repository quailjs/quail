quail.tableHeaderLabelMustBeTerse = function() {
  quail.html.find('th, table tr:first td').each(function() {
    if($(this).text().length > 20 &&
       (!$(this).attr('abbr') || $(this).attr('abbr').length > 20)) {
      quail.testFails('tableHeaderLabelMustBeTerse', $(this));
    }
  });
};
