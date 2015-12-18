/**
 * A simple test case that determines if elements, specified by a selector,
 * exist or not.
 *
 * The test fails for elements that are found and a case is created for each
 * one. The test passes is the selector finds no matching elements.
 */
var Case = require('Case');

var BlinkIsNotUsed = {
  run: function (test) {

    var selector = 'blink';

    this.get('scope').each(function () {
      var candidates = $(this).find(selector);
      if (!candidates.length) {
        test.add(Case({
          element: undefined,
          status: 'inapplicable'
        }));
      }
      else {
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
      en: 'The \"blink\" tag should not be used',
      nl: 'De \"blink\"-tag moet niet worden gebruikt'
    },
    description: {
      en: 'The <code>blink</code> tag should not be used. Ever.',
      nl: 'Het is nooit toegestaan om de \"blink\"-tag te gebruiken.'
    },
    guidelines: {
      wcag: {
        '2.2.2': {
          techniques: [
            'F47'
          ]
        }
      }
    },
    tags: [
      'deprecated',
      'content'
    ]
  }
};
module.exports = BlinkIsNotUsed;
