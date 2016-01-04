var GetTextContentsComponent = require('GetTextContentsComponent');
var Case = require('Case');
const DOM = require('DOM');
var KINGUseCurrencyAsSymbol = {
  run: function (test) {
    function testCurrencyFormat (element) {
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

      var text = GetTextContentsComponent(element);
      var _case = Case({
        element: element
      });
      test.add(_case);

      _case.set({
        status: currencyReg.test(text) ? 'failed' : 'passed'
      });
    }
    test.get('scope').forEach(function (scope) {
      DOM.scry('p', scope).forEach(testCurrencyFormat);
    });
  },

  meta: {
    testability: 1,
    title: {
      en: 'Use a symbol for a currency'
    },
    description: {
      en: 'Only use symbol and currency name instead of common name such as € or EUR.'
    },
    guidelines: [

    ],
    tags: [
      'KING'
    ]
  }
};
module.exports = KINGUseCurrencyAsSymbol;
