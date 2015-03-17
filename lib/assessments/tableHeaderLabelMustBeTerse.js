quail.tableHeaderLabelMustBeTerse = function (quail, test, Case) {
  test.get('$scope').find('th, table tr:first td').each(function() {
    var _case = Case({
      element: this,
      expected: $(this).closest('.quail-test').data('expected')
    });
    test.add(_case);
    if ($(this).text().length > 20 &&
       (!$(this).attr('abbr') || $(this).attr('abbr').length > 20)) {
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
