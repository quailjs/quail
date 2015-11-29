/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
var EventComponent = require('EventComponent');

var ScriptOnmouseupHasOnkeyup = {
  run: function (test, options) {
    options = options || {
      selector: '[onmouseup]',
      correspondingEvent: 'onkeyup',
      searchEvent: 'onmouseup'
    };
    EventComponent(test, options);
  },

  meta: {
    testability: 1,
    title: {
      en: 'If an element has a \"onmouseup\" attribute it should also have an \"onkeyup\" attribute',
      nl: 'Als een element een \"onmouseup\"-attribuut heeft, moet het ook een \"onkeyup\"-attribuut hebben'
    },
    description: {
      en: 'If an element has a \"onmouseup\" attribute it should also have an \"onkeyup\" attribute.',
      nl: 'Als een element een \"onmouseup\"-attribuut heeft, moet het ook een \"onkeyup\"-attribuut hebben.'
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
module.exports = ScriptOnmouseupHasOnkeyup;
