quail.listNotUsedForFormatting = function(quail, test, Case) {
  test.get('$scope').find('ol, ul').each(function() {
    var _case = Case({
      element : this,
      expected: $(this).closest('.quail-test').data('expected')
    });
    test.add(_case);
    if ($(this).find('li').length < 2) {
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
