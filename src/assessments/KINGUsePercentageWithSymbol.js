var GetTextContentsComponent = require('GetTextContentsComponent');
var Case = require('Case');
const DOM = require('DOM');
var KINGUsePercentageWithSymbol = {
  run: function (test) {
    function testPercentFormat (element) {
      // Detect dates with several separators.
      var percentName = [
        'percent',
        'pct\\.'
      ];
      // Test the words and any eventual extra letters for s and all.
      var percentReg = new RegExp('\\d{1,}\\s*(' + percentName.join('|') + ')|(' + percentName.join('|') + ')\\s*\\d{1,}', 'ig');

      var text = GetTextContentsComponent($(element));
      var _case = Case({
        element: this
      });
      test.add(_case);

      _case.set({
        status: percentReg.test(text) ? 'failed' : 'passed'
      });
    }
    DOM.scry('p', test.get('scope')).forEach(testPercentFormat);
  },

  meta: {
    testability: 1,
    title: {
      en: 'Use a symbol within a percentage'
    },
    description: {
      en: ''
    },
    guidelines: [

    ],
    tags: [
      'KING'
    ]
  }
};
module.exports = KINGUsePercentageWithSymbol;
