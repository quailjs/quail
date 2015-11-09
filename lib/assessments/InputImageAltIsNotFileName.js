'use strict';

var Case = require('Case');
var InputImageAltIsNotFileName = function InputImageAltIsNotFileName(quail, test) {
  test.get('$scope').find('input[type=image][alt]').each(function () {
    var _case = Case({
      element: this
    });
    test.add(_case);
    if ($(this).attr('src') === $(this).attr('alt')) {
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
module.exports = InputImageAltIsNotFileName;