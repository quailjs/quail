var PlaceholderComponent = require('PlaceholderComponent');
var AppletContainsTextEquivalentInAlt = {
  run: function (test) {
    PlaceholderComponent(test, {
      selector: 'applet',
      attribute: 'alt',
      empty: true
    });
  },

  meta: {
    testability: 0.5,
    title: {
      en: 'All applets should contain a text equivalent in the \"alt\" attribute',
      nl: 'Alle applets moeten een tekstuele equivalent bevatten in het \"alt\"-attribuut'
    },
    description: {
      en: 'Applets should contain their text equivalents or description in an \"alt\" attribute.',
      nl: 'Applets moeten hun tekstuele equivalent of beschrijving bevatten in een \"alt\"-attribuut.'
    },
    guidelines: {
      508: [
        'm'
      ],
      wcag: {
        '1.1.1': {
          techniques: [
            'G74',
            'H35'
          ]
        }
      }
    },
    tags: [
      'objects',
      'applet',
      'content'
    ]
  }
};
module.exports = AppletContainsTextEquivalentInAlt;
