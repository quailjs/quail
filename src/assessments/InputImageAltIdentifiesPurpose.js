/**
 * Not yet implemented.
 */
var InputImageAltIdentifiesPurpose = {
  run: function () {
    return;
  },

  meta: {
    testability: 0,
    title: {
      en: 'All \"input\" elements with a type of \"image\" must have an \"alt\" attribute that describes the function of the input',
      nl: 'Elk \"invoer\"-element met een type \"afbeelding\" moet een \"alt\"-attribuut hebben dat de functie van de invoer beschrijft'
    },
    description: {
      en: 'All <code>input</code> elements with a type of \"image\" should have an \"alt\" attribute.',
      nl: 'Elk \"invoer\"-element met een type \"afbeelding\" moet een \"alt\"-attribuut hebben.'
    },
    guidelines: {
      wcag: {
        '1.1.1': {
          techniques: [
            'H36'
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
module.exports = InputImageAltIdentifiesPurpose;
