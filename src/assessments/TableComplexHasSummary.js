/**
 * A simple test case that determines if elements, specified by a selector,
 * exist or not.
 *
 * The test fails for elements that are found and a case is created for each
 * one. The test passes is the selector finds no matching elements.
 */
var Case = require('Case');
const DOM = require('DOM');

var TableComplexHasSummary = {
  run: function (test, options) {

    var selector = 'table:not(table[summary], table:has(caption))';

    test.get('scope').each(function () {
      var candidates = DOM.scry(selector, $(this));
      if (!candidates.length) {
        test.add(Case({
          element: undefined,
          status: (options.test ? 'inapplicable' : 'passed')
        }));
      }
      else {
        candidates.each(function () {
          var status;

          // If a test is defined, then use it
          if (options.test && !$(this).is(options.test)) {
            status = 'passed';
          }
          else {
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
    testability: 0.5,
    title: {
      en: 'Complex tables should have a summary',
      nl: 'Complexe tabellen moeten een samenvatting hebben'
    },
    description: {
      en: 'If a table is complex (for example, has some cells with \"colspan\" attributes, the table should have a summary.',
      nl: 'Als een tabel complex is (bijvoorbeeld, als er cellen zijn met \"colspan\"-attributen, moet de tabel een samenvatting hebben.'
    },
    guidelines: {
      wcag: {
        '1.3.1': {
          techniques: [
            'H39'
          ]
        }
      }
    },
    tags: [
      'table',
      'content'
    ]
  }
};
module.exports = TableComplexHasSummary;
