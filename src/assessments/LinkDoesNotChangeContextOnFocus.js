/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
var EventComponent = require('EventComponent');

var LinkDoesNotChangeContextOnFocus = {
  run: function (test, options) {
    options = options || {
      selector: 'a[href]',
      searchEvent: 'onfocus'
    };
    EventComponent(test, options);
  },

  meta: {
    testability: 1,
    title: {
      en: 'Link elements must not contain an \"onfocus\" attribute',
      nl: 'Link-elementen bevatten geen \"onfocus\"-attribuut'
    },
    description: {
      en: 'Actions like \"onfocus\" can take control away from users who are trying to navigate the page. Using an \"onfocus\" attribute for things like links should be replaced with css.',
      nl: 'Acties zoals \"onfocus\" kunnen de controle ontnemen van gebruikers die op een pagina proberen te navigeren. Het gebruik van een \"onfocus\"-attribuut voor zaken als links moet worden vervangen door middel van css.'
    },
    guidelines: [

    ],
    tags: [
      'form',
      'content'
    ]
  }
};
module.exports = LinkDoesNotChangeContextOnFocus;
