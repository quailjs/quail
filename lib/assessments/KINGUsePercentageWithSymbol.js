quail.KINGUsePercentageWithSymbol = function (quail, test, Case) {
  function testPercentFormat(index, element) {
    // Detect dates with several separators.
    var percentName = [
      'percent',
      'pct\\.'
    ];
    // Test the words and any eventual extra letters for s and all.
    var percentReg = new RegExp('\\d{1,}\\s*(' + percentName.join('|') + ')|(' + percentName.join('|') + ')\\s*\\d{1,}', 'ig');

    var text = quail.getTextContents($(element));
    var _case = Case({
      element: this,
      expected: $(this).closest('.quail-test').data('expected')
    });
    test.add(_case);

    _case.set({
      'status': percentReg.test(text) ? 'failed' : 'passed'
    });
  }
  test.get('$scope').find('p').each(testPercentFormat);
};
