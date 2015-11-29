var AcronymComponent = require('AcronymComponent');
var DocumentAcronymsHaveElement = {
  run: function (test) {
    AcronymComponent(test, 'acronym');
  },

  meta: {
    testability: 0.5,
    title: {
      en: 'Acronyms must be marked with an \"acronym\" element',
      nl: 'Acroniemen moeten worden gemarkeerd met een \"acronym\"-element'
    },
    description: {
      en: 'Acronyms should be marked with an <code>acronym</code> element, at least once on the page for each acronym.',
      nl: 'Acroniemen moeten worden gemarkeerd door middel van het <code>acronym</code>-element. Doe dit ten minste een keer per pagina voor elke acroniem.'
    },
    guidelines: {
      wcag: {
        '3.1.4': {
          techniques: [
            'H28'
          ]
        }
      }
    },
    tags: [
      'acronym',
      'content'
    ]
  }
};
module.exports = DocumentAcronymsHaveElement;
