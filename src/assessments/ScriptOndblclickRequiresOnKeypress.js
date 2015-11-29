/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
var EventComponent = require('EventComponent');

var ScriptOndblclickRequiresOnKeypress = {
  run: function (test, options) {
    options = options || {
      selector: '[ondblclick]',
      correspondingEvent: 'onkeypress',
      searchEvent: 'ondblclick'
    };
    EventComponent(test, options);
  },

  meta: {
    testability: 1,
    title: {
      en: 'Any element with an \"ondblclick\" attribute should have a keyboard-related action as well',
      nl: 'Elk element met een \"ondblclick\"-attribuut moet een vergelijkbare actie hebben die kan worden uitgevoerd met een toetsenbord'
    },
    description: {
      en: 'If an element has an \"ondblclick\" attribute, it should also have a keyboard-related action.',
      nl: 'Als een element een \"ondblclick\"-attribuut heeft, moet het ook een actie bevatten die kan worden uitgevoerd met een toetsenbord.'
    },
    guidelines: {
      508: [
        'l'
      ],
      wcag: {
        '2.1.1': {
          techniques: [
            'G90',
            'SCR2',
            'SCR20'
          ]
        },
        '2.1.3': {
          techniques: [
            'G90',
            'SCR20'
          ]
        }
      }
    },
    tags: [
      'javascript'
    ]
  }
};
module.exports = ScriptOndblclickRequiresOnKeypress;
