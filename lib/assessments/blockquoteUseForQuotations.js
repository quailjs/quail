'use strict';

var BlockquoteUseForQuotations = function BlockquoteUseForQuotations(quail, test, Case) {
  test.get('$scope').find('p').each(function () {
    var _case = Case({
      element: this
    });
    test.add(_case);
    if ($(this).parents('blockquote').length > 0) {
      _case.set({
        status: 'inapplicable'
      });
      return;
    }
    if ($(this).text().substr(0, 1).search(/'|"|«|“|「/) > -1 && $(this).text().substr(-1, 1).search(/'|"|»|„|」/) > -1) {
      _case.set({
        status: 'failed'
      });
    } else {
      _case.set({
        status: 'passed'
      });
    }
  });
};;
module.exports = BlockquoteUseForQuotations;