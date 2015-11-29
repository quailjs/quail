/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
var EventComponent = require('EventComponent');

var ScriptOnmouseoutHasOnmouseblur = {
  run: function (test, options) {
    options = options || {
      selector: '[onmouseout]',
      correspondingEvent: 'onblur',
      searchEvent: 'onmouseout'
    };
    EventComponent(test, options);
  },

  meta: {
    testability: 1,
    title: {
      en: 'If an element has a \"onmouseout\" attribute it should also have an \"onblur\" attribute',
      nl: 'Als een element een \"onmouseout\"-attribuut heeft, moet het ook een \"onblur\" attribuut hebben'
    },
    description: {
      en: 'If an element has a \"onmouseout\" attribute it should also have an \"onblur\" attribute.',
      nl: 'Als een element een \"onmouseout\"-attribuut heeft, moet het ook een \"onblur\"-attribuut hebben.'
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
module.exports = ScriptOnmouseoutHasOnmouseblur;
