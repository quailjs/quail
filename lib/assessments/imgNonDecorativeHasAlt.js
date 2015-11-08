'use strict';

var ImgNonDecorativeHasAlt = function ImgNonDecorativeHasAlt(quail, test, Case) {
  test.get('$scope').find('img[alt]').each(function () {
    var _case = Case({
      element: this
    });
    test.add(_case);
    if (quail.isUnreadable($(this).attr('alt')) && ($(this).width() > 100 || $(this).height() > 100)) {
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
module.exports = ImgNonDecorativeHasAlt;