'use strict';

var CleanStringComponent = require('CleanStringComponent');
var Case = require('Case');
var TableSummaryDoesNotDuplicateCaption = function TableSummaryDoesNotDuplicateCaption(quail, test) {
  test.get('$scope').find('table[summary]:has(caption)').each(function () {
    if (CleanStringComponent($(this).attr('summary')) === CleanStringComponent($(this).find('caption:first').text())) {
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