'use strict';

var Case = require('Case');
var AImgAltNotRepetitive = function AImgAltNotRepetitive(quail, test) {
  test.get('$scope').find('a img[alt]').each(function () {
    var _case = test.add(Case({
      element: this
    }));

    var alt = quail.cleanString($(this).attr('alt'));
    var linkText = quail.cleanString($(this).closest('a').text());

    if (alt.length > 0 && linkText.indexOf(alt) > -1) {
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
module.exports = AImgAltNotRepetitive;