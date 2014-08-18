quail.KINGUseLongDateFormat = function (quail, test, Case) {

  function testDateFormat(index, element) {
    // Detect dates with several separators.
    var dateReg = /\d{1,2}([./-])\d{1,2}\1\d{2,4}/g;

    var text = quail.getTextContents($(element));
    var _case = Case({
      element: this,
      expected: $(this).closest('.quail-test').data('expected')
    });
    test.add(_case);

    // Only test if there is one date in the wrong format and call it.
    _case.set({
      'status': dateReg.test(text) ? 'failed' : 'passed'
    });
  }
  test.get('$scope').find('p').each(testDateFormat);
};
