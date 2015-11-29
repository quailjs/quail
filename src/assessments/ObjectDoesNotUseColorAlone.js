/**
 * A simple test case that determines if elements, specified by a selector,
 * exist or not.
 *
 * The test fails for elements that are found and a case is created for each
 * one. The test passes is the selector finds no matching elements.
 */
var Case = require('Case');

var ObjectDoesNotUseColorAlone = {
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
      en: 'Objects must not use color to communicate alone',
      nl: 'Objecten gebruiken meer dan alleen kleur om hun boodschap over te brengen'
    },
    description: {
      en: 'Objects should contain content that makes sense without color and is accessible to users who are color blind.',
      nl: 'Objecten moeten content bevatten die duidelijk is zonder het kleurgebruik en toegankelijk is voor gebruikers met kleurenblindheid.'
    },
    guidelines: {
      508:  [
        'c'
      ]
    },
    tags: [
      'objects',
      'content'
    ]
  }
};
module.exports = ObjectDoesNotUseColorAlone;
