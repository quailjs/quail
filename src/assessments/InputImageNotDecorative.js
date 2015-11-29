/**
 * Not yet implemented.
 */
var InputImageNotDecorative = {
  run: function () {
    return;
  },

  meta: {
    testability: 0,
    title: {
      en: 'The \"alt\" text for input \"image\" buttons must be the same as text inside the image',
      nl: 'De \"alt\"-tekst voor afbeeldingen van invoerknoppen moet hetzelfde zijn als de tekst in de afbeeldingen'
    },
    description: {
      en: 'Every form image button which has text within the image (say, a picture of the word \"Search\" in a special font) must also have this text in the \"alt\" text.',
      nl: 'Elke formulierknop die een afbeelding is en tekst in de afbeelding heeft (bijvoorbeeld \"Zoek\") moet deze tekst ook in de \"alt\"-tekst hebben.'
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
      'image',
      'content'
    ]
  }
};
module.exports = InputImageNotDecorative;
