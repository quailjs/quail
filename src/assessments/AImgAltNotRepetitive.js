var CleanStringComponent = require('CleanStringComponent');
var Case = require('Case');
var AImgAltNotRepetitive = function (quail, test) {
  test.get('$scope').find('a img[alt]').each(function () {
    var _case = test.add(Case({
      element: this
    }));

    var alt = CleanStringComponent($(this).attr('alt'));
    var linkText = CleanStringComponent($(this).closest('a').text());

    if (alt.length > 0 && linkText.indexOf(alt) > -1) {
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
module.exports = AImgAltNotRepetitive;
