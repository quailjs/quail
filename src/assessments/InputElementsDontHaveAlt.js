/**
 * A simple test case that determines if elements, specified by a selector,
 * exist or not.
 *
 * The test fails for elements that are found and a case is created for each
 * one. The test passes is the selector finds no matching elements.
 */
var Case = require('Case');
const DOM = require('DOM');

var InputElementsDontHaveAlt = {
  run: function (test) {

    var selector = 'input[type]';

    test.get('scope').forEach(function (scope) {
      var candidates = DOM.scry(selector, scope)
        .filter((element) => {
          let type = DOM.getAttribute(element, 'type');
          return type !== 'image';
        });
      if (!candidates.length) {
        test.add(Case({
          element: undefined,
          status: 'inapplicable'
        }));
      }
      else {
        candidates.forEach(function (element) {
          var status = 'passed';

          if (element.hasAttribute('alt')) {
            status = 'failed';
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
      en: 'Input elements which are not images should not have an \"alt\" attribute',
      nl: 'Invoervelden die geen afbeelding zijn, moeten geen \"alt\"-attribuut hebben'
    },
    description: {
      en: 'Input elements which are not images should not have an \"alt\" attribute, because of inconsistencies in how user agents use the \"alt\" attribute.',
      nl: 'Invoervelden die geen afbeelding zijn, moeten geen \"alt\"-attribuut hebben, omdat user agents het \"alt\"-attribuut niet consistent gebruiken.'
    },
    guidelines: [

    ],
    tags: [
      'form',
      'content'
    ]
  }
};
module.exports = InputElementsDontHaveAlt;
