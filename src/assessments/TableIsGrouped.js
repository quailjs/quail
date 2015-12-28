/**
 * A simple test case that determines if elements, specified by a selector,
 * exist or not.
 *
 * The test fails for elements that are found and a case is created for each
 * one. The test passes is the selector finds no matching elements.
 */
var Case = require('Case');
const DOM = require('DOM');

var TableIsGrouped = {
  run: function (test, options) {

    var selector = 'table:not(table:has(thead), table:has(tfoot))';

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
      en: 'Mark up the areas of tables using thead and tbody',
      nl: 'Gebruik thead en tbody voor tabellen'
    },
    description: {
      en: 'Mark up the areas of tables using thead and tbody.',
      nl: 'Gebruik thead en tbody voor tabellen.'
    },
    guidelines: [

    ],
    tags: [
      'table',
      'content'
    ]
  }
};
module.exports = TableIsGrouped;
