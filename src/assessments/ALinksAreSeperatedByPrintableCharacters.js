var Case = require('Case');
var IsUnreadable = require('IsUnreadable');
var ALinksAreSeparatedByPrintableCharacters = function (quail, test) {
  test.get('$scope').find('a').each(function () {
    var _case = test.add(Case({
      element: this
    }));
    // Only test if there's another a tag.
    if ($(this).next('a').length) {
      if (IsUnreadable($(this).get(0).nextSibling.wholeText)) {
        _case.set({
          status: 'failed'
        });
      }
      else {
        _case.set({
          status: 'passed'
        });
      }
    }
  });
};
module.exports = ALinksAreSeparatedByPrintableCharacters;
