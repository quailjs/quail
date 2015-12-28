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

    var selector = 'input[type!=image]';

    test.get('scope').each(function () {
      var candidates = DOM.scry(selector, $(this));
      if (!candidates.length) {
        test.add(Case({
          element: undefined,
          status: 'inapplicable'
        }));
      }
      else {
        candidates.each(function () {
          var status = 'passed';

          if (this.hasAttribute('alt')) {
            status = 'failed';
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
