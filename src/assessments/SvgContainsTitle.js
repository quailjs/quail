/**
 * A simple test case that determines if elements, specified by a selector,
 * exist or not.
 *
 * The test fails for elements that are found and a case is created for each
 * one. The test passes is the selector finds no matching elements.
 */
var Case = require('Case');
const DOM = require('DOM');
var SvgContainsTitle = {
  run: function (test) {

    var selector = 'svg';

    test.get('scope').forEach(function (scope) {
      var candidates = DOM.scry(selector, scope);
      if (!candidates.length) {
        test.add(Case({
          element: undefined,
          status: 'inapplicable'
        }));
      }
      else {
        candidates.forEach(function (element) {
          var status = 'failed';
          var hasTitle = DOM.scry('title', element).length === 1;

          // If a test is defined, then use it
          if (hasTitle) {
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
      en: 'Inline SVG should use Title elements',
      nl: 'Inline SVG moet titelelementen gebruiken'
    },
    description: {
      en: 'Any inline SVG image should have an embedded <code>title</code> element.',
      nl: 'Elke inline SVG-afbeelding moet een ingebed <code>title</code>-element hebben.'
    },
    guidelines: {
      wcag: {
        '1.1.1': {
          techniques: [
            'F65'
          ]
        }
      }
    },
    tags: [
      'image',
      'svg',
      'content'
    ]
  }
};
module.exports = SvgContainsTitle;
