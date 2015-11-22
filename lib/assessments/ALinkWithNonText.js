'use strict';

var Case = require('Case');
var IsUnreadable = require('IsUnreadable');
var ALinkWithNonText = function ALinkWithNonText(test) {
  test.get('$scope').find('a').each(function () {
    var _case = Case({
      element: this
    });
    test.add(_case);
    if (!$(this).is('a:has(img, object, embed)[href]')) {
      _case.set({
        status: 'inapplicable'
      });
      return;
    }
    if (!IsUnreadable($(this).text())) {
      _case.set({
        status: 'passed'
      });
      return;
    }
    var unreadable = 0;
    $(this).find('img, object, embed').each(function () {
      if ($(this).is('img') && IsUnreadable($(this).attr('alt')) || !$(this).is('img') && IsUnreadable($(this).attr('title'))) {
        unreadable++;
      }
    });
    if ($(this).find('img, object, embed').length === unreadable) {
      _case.set({
        status: 'failed'
      });
    } else {
      _case.set({
        status: 'passed'
      });
    }
  });
};
module.exports = ALinkWithNonText;