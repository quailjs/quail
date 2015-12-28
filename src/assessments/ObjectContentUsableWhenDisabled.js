/**
 * @todo Needs refinement.
 *
 * A simple test case that determines if elements, specified by a selector,
 * exist or not.
 *
 * The test fails for elements that are found and a case is created for each
 * one. The test passes is the selector finds no matching elements.
 */
var Case = require('Case');
const DOM = require('DOM');

var ObjectContentUsableWhenDisabled = {
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
      en: 'When objects are disabled, content should still be available',
      nl: 'Als objecten zijn uitgeschakeld, moet de content nog wel beschikbaar zijn'
    },
    description: {
      en: 'The content within objects should still be available, even if the object is disabled. To do this, place a link to the direct object source within the <code>object</code> tag.',
      nl: 'Content binnen objecten moet beschikbaar blijven, ook als het object is uitgeschakeld. Plaats hiervoor een link naar de bron van het object binnen de <code>object</code>-tag.'
    },
    guidelines: [

    ],
    tags: [
      'objects',
      'content'
    ]
  }
};
module.exports = ObjectContentUsableWhenDisabled;
