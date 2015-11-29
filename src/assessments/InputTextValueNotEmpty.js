/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
var PlaceholderComponent = require('PlaceholderComponent');

var InputTextValueNotEmpty = {
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
      en: 'Text input elements require a non-whitespace default text',
      nl: 'Tekstinvoerelementen mogen geen lege standaardtekst hebben'
    },
    description: {
      en: 'All <code>input</code> elements with a type of \"text\" should have a default text which is not empty.',
      nl: 'Alle invoerelementen van het type \"text\" moeten een standaardtekst hebben die gevuld is.'
    },
    guidelines: [

    ],
    tags: [
      'form',
      'content'
    ]
  }
};
module.exports = InputTextValueNotEmpty;
