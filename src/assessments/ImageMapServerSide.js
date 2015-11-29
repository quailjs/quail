/**
 * A simple test case that determines if elements, specified by a selector,
 * exist or not.
 *
 * The test fails for elements that are found and a case is created for each
 * one. The test passes is the selector finds no matching elements.
 */
var Case = require('Case');

var ImageMapServerSide = {
  run: function (test) {

    var selector = 'img';

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
          var status = 'passed';

          if (this.hasAttribute('ismap')) {
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
