/**
 * A simple test case that determines if elements, specified by a selector,
 * exist or not.
 *
 * The test fails for elements that are found and a case is created for each
 * one. The test passes is the selector finds no matching elements.
 */
var Case = require('Case');

var ObjectShouldHaveLongDescription = {
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
      en: 'An object might require a long description',
      nl: 'Een object heeft soms een lange beschrijving nodig'
    },
    description: {
      en: 'Objects might require a long description, especially if their content is complicated.',
      nl: 'Objecten hebben soms een lange beschrijving nodig, zeker in het geval van ingewikkelde content.'
    },
    guidelines: [

    ],
    tags: [
      'objects',
      'content'
    ]
  }
};
module.exports = ObjectShouldHaveLongDescription;
