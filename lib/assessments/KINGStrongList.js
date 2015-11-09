'use strict';

var Case = require('Case');
var KINGStrongList = function KINGStrongList(quail, test) {
  test.get('$scope').find('strong').each(function () {
    var _case = Case({
      element: this
    });
    test.add(_case);
    _case.set({
      status: $(this).parent().is('li') ? 'passed' : 'failed'
    });
  });
};
module.exports = KINGStrongList;