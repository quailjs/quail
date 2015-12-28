/**
 * A simple test case that determines if elements, specified by a selector,
 * exist or not.
 *
 * The test fails for elements that are found and a case is created for each
 * one. The test passes is the selector finds no matching elements.
 */
var Case = require('Case');
const DOM = require('DOM');

var AreaAltRefersToText = {
  run: function (test, options) {

    options = options || {};

    var selector = 'area';

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
      en: 'Alt text for \"area\" elements should replicate the text found in the image',
      nl: 'Alt-tekst voor \"area\"-elementen moeten de tekst bevatten zoals die ook in de afbeelding staat'
    },
    description: {
      en: 'If an image is being used as a map, and an <code>area</code> encompasses text within the image, then the \"alt\" attribute of that <code>area</code> element should be the same as the text found in the image.',
      nl: 'Als een afbeelding als kaart wordt gebruikt, en een <code>area</code> bevat tekst binnen de afbeelding, dan moet het \"alt\"-attribuut van dat <code>area</code>-element hetzelfde zijn als de tekst die in de afbeelding staat.'
    },
    guidelines: [

    ],
    tags: [
      'imagemap',
      'content'
    ]
  }
};
module.exports = AreaAltRefersToText;
