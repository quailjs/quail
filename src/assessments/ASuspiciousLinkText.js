var CleanStringComponent = require('CleanStringComponent');
var Case = require('Case');
var SuspiciousLinksStringsComponent = require('SuspiciousLinksStringsComponent');
var ASuspiciousLinkText = function (test) {
  test.get('$scope').find('a').each(function () {
    var _case = Case({
      element: this
    });
    test.add(_case);
    if (!$(this).attr('href')) {
      _case.set({
        status: 'inapplicable'
      });
      return;
    }
    var text = $(this).text();
    $(this).find('img[alt]').each(function () {
      text = text + $(this).attr('alt');
    });
    if (SuspiciousLinksStringsComponent.indexOf(CleanStringComponent(text)) > -1) {
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
module.exports = ASuspiciousLinkText;
