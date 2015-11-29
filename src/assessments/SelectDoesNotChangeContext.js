/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
var EventComponent = require('EventComponent');

var SelectDoesNotChangeContext = {
  run: function (test, options) {
    options = options || {
      selector: 'select',
      searchEvent: 'onchange'
    };
    EventComponent(test, options);
  },

  meta: {
    testability: 1,
    title: {
      en: '\"Select\" elements must not contain an \"onchange\" attribute',
      nl: '\"Select\" elements bevatten geen \"onchange\" attribute'
    },
    description: {
      en: 'Actions like \"onchange\" can take control away from users who are trying to navigate the page. Using an \"onchange\" attribute for things like select-list menus should instead be replaced with a drop-down and a button which initiates the action.',
      nl: 'Acties als \"onchange\" kunnen de controle ontnemen van gebruikers die op een pagina proberen te navigeren. Het gebruik van een \"onchange\"-attribuut voor zaken zoals select-list menu\'s moet vervangen worden door een drop-down en een knop waarmee je de actie start.'
    },
    guidelines: [

    ],
    tags: [
      'form',
      'content'
    ]
  }
};
module.exports = SelectDoesNotChangeContext;
