'use strict';

var Case = require('Case');
var IsUnreadable = require('IsUnreadable');
var InputWithoutLabelHasTitle = function InputWithoutLabelHasTitle(quail, test) {

  test.get('$scope').each(function () {

    var testableElements = $(this).find('input, select, textarea');

    if (testableElements.length === 0) {
      var _case = Case({
        element: this,
        status: 'inapplicable'
      });
      test.add(_case);
      return;
    } else {
      testableElements.each(function () {
        var _case = Case({
          element: this
        });
        test.add(_case);

        if ($(this).css('display') === 'none') {
          _case.set({
            status: 'inapplicable'
          });
          return;
        }
        if (!test.get('$scope').find('label[for=' + $(this).attr('id') + ']').length && (!$(this).attr('title') || IsUnreadable($(this).attr('title')))) {
          _case.set({
            status: 'failed'
          });
        } else {
          _case.set({
            status: 'passed'
          });
        }
      });
    }
  });
};
module.exports = InputWithoutLabelHasTitle;