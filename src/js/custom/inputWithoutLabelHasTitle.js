quail.inputWithoutLabelHasTitle = function (quail, test, Case) {
  test.get('$scope').find('input, select, textarea').each(function() {
    var _case = Case({
      element: this,
      expected: $(this).closest('.quail-test').data('expected')
    });
    test.add(_case);
    if (!$(this).parent('label').length &&
      !test.get('$scope').find('label[for=' + $(this).attr('id') + ']').length &&
      (!$(this).attr('title') || quail.isUnreadable($(this).attr('title')))) {
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
