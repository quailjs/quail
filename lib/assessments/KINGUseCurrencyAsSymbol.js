quail.KINGUseCurrencyAsSymbol = function (quail, test, Case) {
  function testCurrencyFormat(index, element) {
    // Detect dates with several separators.
    var currencyNames = [
      'dollar',
      'euro',
      'pound',
      'franc',
      'krona',
      'rupee',
      'ruble',
      'dinar'
    ];
    // Test the words and any eventual extra letters for s and all.
    var currencyReg = new RegExp('\\d{1,}\\s*(' + currencyNames.join('|') + ')\\w*\\b|(' + currencyNames.join('|') + ')\\w*\\b\\s*\\d{1,}', 'ig');

    var text = quail.getTextContents($(element));
    var _case = Case({
      element: this,
      expected: $(this).closest('.quail-test').data('expected')
    });
    test.add(_case);

    _case.set({
      'status': currencyReg.test(text) ? 'failed' : 'passed'
    });
  }
  test.get('$scope').find('p').each(testCurrencyFormat);
};
