var ImgAltIsTooLong = function (quail, test, Case) {
  test.get('$scope').find('img[alt]').each(function () {
    var _case = Case({
      element: this
    });
    test.add(_case);
    _case.set({
      status: ($(this).attr('alt').length > 100) ? 'failed' : 'passed'
    });
  });
};
module.exports = ImgAltIsTooLong;
