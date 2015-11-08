'use strict';

var ImgHasLongDesc = function ImgHasLongDesc(quail, test, Case) {
  test.get('$scope').find('img[longdesc]').each(function () {
    var _case = Case({
      element: this
    });
    test.add(_case);
    if ($(this).attr('longdesc') === $(this).attr('alt') || !quail.validURL($(this).attr('longdesc'))) {
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
module.exports = ImgHasLongDesc;