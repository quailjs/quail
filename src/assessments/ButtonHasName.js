/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
var PlaceholderComponent = require('PlaceholderComponent');

var ButtonHasName = {
  run: function (test, options) {
    options = options || {
      selector: 'button',
      content: 'true',
      empty: 'true',
      attribute: 'title'
    };
    PlaceholderComponent(test, options);
  },

  meta: {
    testability: 1,
    title: {
      en: 'Button should contain text',
      nl: 'Een knop moet tekst bevatten'
    },
    description: {
      en: 'Buttons should contain a text value within the element, or have a value attribute.',
      nl: 'Knoppen moeten een tekstwaarde binnen het element hebben, of een waarde-attribuut.'
    },
    guidelines: {
      wcag: {
        '2.1.1': {
          techniques: [
            'H91'
          ]
        },
        '2.1.3': {
          techniques: [
            'H91'
          ]
        },
        '4.1.2': {
          techniques: [
            'H91'
          ]
        }
      }
    },
    tags: [
      'content'
    ]
  }
};
module.exports = ButtonHasName;
