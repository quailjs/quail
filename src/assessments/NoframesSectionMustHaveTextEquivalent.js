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
    test.get('scope').forEach(function (scope) {
      var candidates = DOM.scry('frameset', scope)
        .filter((element) => {
          let noframes = DOM.scry('noframes', element);
          return noframes.length === 0;
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
