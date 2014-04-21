quail.tableAxisHasCorrespondingId = function (quail, test, Case) {
  test.get('$scope').find('[axis]').each(function() {
    var _case = Case({
      element: this,
      expected: $(this).closest('.quail-test').data('expected')
    });
    test.add(_case);
    if ($(this).parents('table').first().find('th#' + $(this).attr('axis')).length === 0) {
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
