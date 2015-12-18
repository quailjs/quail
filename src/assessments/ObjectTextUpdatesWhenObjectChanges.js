/**
 * A simple test case that determines if elements, specified by a selector,
 * exist or not.
 *
 * The test fails for elements that are found and a case is created for each
 * one. The test passes is the selector finds no matching elements.
 */
var Case = require('Case');

var ObjectTextUpdatesWhenObjectChanges = {
  run: function (test, options) {

    var selector = 'object';

    this.get('scope').each(function () {
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
      en: 'The text equivalents of an object should update if the object changes',
      nl: 'De tekstuele equivalent van een object moet bijgewerkt worden als het object verandert'
    },
    description: {
      en: 'If an object changes, the text equivalent of that object should also change.',
      nl: 'Als een object verandert, moet zijn tekstuele equivalent ook veranderen.'
    },
    guidelines: {
      508: [
        'a'
      ]
    },
    tags: [
      'objects',
      'content'
    ]
  }
};
module.exports = ObjectTextUpdatesWhenObjectChanges;
