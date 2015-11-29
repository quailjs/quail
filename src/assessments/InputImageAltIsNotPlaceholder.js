/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
var PlaceholderComponent = require('PlaceholderComponent');

var InputImageAltIsNotPlaceholder = {
  run: function (test, options) {
    options = options || {
      selector: 'input[type="image"]',
      attribute: 'alt'
    };
    PlaceholderComponent(test, options);
  },

  meta: {
    testability: 1,
    title: {
      en: 'All \"input\" elements with a type of \"image\" must have an \"alt\" attribute which is not placeholder text.',
      nl: 'Elk \"invoer\"-element met een type \"afbeelding\" moet een \"alt\"-attribuut hebben anders dan alleen placeholdertekst.'
    },
    description: {
      en: 'All \"input\" elements with a type of \"image\" must have an \"alt\" attribute which is not placeholder text.',
      nl: 'Elk \"invoer\"-element met een type \"afbeelding\" moet een \"alt\"-attribuut hebben anders dan alleen placeholdertekst.'
    },
    guidelines: {
      508:  [
        'a'
      ],
      wcag: {
        '1.1.1': {
          techniques:  [
            'H36'
          ]
        },
        '2.1.1': {
          techniques:  [
            'H91'
          ]
        },
        '2.1.3': {
          techniques:  [
            'H91'
          ]
        },
        '4.1.2': {
          techniques:  [
            'H91'
          ]
        }
      }
    },
    tags: [
      'form',
      'image',
      'content'
    ]
  }
};
module.exports = InputImageAltIsNotPlaceholder;
