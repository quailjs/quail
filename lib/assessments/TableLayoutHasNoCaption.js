'use strict';

var IsDataTableComponent = require('IsDataTableComponent');
var Case = require('Case');
var TableLayoutHasNoCaption = function TableLayoutHasNoCaption(test) {
  test.get('$scope').find('table').each(function () {
    if ($(this).find('caption').length) {
      if (!IsDataTableComponent($(this))) {
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
    } else {
      test.add(Case({
        element: this,
        status: 'inapplicable'
      }));
    }
  });
};
module.exports = TableLayoutHasNoCaption;