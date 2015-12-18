var Case = require('Case');
const DOM = require('DOM');
var DocumentTitleIsShort = {
  run: function (test) {
    var $title = DOM.scry('head title', test.get('scope'));
    test.add(Case({
      element: $title.get(0),
      status: $title.text().length > 150 ? 'failed' : 'passed'
    }));
  },

  meta: {
    testability: 0.5,
    title: {
      en: 'The document title should be short',
      nl: 'De documenttitel moet kort zijn'
    },
    description: {
      en: 'The document title should be short and succinct. This test fails at 150 characters, but authors should consider this to be a suggestion.',
      nl: 'De documenttitel moet kort en beknopt zijn. Probeer bij een titel langer dan 150 tekense de titel in te korten waar mogelijk.'
    },
    guidelines: [

    ],
    tags: [
      'document',
      'head'
    ]
  }
};
module.exports = DocumentTitleIsShort;
