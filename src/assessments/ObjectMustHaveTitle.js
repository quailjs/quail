/**
 * A simple test case that determines if elements, specified by a selector,
 * exist or not.
 *
 * The test fails for elements that are found and a case is created for each
 * one. The test passes is the selector finds no matching elements.
 */
var Case = require('Case');
const DOM = require('DOM');

var ObjectMustHaveTitle = {
  run: function (test) {

    var selector = 'object';

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
          var hasTitle = this.hasAttribute('title');

          // If a test is defined, then use it
          if (hasTitle) {
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
      en: 'Objects should have a title attribute',
      nl: 'Objecten moeten een titelattribuut hebben'
    },
    description: {
      en: 'All <code>object</code> elements should contain a \"title\" attribute.',
      nl: 'Alle <code>object</code>-elementen moeten een \"titel\"-attribuut bevatten.'
    },
    guidelines: {
      wcag: {
        '1.1.1': {
          techniques: [
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
module.exports = ObjectMustHaveTitle;
