quail.imgHasLongDesc = function (quail, test, Case) {
  test.get('$scope').find('img[longdesc]').each(function() {
    var _case = Case({
      element: this,
      expected: $(this).closest('.quail-test').data('expected')
    });
    test.add(_case);
    if ($(this).attr('longdesc') === $(this).attr('alt') ||
        !quail.validURL($(this).attr('longdesc'))) {
      _case.set({
        'status': 'failed'
      });
    }
    else {
      _case.set({
        'status': 'passed'
      });
    }
  });
};
