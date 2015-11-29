/**
 * A simple test case that determines if elements, specified by a selector,
 * exist or not.
 *
 * The test fails for elements that are found and a case is created for each
 * one. The test passes is the selector finds no matching elements.
 */
var Case = require('Case');

var ObjectDoesNotFlicker = {
  run: function (test, options) {

    var selector = 'object';

    this.get('$scope').each(function () {
      var candidates = $(this).find(selector);
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
    testability: 0,
    title: {
      en: 'Objects do not flicker',
      nl: 'Objecten knipperen of flitsen niet'
    },
    description: {
      en: 'The content within an <code>object</code> tag must not flicker.',
      nl: 'De content binnen een <code>object</code>-tag knippert of flitst niet.'
    },
    guidelines: {
      508:  [
        'j'
      ],
      wcag: {
        '2.2.2': {
          techniques:  [
            'F7'
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
module.exports = ObjectDoesNotFlicker;
