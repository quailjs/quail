/**
 * A simple test case that determines if elements, specified by a selector,
 * exist or not.
 *
 * The test fails for elements that are found and a case is created for each
 * one. The test passes is the selector finds no matching elements.
 */
var Case = require('Case');
const DOM = require('DOM');

var ScriptInBodyMustHaveNoscript = {
  run: function (test) {
    test.get('scope').forEach(function (scope) {
      var candidates = DOM.scry('body', scope)
        .filter((element) => {
          let noscripts = DOM.scry('noscript', element);
          let scripts = DOM.scry('script', element);
          return noscripts.length === 0 && scripts.length > 0;
        });
      if (!candidates.length) {
        test.add(Case({
          element: undefined,
          status: 'passed'
        }));
      }
      else {
        candidates.forEach(function (element) {
          test.add(Case({
            element: element,
            status: 'failed'
          }));
        });
      }
    });
  },

  meta: {
    testability: 0.5,
    title: {
      en: 'Scripts should have a corresponding \"noscript\" element',
      nl: 'Scripts moeten een bijbehorend \"noscript\"-element hebben'
    },
    description: {
      en: 'Scripts should be followed by a <code>noscripts</code> element to guide the user to content in an alternative way.',
      nl: 'Scripts moeten worden gevolgd door een <code>noscripts</code>-element om de gebruiker de weg te wijzen naar de content op een andere manier.'
    },
    guidelines: {
      508: [
        'l'
      ]
    },
    tags: [
      'javascript'
    ]
  }
};
module.exports = ScriptInBodyMustHaveNoscript;
