'use strict';

var Case = require('Case');
var TableUseColGroup = function TableUseColGroup(quail, test) {
  test.get('$scope').find('table').each(function () {
    if (quail.isDataTable($(this)) && !$(this).find('colgroup').length) {
      test.add(Case({
        element: this,
        status: 'failed'
      }));
    }
  });
};
module.exports = TableUseColGroup;