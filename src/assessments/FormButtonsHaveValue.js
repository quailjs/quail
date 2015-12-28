/**
 * A simple test case that determines if elements, specified by a selector,
 * exist or not.
 *
 * The test fails for elements that are found and a case is created for each
 * one. The test passes is the selector finds no matching elements.
 */
var Case = require('Case');
const DOM = require('DOM');

var FormButtonsHaveValue = {
  run: function (test) {

    var selector = 'input[type=button], input[type=submit], input[type=reset]';

    test.get('scope').forEach(function (scope) {
      var candidates = DOM.scry(selector, $(this));
      if (!candidates.length) {
        test.add(Case({
          element: undefined,
          status: 'inapplicable'
        }));
      }
      else {
        candidates.each(function () {
          var status = 'failed';

          // If the button has a value, it passes.
          var val = this.getAttribute('value');
          if (val && typeof val === 'string' && val.length > 0) {
            status = 'passed';
          }

          test.add(Case({
            element: this,
            status: status
          }));
        });
      }
    });
  },

  meta: {
    testability: 1,
    title: {
      en: 'Input elements for button, submit, or reset must have a value attribute',
      nl: 'Invoerelementen voor knoppen, indienen of resetten moeten een waarde-attribuut hebben'
    },
    description: {
      en: 'Any form element that is rendered as a button has to have a readable value attribute.',
      nl: 'Elk invoerelement dat eruit ziet als een knop moet een leesbaar waarde-attribuut hebben.'
    },
    guidelines: {
      wcag: {
        '2.1.1': {
          techniques: [
            'H91'
          ]
        },
        '2.1.3': {
          techniques: [
            'H91'
          ]
        },
        '4.1.2': {
          techniques: [
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
module.exports = FormButtonsHaveValue;
