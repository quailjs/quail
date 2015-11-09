'use strict';

var Case = require('Case');
var TableSummaryDoesNotDuplicateCaption = function TableSummaryDoesNotDuplicateCaption(quail, test) {
  test.get('$scope').find('table[summary]:has(caption)').each(function () {
    if (quail.cleanString($(this).attr('summary')) === quail.cleanString($(this).find('caption:first').text())) {
      test.add(Case({
        element: this,
        status: 'failed'
      }));
    } else {
      test.add(Case({
        element: this,
        status: 'passed'
      }));
    }
  });
};
module.exports = TableSummaryDoesNotDuplicateCaption;