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

var NoframesSectionMustHaveTextEquivalent = {
  run: function (test, options) {

    var selector = 'frameset:not(frameset:has(noframes))';

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
    testability: 0.5,
    title: {
      en: 'All \"noframes\" elements should contain the text content from all frames',
      nl: 'Alle \"noframes\"-elementen moeten de content van alle frames bevatten'
    },
    description: {
      en: 'The <code>noframes</code> content should either replicate or link to the content visible within the frames.',
      nl: 'The <code>noframes</code>-content moet de zichtbare content binnen de frames repliceren of er naar linken.'
    },
    guidelines: [

    ],
    tags: [
      'deprecated',
      'frame'
    ]
  }
};
module.exports = NoframesSectionMustHaveTextEquivalent;
