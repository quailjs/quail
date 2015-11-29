/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
var PlaceholderComponent = require('PlaceholderComponent');

var ImgAltNotPlaceHolder = {
  run: function (test, options) {
    options = options || {
      selector: 'img',
      attribute: 'alt'
    };
    PlaceholderComponent(test, options);
  },

  meta: {
    testability: 1,
    title: {
      en: 'Images should not have a simple placeholder text as an \"alt\" attribute',
      nl: 'Afbeeldingen mogen geen placeholdertkest als \"alt\"-attribuut hebben'
    },
    description: {
      en: 'Any image that is not used decorativey or which is purely for layout purposes cannot have an \"alt\" attribute that consists solely of placeholders.',
      nl: 'Elke afbeelding die niet ter decoratie is of die alleen voor lay-out doeleinden is bedoeld, mag geen \"alt\"-attribuut hebben met daarin placeholdertekst.'
    },
    guidelines: {
      508:  [
        'a'
      ],
      wcag: {
        '1.1.1': {
          techniques:  [
            'F30',
            'F39'
          ]
        },
        '1.2.1': {
          techniques:  [
            'F30'
          ]
        }
      }
    },
    tags: [
      'image',
      'content'
    ]
  }
};
module.exports = ImgAltNotPlaceHolder;
