'use strict';

quail.tableUseColGroup = function (quail, test, Case) {
  test.get('$scope').find('table').each(function () {
    if (quail.isDataTable($(this)) && !$(this).find('colgroup').length) {
      test.add(Case({
        element: this,
        status: 'failed'
      }));
    }
  });
};