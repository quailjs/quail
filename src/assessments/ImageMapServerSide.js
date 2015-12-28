/**
 * A simple test case that determines if elements, specified by a selector,
 * exist or not.
 *
 * The test fails for elements that are found and a case is created for each
 * one. The test passes is the selector finds no matching elements.
 */
var Case = require('Case');
const DOM = require('DOM');

var ImageMapServerSide = {
  run: function (test) {

    var selector = 'img';

    test.get('scope').forEach(function (scope) {
      var candidates = DOM.scry(selector, scope);
      if (!candidates.length) {
        test.add(Case({
          element: undefined,
          status: 'inapplicable'
        }));
      }
      else {
        candidates.forEach(function (element) {
          var status = 'passed';

          if (element.hasAttribute('ismap')) {
            status = 'failed';
          }

          test.add(Case({
            element: element,
            status: status
          }));
        });
      }
    });
  },

  meta: {
    testability: 1,
    title: {
      en: 'All links in a server-side map should have duplicate links available in the document',
      nl: 'Alle links in een server-side map moeten elders in het document terugkeren'
    },
    description: {
      en: 'Any image with an \"usemap\" attribute for a server-side image map should have the available links duplicated elsewhere.',
      nl: 'Elke afbeelding met een \"usemap\"-attribuut voor een server-side map moet de beschikbare links ook elders hebben.'
    },
    guidelines: [

    ],
    tags: [
      'objects',
      'iframe',
      'content'
    ]
  }
};
module.exports = ImageMapServerSide;
