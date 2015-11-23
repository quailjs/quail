var Case = require('Case');
var InputImageAltIsShort = function (test) {
  test.get('$scope').find('input[type=image]').each(function () {
    var _case = Case({
      element: this
    });
    test.add(_case);
    if ($(this).attr('alt').length > 100) {
      _case.set({
        status: 'failed'
      });
    }
    else {
      _case.set({
        status: 'passed'
      });
    }
  });
};
module.exports = InputImageAltIsShort;
