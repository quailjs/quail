/**
 * A simple test case that determines if elements, specified by a selector,
 * exist or not.
 *
 * The test fails for elements that are found and a case is created for each
 * one. The test passes is the selector finds no matching elements.
 */
var Case = require('Case');
const DOM = require('DOM');

var ObjectWithClassIDHasNoText = {
  run: function (test, options) {

    var selector = 'object[classid]:not(object[classid]:empty)';

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
    testability: 1,
    title: {
      en: 'Objects with \"classid\" attributes should change their text if the content of the object changes',
      nl: 'Objecten met \"classid\"-attributen moeten hun tekst veranderen wanneer de content van het object verandert'
    },
    description: {
      en: 'Objects with \"classid\" attributes, should have their default text change when the object\'s content changes.',
      nl: 'Van objecten met \"classid\"-attributen moet de standaardtekst veranderen als de content van het object verandert.'
    },
    guidelines: [

    ],
    tags: [
      'objects',
      'content'
    ]
  }
};
module.exports = ObjectWithClassIDHasNoText;
