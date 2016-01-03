/**
 * A simple test case that determines if elements, specified by a selector,
 * exist or not.
 *
 * The test fails for elements that are found and a case is created for each
 * one. The test passes is the selector finds no matching elements.
 */
var Case = require('Case');
const DOM = require('DOM');

var FramesAreUsedToGroupContent = {
  run: function (test, options) {
    test.get('scope').forEach(function (scope) {
      var candidates = DOM.scry('body', scope)
        .filter((element) => {
          let framesets = DOM.scry('frameset', element);
          return framesets.length === 0;
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
      en: 'Use frame elements to group repeated materials',
      nl: 'Gebruik frame-elementen om herhaalde content te groeperen'
    },
    description: {
      en: 'When blocks of repeated content are used on a site, use frames to group content that is the same across pages.',
      nl: 'Wanneer blokken content op een site herhaald worden, gebruik dan frames om content die op verschillende pagina\'s voorkomt te groeperen.'
    },
    guidelines: {
      wcag: {
        '2.4.1': {
          techniques: [
            'H70'
          ]
        }
      }
    },
    tags: [
      'deprecated',
      'frame'
    ]
  }
};
module.exports = FramesAreUsedToGroupContent;
