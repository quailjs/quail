/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
var LabelComponent = require('LabelComponent');

var TextareaHasAssociatedLabel = {
  run: function (test, options) {
    options = options || {
      selector: 'textarea'
    };
    LabelComponent(test, options);
  },

  meta: {
    testability: 1,
    title: {
      en: 'All textareas should have a corresponding label',
      nl: 'Alle \"textarea\"-elementen moeten een bijbehorend label hebben'
    },
    description: {
      en: 'All <code>textarea</code> elements should have a corresponding <code>label</code> element. Screen readers often enter a \"form mode\" where only label text is read aloud to the user',
      nl: 'Alle \"textarea\"-elementen moeten een bijbehorend label hebben. Schermlezers maken vaak gebruik van een \"formuliereninstelling\" waarbij alleen de tekst van de labels hardop aan de gebruiker wordt voorgelezen.'
    },
    guidelines: {
      wcag: {
        '1.1.1': {
          techniques:  [
            'H44'
          ]
        },
        '1.3.1': {
          techniques:  [
            'H44',
            'F68'
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
        '3.3.2': {
          techniques:  [
            'H44'
          ]
        },
        '4.1.2': {
          techniques:  [
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
module.exports = TextareaHasAssociatedLabel;
