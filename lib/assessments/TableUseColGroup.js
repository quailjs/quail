'use strict';

var IsDataTableComponent = require('IsDataTableComponent');
var Case = require('Case');
var TableUseColGroup = function TableUseColGroup(test) {
  test.get('$scope').find('table').each(function () {
    if (IsDataTableComponent($(this)) && !$(this).find('colgroup').length) {
      test.add(Case({
        element: this,
        status: 'failed'
      }));
    }
  });
};
module.exports = TableUseColGroup;