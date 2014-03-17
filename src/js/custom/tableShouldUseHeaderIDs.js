quail.tableShouldUseHeaderIDs = function() {
  quail.html.find('table').each(function() {
    var $table = $(this);
    var tableFailed = false;
    if(quail.isDataTable($table)) {
      $table.find('th').each(function() {
        if(!tableFailed && !$(this).attr('id')) {
          tableFailed = true;
          quail.testFails('tableShouldUseHeaderIDs', $table);
        }
      });
      if(!tableFailed) {
        $table.find('td[header]').each(function() {
          if(!tableFailed) {
            $.each($(this).attr('header').split(' '), function(index, id) {
              if(!$table.find('#' + id).length) {
                tableFailed = true;
                quail.testFails('tableShouldUseHeaderIDs', $table);
              }
            });
          }
        });
      }
    }
  });
};