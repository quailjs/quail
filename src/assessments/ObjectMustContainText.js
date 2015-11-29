/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
var PlaceholderComponent = require('PlaceholderComponent');

var ObjectMustContainText = {
  run: function (test, options) {
    options = options || {
      selector: 'object',
      content: 'true',
      empty: 'true'
    };
    PlaceholderComponent(test, options);
  },

  meta: {
    testability: 1,
    title: {
      en: 'Objects must contain their text equivalents',
      nl: 'Objecten moeten hun tekstuele equivalent bevatten'
    },
    description: {
      en: 'All <code>object</code> elements should contain a text equivalent if the object cannot be rendered.',
      nl: 'Alle <code>object</code>-elementen moeten een tekstequivalent bevatten in het geval het object niet getoond kan worden.'
    },
    guidelines: {
      wcag: {
        '1.1.1': {
          techniques:  [
            'FLASH1',
            'H27'
          ]
        }
      }
    },
    tags: [
      'objects',
      'content'
    ]
  }
};
module.exports = ObjectMustContainText;
