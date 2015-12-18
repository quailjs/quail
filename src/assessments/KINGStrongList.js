var Case = require('Case');
const DOM = require('DOM');
var KINGStrongList = {
  run: function (test) {
    DOM.scry('strong', test.get('scope')).each(function () {
      var _case = Case({
        element: this
      });
      test.add(_case);
      _case.set({
        status: $(this).parent().is('li') ? 'passed' : 'failed'
      });
    });
  },

  meta: {
    testability: 1,
    title: {
      en: 'Use strong in lists only'
    },
    description: {
      en: 'STRONG only allowed when parent element is LI.'
    },
    guidelines: [

    ],
    tags: [
      'KING'
    ]
  }
};
module.exports = KINGStrongList;
