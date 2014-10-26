quail.aMustContainText = function(quail, test, Case) {
  test.get('$scope').find('a').each(function() {
    var _case = Case({
      element: this,
      expected: $(this).closest('.quail-test').data('expected')
    });
    test.add(_case);
    if (!$(this).attr('href')) {
      _case.set({
        'status': 'inapplicable'
      });
      return;
    }
    if (!quail.containsReadableText($(this), true) &&
       !(($(this).attr('name') || $(this).attr('id')) && !$(this).attr('href'))) {
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
