/**
 * A simple test case that determines if elements, specified by a selector,
 * exist or not.
 *
 * The test fails for elements that are found and a case is created for each
 * one. The test passes is the selector finds no matching elements.
 */
var Case = require('Case');
const DOM = require('DOM');

var DocumentHasTitleElement = {
  run: function (test) {

    var selector = 'head title';

    test.get('scope').forEach(function (scope) {
      var candidates = DOM.scry(selector, scope);
      if (candidates.length === 1) {
        test.add(Case({
          element: candidates.get(0),
          status: 'passed'
        }));
      }
      else if (candidates.length === 0) {
        test.add(Case({
          element: undefined,
          status: 'failed'
        }));
      }
      else if (candidates.length > 1) {
        candidates.each(function () {
          test.add(Case({
            element: this,
            status: 'failed'
          }));
        });
      }
    });
  },

  meta: {
    testability: 1,
    title: {
      en: 'The document should have a title element',
      nl: 'Het document moet een titelelement hebben'
    },
    description: {
      en: 'The document should have a title element.',
      nl: 'Het document moet een titelelement hebben.'
    },
    guidelines: {
      wcag: {
        '2.4.2': {
          techniques: [
            'H25'
          ]
        }
      }
    },
    tags: [
      'document',
      'head'
    ]
  }
};
module.exports = DocumentHasTitleElement;
