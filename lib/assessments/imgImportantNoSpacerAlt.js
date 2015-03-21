quail.imgImportantNoSpacerAlt = function (quail, test, Case) {
  test.get('$scope').find('img[alt]').each(function () {
    var width = ($(this).width()) ? $(this).width() : parseInt($(this).attr('width'), 10);
    var height = ($(this).height()) ? $(this).height() : parseInt($(this).attr('height'), 10);
    var _case = Case({
      element: this
    });
    test.add(_case);
    if (quail.isUnreadable($(this).attr('alt').trim()) &&
        $(this).attr('alt').length > 0 &&
        width > 50 &&
        height > 50) {
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
