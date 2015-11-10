'use strict';

var ValidURLComponent = require('ValidURLComponent');
var Case = require('Case');
var ImgHasLongDesc = function ImgHasLongDesc(quail, test) {
  test.get('$scope').find('img[longdesc]').each(function () {
    var _case = Case({
      element: this
    });
    test.add(_case);
    if ($(this).attr('longdesc') === $(this).attr('alt') || !ValidURLComponent($(this).attr('longdesc'))) {
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
module.exports = ImgHasLongDesc;