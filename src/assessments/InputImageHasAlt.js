/**
 * A simple test case that determines if elements, specified by a selector,
 * exist or not.
 *
 * The test fails for elements that are found and a case is created for each
 * one. The test passes is the selector finds no matching elements.
 */
var Case = require('Case');
const DOM = require('DOM');

var InputImageHasAlt = {
  run: function (test) {
    test.get('scope').forEach(function (scope) {
      var candidates = DOM.scry('input[type=image]', scope)
        .filter((element) => DOM.isVisible(element));
      if (!candidates.length) {
        test.add(Case({
          element: undefined,
          status: 'inapplicable'
        }));
      }
      else {
        candidates.forEach(function (element) {
          var status = 'failed';

          if (element.hasAttribute('alt')) {
            status = 'passed';
          }

          test.add(Case({
            element: element,
            status: status
          }));
        });
      }
    });
  },

  meta: {
    testability: 1,
    title: {
      en: 'All \"input\" elements with a type of \"image\" must have an \"alt\" attribute',
      nl: 'Elk \"invoer\"-element met een type \"afbeelding\" moet een \"alt\"-attribuut hebben'
    },
    description: {
      en: 'All <code>input</code> elements with a type of \"image\" should have an \"alt\" attribute.',
      nl: 'Elk \"invoer\"-element met een type \"afbeelding\" moet een \"alt\"-attribuut hebben.'
    },
    guidelines: {
      508: [
        'a'
      ],
      wcag: {
        '1.1.1': {
          techniques: [
            'F65',
            'G94',
            'H36'
          ]
        },
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
      'image',
      'content'
    ]
  }
};
module.exports = InputImageHasAlt;
