'use strict';

var IsDataTableComponent = require('IsDataTableComponent');
var Case = require('Case');
var TableLayoutMakesSenseLinearized = function TableLayoutMakesSenseLinearized(quail, test) {
  test.get('$scope').find('table').each(function () {
    if (!IsDataTableComponent($(this))) {
      test.add(Case({
        element: this,
        status: 'failed'
      }));
    }
  });
};
module.exports = TableLayoutMakesSenseLinearized;