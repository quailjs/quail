/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
var PlaceholderComponent = require('PlaceholderComponent');

var LegendTextNotPlaceholder = {
  run: function (test, options) {
    options = options || {
      selector: 'legend',
      content: 'true',
      emtpy: 'true'
    };
    PlaceholderComponent(test, options);
  },

  meta: {
    testability: 1,
    title: {
      en: '\"Legend\" text must not contain placeholder text',
      nl: '\"Legend\"-tekst moet geen placeholdertekst bevatten'
    },
    description: {
      en: 'If a <code>legend</code> element is used in a fieldset, the <code>legend</code> should not contain useless placeholder text like \"form\" or \"field\".',
      nl: 'Als een <code>legend</code>-element wordt gebruikt in een fieldset, moet de <code>legend</code> geen placeholdertekst bevatten zoals \"form\" of \"field\".'
    },
    guidelines: {
      wcag: {
        '1.3.1': {
          techniques:  [
            'H71'
          ]
        },
        '2.1.1': {
          techniques:  [
            'H91'
          ]
        },
        '2.4.6': {
          techniques:  [
            'G131'
          ]
        },
        '3.3.2': {
          techniques:  [
            'H71'
          ]
        },
        '4.1.3': {
          techniques:  [
            'H91'
          ]
        }
      }
    },
    tags: [
      'form',
      'content'
    ]
  }
};
module.exports = LegendTextNotPlaceholder;
