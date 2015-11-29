/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
var PlaceholderComponent = require('PlaceholderComponent');

var InputTextHasValue = {
  run: function (test, options) {
    options = options || {
      selector: 'input[type="text"]',
      attribute: 'value',
      empty: 'true'
    };
    PlaceholderComponent(test, options);
  },

  meta: {
    testability: 1,
    title: {
      en: 'All \"input\" elements of type \"text\" must have a default text',
      nl: 'Alle invoerelementen van het type \"text\" moeten een standaardtekst hebben'
    },
    description: {
      en: 'All <code>input</code> elements of type \"text\" should have a default text.',
      nl: 'Alle invoerelementen van het type \"text\" moeten een standaardtekst hebben.'
    },
    guidelines: [

    ],
    tags: [
      'form',
      'content'
    ]
  }
};
module.exports = InputTextHasValue;
