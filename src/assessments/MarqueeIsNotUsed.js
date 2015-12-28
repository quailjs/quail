/**
 * A simple test case that determines if elements, specified by a selector,
 * exist or not.
 *
 * The test fails for elements that are found and a case is created for each
 * one. The test passes is the selector finds no matching elements.
 */
var Case = require('Case');
const DOM = require('DOM');

var MarqueeIsNotUsed = {
  run: function (test) {

    var selector = 'marquee';

    test.get('scope').forEach(function (scope) {
      var candidates = DOM.scry(selector, scope);
      if (!candidates.length) {
        test.add(Case({
          element: undefined,
          status: 'passed'
        }));
      }
      else {
        candidates.each(function () {
          var status = 'failed';

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
      en: 'The \"marquee\" tag should not be used',
      nl: 'De \"marquee\"-tag wordt niet gebruikt'
    },
    description: {
      en: 'The <code>marquee</code> element is difficult for users to read and is not a standard HTML element. Try to find another way to convey the importance of this text.',
      nl: 'Het <code>marquee</code>-element is moeilijk te lezen voor gebruikers en is geen standaard HTML-element. Gebruik een andere manier om aan te duiden dat het belangrijke content is.'
    },
    guidelines: [

    ],
    tags: [
      'deprecated',
      'content'
    ]
  }
};
module.exports = MarqueeIsNotUsed;
