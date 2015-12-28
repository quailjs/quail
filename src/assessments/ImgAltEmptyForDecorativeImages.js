/**
 * @todo Needs to take role="presentation" into account.
 *
 * A simple test case that determines if elements, specified by a selector,
 * exist or not.
 *
 * The test fails for elements that are found and a case is created for each
 * one. The test passes is the selector finds no matching elements.
 */
var Case = require('Case');
const DOM = require('DOM');

var ImgAltEmptyForDecorativeImages = {
  run: function (test, options) {

    var selector = 'img[alt]';

    test.get('scope').forEach(function (scope) {
      var candidates = DOM.scry(selector, scope);
      if (!candidates.length) {
        test.add(Case({
          element: undefined,
          status: (options.test ? 'inapplicable' : 'passed')
        }));
      }
      else {
        candidates.forEach(function (element) {
          var status;

          // If a test is defined, then use it
          if (options.test && !$(element).is(options.test)) {
            status = 'passed';
          }
          else {
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
    testability: 0,
    title: {
      en: 'If an image is purely decorative, the \"alt\" text must be empty',
      nl: 'Als een afbeelding alleen ter decoratie is, moet de \"alt\"-tekst leeg zijn'
    },
    description: {
      en: 'Any image that is only decorative (serves no function or adds to the purpose of the page content) should have an empty \"alt\" attribute.',
      nl: 'Elke afbeelding die alleen ter decoratie is (en die dus geen functie heeft of bijdraagt aan het doel van een contentpagina) moet een leeg \"alt\"-attirbuut hebben.'
    },
    guidelines: {
      wcag: {
        '1.3.3': {
          techniques: [
            'F26'
          ]
        }
      }
    },
    tags: [
      'image',
      'content'
    ]
  }
};
module.exports = ImgAltEmptyForDecorativeImages;
