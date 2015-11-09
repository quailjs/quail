'use strict';

var Case = require('Case');
var TableLayoutMakesSenseLinearized = function TableLayoutMakesSenseLinearized(quail, test) {
  test.get('$scope').find('table').each(function () {
    if (!quail.isDataTable($(this))) {
      test.add(Case({
        element: this,
        status: 'failed'
      }));
    }
  });
};
module.exports = TableLayoutMakesSenseLinearized;