quail.idRefHasCorrespondingId = function(quail, test, Case) {
  test.get('$scope').find('[idref]').each(function() {
    var _case = Case({
      element: this,
      expected: $(this).closest('.quail-test').data('expected')
    });
    test.add(_case);
    if (test.get('$scope').find('#' + $(this).attr('idref')).length === 0) {
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
