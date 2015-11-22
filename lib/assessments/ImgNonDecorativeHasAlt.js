'use strict';

var Case = require('Case');
var IsUnreadable = require('IsUnreadable');
var ImgNonDecorativeHasAlt = function ImgNonDecorativeHasAlt(test) {
  test.get('$scope').find('img[alt]').each(function () {
    var _case = Case({
      element: this
    });
    test.add(_case);
    if (IsUnreadable($(this).attr('alt')) && ($(this).width() > 100 || $(this).height() > 100)) {
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
module.exports = ImgNonDecorativeHasAlt;