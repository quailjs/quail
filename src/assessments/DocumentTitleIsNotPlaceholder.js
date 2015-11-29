/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
var PlaceholderComponent = require('PlaceholderComponent');

var DocumentTitleIsNotPlaceholder = {
  run: function (test, options) {
    options = options || {
      selector: 'head > title',
      content: 'true'
    };
    PlaceholderComponent(test, options);
  },

  meta: {
    testability: 1,
    title: {
      en: 'The document title should not be placeholder text',
      nl: 'De documenttitle moet geen placeholder tekst zijn'
    },
    description: {
      en: 'The document title should not be wasted placeholder text which does not describe the page.',
      nl: 'De documenttitel moet geen placeholder tekst zijn die geen goede beschrijving van de pagina is.'
    },
    guidelines: {
      wcag: {
        '2.4.2': {
          techniques: [
            'F25',
            'G88'
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
module.exports = DocumentTitleIsNotPlaceholder;
