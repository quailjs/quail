quail.imgAltNotEmptyInAnchor = function (quail, test, Case) {
  test.get('$scope').find('a img').each(function () {
    var _case = Case({
      element: this,
      expected: $(this).closest('.quail-test').data('expected')
    });
    test.add(_case);
    if (quail.isUnreadable($(this).attr('alt')) &&
        quail.isUnreadable($(this).parent('a:first').text())) {
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
