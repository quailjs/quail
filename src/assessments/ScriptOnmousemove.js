/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
var EventComponent = require('EventComponent');

var ScriptOnmousemove = {
  run: function (test, options) {
    options = options || {
      selector: '[onmousemove]',
      correspondingEvent: 'onkeypress',
      searchEvent: 'onmousemove'
    };
    EventComponent(test, options);
  },

  meta: {
    testability: 1,
    title: {
      en: 'Any element with an \"onmousemove\" attribute should have a keyboard-related action as well',
      nl: 'Elk element met een \"onmousemove\"-attribuut moet een vergelijkbare actie hebben die kan worden uitgevoerd met een toetsenbord'
    },
    description: {
      en: 'If an element has an \"onmousemove\" attribute it should have a keyboard-related action as well.',
      nl: 'Als een element een \"onmousemove\"-attribuut heeft, moet het een vergelijkbare actie hebben die kan worden uitgevoerd met een toetsenbord.'
    },
    guidelines: {
      508:  [
        'l'
      ],
      wcag: {
        '2.1.1': {
          techniques:  [
            'G90',
            'SCR2',
            'SCR20'
          ]
        },
        '2.1.3': {
          techniques:  [
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
module.exports = ScriptOnmousemove;
