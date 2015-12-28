/**
 * A simple test case that determines if elements, specified by a selector,
 * exist or not.
 *
 * The test fails for elements that are found and a case is created for each
 * one. The test passes is the selector finds no matching elements.
 */
var Case = require('Case');
const DOM = require('DOM');

var ScriptContentAccessibleWithScriptsTurnedOff = {
  run: function (test, options) {

    var selector = 'script';

    test.get('scope').forEach(function (scope) {
      var candidates = DOM.scry(selector, scope);
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
      en: 'Content on the page should still be available if scripts are disabled',
      nl: 'Content op de pagina moet beschikbaar blijven als scripts zijn uitgeschakeld'
    },
    description: {
      en: 'All scripts should be assessed to see if, when the user is browsing with scrips turned off, the page content is still available.',
      nl: 'Alle scripts moeten gecontroleerd worden of, wanneer een gebruiker scripts heeft uitgezet, de content van de pagina nog steeds beschikbaar is.'
    },
    guidelines: [

    ],
    tags: [
      'javascript'
    ]
  }
};
module.exports = ScriptContentAccessibleWithScriptsTurnedOff;
