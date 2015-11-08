'use strict';

var ALinksAreSeparatedByPrintableCharacters = function ALinksAreSeparatedByPrintableCharacters(quail, test, Case) {
  test.get('$scope').find('a').each(function () {
    var _case = test.add(Case({
      element: this
    }));
    // Only test if there's another a tag.
    if ($(this).next('a').length) {
      if (quail.isUnreadable($(this).get(0).nextSibling.wholeText)) {
        _case.set({
          status: 'failed'
        });
      } else {
        _case.set({
          status: 'passed'
        });
      }
    }
  });
};
module.exports = ALinksAreSeparatedByPrintableCharacters;