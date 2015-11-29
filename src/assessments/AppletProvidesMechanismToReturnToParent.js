/**
 * A simple test case that determines if elements, specified by a selector,
 * exist or not.
 *
 * The test fails for elements that are found and a case is created for each
 * one. The test passes is the selector finds no matching elements.
 */
var Case = require('Case');

var AppletProvidesMechanismToReturnToParent = {
  run: function (test, options) {

    var selector = 'applet';

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
      en: 'All applets should provide a way for keyboard users to escape',
      nl: 'Alle applets moeten door toetsenbordgebruikers kunnen worden verlaten'
    },
    description: {
      en: 'Ensure that a user who has only a keyboard as an input device can escape an <code>applet</code> element. This requires manual confirmation.',
      nl: 'Zorg ervoor dat gebruikers die alleen het toetsenbord gebruiken als bediening een <code>applet</code>-element kunnen verlaten. Hiervoor is handmatige bevestiging nodig.'
    },
    guidelines: [

    ],
    tags: [
      'objects',
      'applet',
      'content'
    ]
  }
};
module.exports = AppletProvidesMechanismToReturnToParent;
