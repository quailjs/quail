/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
var PlaceholderComponent = require('PlaceholderComponent');

var DocumentTitleNotEmpty = {
  run: function (test, options) {
    options = options || {
      selector: 'head > title',
      content: 'true',
      empty: 'true'
    };
    PlaceholderComponent(test, options);
  },

  meta: {
    testability: 1,
    title: {
      en: 'The document should not have an empty title',
      nl: 'Het document mag geen lege titel hebben'
    },
    description: {
      en: 'The document should have a title element that is not white space.',
      nl: 'Het document moet een titelelement hebben dat is ingevuld.'
    },
    guidelines: {
      wcag: {
        '2.4.2': {
          techniques:  [
            'F25',
            'H25'
          ]
        }
      }
    },
    tags: [
      'document',
      'head'
    ]
  }
};
module.exports = DocumentTitleNotEmpty;
