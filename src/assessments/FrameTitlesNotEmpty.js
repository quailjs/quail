/**
 * A simple test case that determines if elements, specified by a selector,
 * exist or not.
 *
 * The test fails for elements that are found and a case is created for each
 * one. The test passes is the selector finds no matching elements.
 */
var Case = require('Case');
const DOM = require('DOM');

var FrameTitlesNotEmpty = {
  run: function (test) {
    test.get('scope').forEach(function (scope) {
      let candidates = DOM.scry('frame, iframe', scope)
        .filter((element) => {
          let title = DOM.getAttribute(element, 'title');
          return !title || title.length === 0;
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
    testability: 1,
    title: {
      en: 'Frames cannot have empty \"title\" attributes',
      nl: 'Frames mogen geen leeg \"title\"-attribuut hebben'
    },
    description: {
      en: 'All <code>frame</code> elements must have a valid \"title\" attribute.',
      nl: 'Alle <code>frame</code>-elementen moeten een geldig \"title\"-attribuut hebben.'
    },
    guidelines: {
      wcag: {
        '2.4.1': {
          techniques: [
            'H64'
          ]
        },
        '4.1.2': {
          techniques: [
            'H64'
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
module.exports = FrameTitlesNotEmpty;
