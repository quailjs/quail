/**
 * @todo This needs to test do some semantic analysis.
 *
 * A simple test case that determines if elements, specified by a selector,
 * exist or not.
 *
 * The test fails for elements that are found and a case is created for each
 * one. The test passes is the selector finds no matching elements.
 */
var Case = require('Case');

var ImgAltIdentifiesLinkDestination = {
  run: function (test, options) {

    var selector = 'a img[alt]:first';

    this.get('scope').each(function () {
      var candidates = $(this).find(selector);
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
    testability: 0,
    title: {
      en: 'Any image within a link must have \"alt\" text the describes the link destination',
      nl: 'Elke afbeelding binnen een link moet een \"alt\"-tekst hebben die de bestemming van de link beschrijft'
    },
    description: {
      en: 'Any image that is within a link should have an \"alt\" attribute which identifies the destination or purpose of the link.',
      nl: 'Elke afbeelding binnen link moet een \"alt\"-tekst hebben die de bestemming of het doel van de link beschrijft.'
    },
    guidelines: [

    ],
    tags: [
      'image',
      'content'
    ]
  }
};
module.exports = ImgAltIdentifiesLinkDestination;
