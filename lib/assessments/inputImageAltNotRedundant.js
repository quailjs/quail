quail.inputImageAltNotRedundant = function (quail, test, Case) {
  test.get('$scope').find('input[type=image][alt]').each(function() {
    var _case = Case({
      element: this,
      expected: $(this).closest('.quail-test').data('expected')
    });
    test.add(_case);
    if (quail.strings.redundant.inputImage.indexOf(quail.cleanString($(this).attr('alt'))) > -1) {
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
