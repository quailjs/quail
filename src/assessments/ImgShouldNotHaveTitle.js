/**
 * A simple test case that determines if elements, specified by a selector,
 * exist or not.
 *
 * The test fails for elements that are found and a case is created for each
 * one. The test passes is the selector finds no matching elements.
 */
var Case = require('Case');
const DOM = require('DOM');

var ImgShouldNotHaveTitle = {
  run: function (test) {

    var selector = 'img';

    test.get('scope').each(function () {
      var candidates = DOM.scry(selector, $(this));
      if (!candidates.length) {
        test.add(Case({
          element: undefined,
          status: 'inapplicable'
        }));
      }
      else {
        candidates.each(function () {
          var status = 'passed';

          if (this.hasAttribute('title')) {
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
      en: 'Images should not have a \"title\" attribute',
      nl: 'Afbeeldingen moeten geen \"title\"-attribuut hebben'
    },
    description: {
      en: 'Images should not contain a \"title\" attribute.',
      nl: 'Afbeeldingen zouden geen \"title\"-attribuut moeten bevatten.'
    },
    guidelines: [

    ],
    tags: [
      'image',
      'content'
    ]
  }
};
module.exports = ImgShouldNotHaveTitle;
