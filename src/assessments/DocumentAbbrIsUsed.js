var AcronymComponent = require('AcronymComponent');
var DocumentAbbrIsUsed = {
  run: function (test) {
    AcronymComponent(test, 'abbr');
  },

  meta: {
    testability: 0.5,
    title: {
      en: 'Abbreviations must be marked with an \"abbr\" element',
      nl: 'Afkortingen moeten worden gemarkeerd met een \"abbr\"-element'
    },
    description: {
      en: 'Abbreviations should be marked with an <code>abbr</code> element, at least once on the page for each abbreviation.',
      nl: 'Afkortingen moeten worden gemarkeerd door middel van het <code>abbr</code>-element. Doe dit ten minste een keer per pagina voor elke afkorting.'
    },
    guidelines: {
      wcag: {
        '3.1.4': {
          techniques:  [
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
module.exports = DocumentAbbrIsUsed;
