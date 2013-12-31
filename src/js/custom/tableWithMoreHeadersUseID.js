quail.tableWithMoreHeadersUseID = function() {
  quail.html.find('table:has(th)').each(function() {
    var $table = $(this);
    var rows = 0;
    $table.find('tr').each(function() {
      if($(this).find('th').length) {
        rows++;
      }
      if(rows > 1 && !$(this).find('th[id]').length) {
        quail.testFails('tableWithMoreHeadersUseID', $table);
      }
    });
  });
};
