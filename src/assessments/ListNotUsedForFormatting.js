var Case = require('Case');
var ListNotUsedForFormatting = function (test) {
  test.get('$scope').find('ol, ul').each(function () {
    var _case = Case({
      element: this
    });
    test.add(_case);
    if ($(this).find('li').length < 2) {
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
module.exports = ListNotUsedForFormatting;
