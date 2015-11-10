'use strict';

var Case = require('Case');
var IsUnreadable = require('IsUnreadable');
var TableLayoutHasNoSummary = function TableLayoutHasNoSummary(quail, test) {
  test.get('$scope').each(function () {
    var $local = $(this);
    $local.find('table[summary]').each(function () {
      var _case = test.add(Case({
        element: this
      }));
      if (!quail.isDataTable($(this)) && !IsUnreadable($(this).attr('summary'))) {
        _case.set({ status: 'failed' });
      } else {
        _case.set({ status: 'passed' });
      }
    });
  });
};
module.exports = TableLayoutHasNoSummary;