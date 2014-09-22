quail.imgAltIsDifferent = function(quail, test, Case) {
  test.get('$scope').find('img:not([src])').each(function() {
    var _case = Case({
      element: this,
      expected: $(this).closest('.quail-test').data('expected'),
      'status': 'inapplicable'
    });
    test.add(_case);
  });
  test.get('$scope').find('img[alt][src]').each(function() {
    var _case = Case({
      element: this,
      expected: $(this).closest('.quail-test').data('expected')
    });
    test.add(_case);
    if ($(this).attr('src') === $(this).attr('alt') || $(this).attr('src').split('/').pop() === $(this).attr('alt')) {
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
