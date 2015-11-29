/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
var EventComponent = require('EventComponent');

var ScriptOnmouseoverHasOnfocus = {
  run: function (test, options) {
    options = options || {
      selector: '[onmouseover]',
      correspondingEvent: 'onfocus',
      searchEvent: 'onmouseover'
    };
    EventComponent(test, options);
  },

  meta: {
    testability: 1,
    title: {
      en: 'If an element has a \"onmouseover\" attribute it should also have an \"onfocus\" attribute',
      nl: 'Als een element een \"onmouseover\"-attribuut heeft, moet het ook een \"onfocus\"-attribuut hebben'
    },
    description: {
      en: 'If an element has a \"onmouseover\" attribute it should also have an \"onfocus\" attribute.',
      nl: 'Als een element een \"onmouseover\"-attribuut heeft, moet het ook een \"onfocus\"-attribuut hebben.'
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
module.exports = ScriptOnmouseoverHasOnfocus;
