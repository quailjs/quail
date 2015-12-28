/**
 * A simple test case that determines if elements, specified by a selector,
 * exist or not.
 *
 * The test fails for elements that are found and a case is created for each
 * one. The test passes is the selector finds no matching elements.
 */
var Case = require('Case');
const DOM = require('DOM');

var ObjectProvidesMechanismToReturnToParent = {
  run: function (test, options) {

    var selector = 'object';

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
    testability: 0,
    title: {
      en: 'All objects should provide a way for keyboard users to escape',
      nl: 'Alle objecten moeten een manier bevatten voor toetsenbordgebruikers een manier om het object te verlaten'
    },
    description: {
      en: 'Ensure that a user who has only a keyboard as an input device can escape a <code>object</code> element. This requires manual confirmation.',
      nl: 'Zorg ervoor dat een gebruiker die alleen het toetsenbord als bediening gebruikt een <code>object</code>-element. Hiervoor is handmatige bevestiging nodig.'
    },
    guidelines: [

    ],
    tags: [
      'objects',
      'content'
    ]
  }
};
module.exports = ObjectProvidesMechanismToReturnToParent;
