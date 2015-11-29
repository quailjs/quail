/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
var EventComponent = require('EventComponent');

var ButtonDoesNotChangeContextOnFocus = {
  run: function (test, options) {
    options = options || {
      searchEvent: 'onfocus'
    };
    EventComponent(test, options);
  },

  meta: {
    testability: 1,
    title: {
      en: 'Buttons must not contain an \"onfocus\" attribute',
      nl: 'Knoppen bevatten geen \"onfocus\"-attribuut'
    },
    description: {
      en: 'Actions like \"onfocus\" can take control away from users who are trying to navigate the page. Using an \"onfocus\" attribute for things like buttons should be replaced with css.',
      nl: 'Acties zoals \"onfocus\" kunnen de controle ontnemen van gebruikers die op een pagina proberen te navigeren. Het gebruik van een \"onfocus\"-attribuut voor zaken als knoppen moet worden vervangen door middel van css.'
    },
    guidelines: [

    ],
    tags: [
      'form',
      'content'
    ]
  }
};
module.exports = ButtonDoesNotChangeContextOnFocus;
