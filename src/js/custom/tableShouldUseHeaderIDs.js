quail.tableShouldUseHeaderIDs = function(quail, test, Case) {
  test.get('$scope').find('table').each(function() {
    var $table = $(this);
    var tableFailed = false;
    if (quail.isDataTable($table)) {
      $table.find('th').each(function() {
        if (!tableFailed && !$(this).attr('id')) {
          tableFailed = true;
          test.add(Case({
            element: this,
            expected: (function (element) {
              return quail.components.resolveExpectation(element);
            }(this)),
            status: 'failed'
          }));
        }
      });
      if (!tableFailed) {
        $table.find('td[header]').each(function() {
          if (!tableFailed) {
            $.each($(this).attr('header').split(' '), function(index, id) {
              if (!$table.find('#' + id).length) {
                tableFailed = true;
                test.add(Case({
                  element: this,
                  expected: (function (element) {
                    return quail.components.resolveExpectation(element);
                  }(this)),
                  status: 'failed'
                }));
              }
            });
          }
        });
      }
    }
  });
};
