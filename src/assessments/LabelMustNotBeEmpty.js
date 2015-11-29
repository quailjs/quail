/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
var PlaceholderComponent = require('PlaceholderComponent');

var LabelMustNotBeEmpty = {
  run: function (test, options) {
    options = options || {
      selector: 'label',
      content: 'true',
      empty: 'true'
    };
    PlaceholderComponent(test, options);
  },

  meta: {
    testability: 1,
    title: {
      en: 'Labels must contain text',
      nl: 'Labels moeten tekst bevatten'
    },
    description: {
      en: 'Labels in forms must contain readable text that describes the target form element.',
      nl: 'Labels in formulieren moeten leesbare tekst bevatten die het formulierelement beschrijven.'
    },
    guidelines: {
      wcag: {
        '1.1.1': {
          techniques: [
            'H44'
          ]
        },
        '1.3.1': {
          techniques: [
            'H44',
            'F68'
          ]
        },
        '3.3.2': {
          techniques: [
            'H44'
          ]
        },
        '4.1.2': {
          techniques: [
            'H44'
          ]
        }
      }
    },
    tags: [
      'form',
      'content'
    ]
  }
};
module.exports = LabelMustNotBeEmpty;
