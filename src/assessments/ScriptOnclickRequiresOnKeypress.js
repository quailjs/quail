/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
var EventComponent = require('EventComponent');

var ScriptOnclickRequiresOnKeypress = {
  run: function (test, options) {
    options = options || {
      selector: '[onclick]',
      correspondingEvent: 'onkeypress',
      searchEvent: 'onclick'
    };
    EventComponent(test, options);
  },

  meta: {
    testability: 1,
    title: {
      en: 'If an element has an \"onclick\" attribute it should also have an \"onkeypress\" attribute',
      nl: 'Als een element een \"onclick\"-attribuut heeft, moet het ook een \"onkeypress\"-attribuut hebben'
    },
    description: {
      en: 'If an element has an \"onclick\" attribute it should also have an \"onkeypress\" attribute',
      nl: 'Als een element een \"onclick\"-attribuut heeft, moet het ook een \"onkeypress\"-attribuut hebben'
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
module.exports = ScriptOnclickRequiresOnKeypress;
