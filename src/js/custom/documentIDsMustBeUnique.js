quail.documentIDsMustBeUnique = function(quail, test, Case) {
  var ids = {};
  test.get('$scope').find(':not([id])').each(function() {
    var _case = Case({
      element: this
    });
    test.add(_case);
    _case.set({
      'status': 'inapplicable',
      expected: $(this).closest('.quail-test').data('expected')
    });
  });
  test.get('$scope').find('[id]').each(function() {
    var _case = Case({
      element: this,
      expected: (function(element) {
        return quail.components.resolveExpectation(element);
      }(this))
    });
    test.add(_case);
    if (typeof ids[$(this).attr('id')] === 'undefined') {
      _case.set({
        'status': 'passed'
      });
      ids[$(this).attr('id')] = $(this).attr('id');
    }
    else {
      _case.set({
        'status': 'failed'
      });
    }
  });
};
