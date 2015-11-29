/**
 * A simple test case that determines if elements, specified by a selector,
 * exist or not.
 *
 * The test fails for elements that are found and a case is created for each
 * one. The test passes is the selector finds no matching elements.
 */
var Case = require('Case');

var ImgWithMapHasUseMap = {
  run: function (test) {

    var selector = 'img[ismap]';

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

          if (this.hasAttribute('usemap')) {
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
      en: 'Any image with an \"ismap\" attribute have a valid \"usemap\" attribute',
      nl: 'Elke afbeelding met een \"ismap\"-attribuut heeft een geldig \"usemap\"-attribuut'
    },
    description: {
      en: 'If an image has an \"ismap\" attribute it must have a valid \"usemap\" attribute.',
      nl: 'Als een afbeelding een \"ismap\"-attribuut heeft, moet het ook een geldig \"usemap\"-attribuut hebben'
    },
    guidelines: {
      508:  [
        'ef',
        'ef'
      ]
    },
    tags: [
      'image',
      'imagemap',
      'content'
    ]
  }
};
module.exports = ImgWithMapHasUseMap;
