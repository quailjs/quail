/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
var LabelComponent = require('LabelComponent');

var CheckboxHasLabel = {
  run: function (test, options) {
    options = options || {
      selector: 'input[type="checkbox"]'
    };
    LabelComponent(test, options);
  },

  meta: {
    testability: 1,
    title: {
      en: 'All checkboxes must have a corresponding label',
      nl: 'Alle keuzevakjes moeten een bijbehorend label hebben'
    },
    description: {
      en: 'All <code>input</code> elements with a type of \"checkbox\" should have a corresponding <code>label</code> element. Screen readers often enter a \"form mode\" where only label text is read aloud to the user',
      nl: 'Alle  <code>input</code>-elementen met een \"keuzevakje\" moeten een bijbehorend <code>label</code>-element hebben. Schermlezers maken vaak gebruik van een \"formuliereninstelling\" waarbij alleen de tekst van de labels hardop aan de gebruiker wordt voorgelezen.'
    },
    guidelines: {
      508: [
        'c'
      ],
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
        '3.3.2': {
          techniques: [
            'H44'
          ]
        },
        '4.1.2': {
          techniques: [
            'H44',
            'H91'
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
module.exports = CheckboxHasLabel;
