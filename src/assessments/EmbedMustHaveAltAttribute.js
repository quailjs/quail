/**
 * A simple test case that determines if elements, specified by a selector,
 * exist or not.
 *
 * The test fails for elements that are found and a case is created for each
 * one. The test passes is the selector finds no matching elements.
 */
var Case = require('Case');

var EmbedMustHaveAltAttribute = {
  run: function (test) {

    var selector = 'embed';

    this.get('$scope').each(function () {
      var candidates = $(this).find(selector);
      if (!candidates.length) {
        test.add(Case({
          element: undefined,
          status: 'inapplicable'
        }));
      }
      else {
        candidates.each(function () {
          var status = 'failed';
          var alt = this.getAttribute('alt');
          if (alt && typeof alt === 'string' && alt.length > 0) {
            status = 'passed';
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
      en: '\"Embed\" elements must have an \"alt\" attribute',
      nl: '\"Embed\"-elementen moeten een \"alt\"-attribuut hebben'
    },
    description: {
      en: 'All <code>embed</code> elements must have an \"alt\" attribute.',
      nl: 'Alle <code>embed</code>-elementen moeten een \"alt\"-attribuut hebben.'
    },
    guidelines: [

    ],
    tags: [
      'object',
      'embed',
      'content'
    ]
  }
};
module.exports = EmbedMustHaveAltAttribute;
