'use strict';

var TableSummaryIsNotTooLong = function TableSummaryIsNotTooLong(quail, test, Case) {
  test.get('$scope').find('table[summary]').each(function () {
    if ($(this).attr('summary').trim().length > 100) {
      test.add(Case({
        element: this,
        status: 'failed'
      }));
    }
  });
};
module.exports = TableSummaryIsNotTooLong;