quail.KINGStrongList = function (quail, test, Case) {
  test.get('$scope').find('strong').each(function() {
    var _case = Case({
      element: this,
      expected: $(this).closest('.quail-test').data('expected')
    });
    test.add(_case);
    _case.set({
      'status': $(this).parent().is('li') ? 'passed' : 'failed'
    });
  });
};
