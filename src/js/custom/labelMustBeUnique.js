quail.labelMustBeUnique = function (quail, test, Case) {
  var labels = { };
  test.get('$scope').find('label[for]').each(function() {
    if (typeof labels[$(this).attr('for')] === 'undefined') {
      labels[$(this).attr('for')] = 0;
    }
    labels[$(this).attr('for')]++;
  });
  test.get('$scope').find('label[for]').each(function() {
    var _case = Case({
      element: this,
      expected: $(this).closest('.quail-test').data('expected'),
      status: (labels[$(this).attr('for')] === 1) ?
        'passed' :
        'failed'
    });
    test.add(_case);
  });
};
