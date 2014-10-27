quail.definitionListsAreUsed = function(quail, test, Case) {
  test.get('$scope').find('dl').each(function() {
    var _case = Case({
      element: this,
      expected: $(this).closest('.quail-test').data('expected')
    });
    test.add(_case);
    _case.set({
      'status': 'inapplicable'
    });
  });
  test.get('$scope').find('p, li').each(function() {
    var _case = Case({
      element: this,
      expected: $(this).closest('.quail-test').data('expected')
    });
    test.add(_case);
    var $item = $(this);
    $(this).find('span, strong, em, b, i').each(function() {
      if ($(this).text().length < 50 && $item.text().search($(this).text()) === 0) {
        if ($(this).is('span')) {
          if ($(this).css('font-weight') === $item.css('font-weight') &&
              $(this).css('font-style') === $item.css('font-style') ) {
            _case.set({
              'status': 'passed'
            });
            return;
          }
        }
        _case.set({
          'status': 'failed'
        });
      }
    });
  });
};
