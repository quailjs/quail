quail.preShouldNotBeUsedForTabularLayout = function(quail, test, Case) {
  test.get('$scope').find('pre').each(function() {
    var _case = Case({
      element : this,
      expected: $(this).closest('.quail-test').data('expected')
    });
    test.add(_case);
    var rows = $(this).text().split(/[\n\r]+/);
    _case.set({
      'status': (rows.length > 1 && $(this).text().search(/\t/) > -1) ?
        'failed' :
        'passed'
    });
  });
};
