/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
var EventComponent = require('EventComponent');

var ScriptOnmousedownRequiresOnKeypress = {
  run: function (test, options) {
    options = options || {
      selector: '[onmousedown]',
      correspondingEvent: 'onkeydown',
      searchEvent: 'onmousedown'
    };
    EventComponent(test, options);
  },

  meta: {
    testability: 1,
    title: {
      en: 'If an element has a \"mousedown\" attribute it should also have an \"onkeydown\" attribute',
      nl: 'Als een element een \"mousedown\"-attribuut heeft moet het ook een \"onkeydown\"-attribuut hebben'
    },
    description: {
      en: 'If an element has a \"mousedown\" attribute it should also have an \"onkeydown\" attribute.',
      nl: 'Als een element een \"mousedown\"-attribuut heeft moet het ook een \"onkeydown\"-attribuut hebben.'
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
module.exports = ScriptOnmousedownRequiresOnKeypress;
