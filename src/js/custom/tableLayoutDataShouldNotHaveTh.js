quail.tableLayoutDataShouldNotHaveTh = function (quail, test, Case) {
  test.get('$scope').find('table').each(function() {
    var _case = Case({
      element: this,
      expected: $(this).closest('.quail-test').data('expected')
    });
    test.add(_case);

    if ($(this).find('th').length !== 0) {
      if (!quail.isDataTable($(this))) {
        _case.set({
          'status': 'failed'
        });
      }
      else {
        _case.set({
          'status': 'passed'
        });
      }
    }
    else {
      _case.set({
        'status': 'inapplicable'
      });
    }
  });
};
