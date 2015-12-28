/**
 * A simple test case that determines if elements, specified by a selector,
 * exist or not.
 *
 * The test fails for elements that are found and a case is created for each
 * one. The test passes is the selector finds no matching elements.
 */
var Case = require('Case');
const DOM = require('DOM');

var FrameRelationshipsMustBeDescribed = {
  run: function (test, options) {

    var selector = 'frameset:not(frameset[longdesc])';

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
    testability: 0.5,
    title: {
      en: 'Complex framesets should contain a \"longdesc\" attribute',
      nl: 'Complexe framesets moeten een \"longdesc\"-attribuut bevatten'
    },
    description: {
      en: 'If a <code>frameset</code> contains three or more frames, use a \"longdesc\" attribute to help describe the purpose of the frames.',
      nl: 'Als een <code>frameset</code> drie of meer frames bevat, gebruik dan een \"longdesc\"-attribuut om het doel van de frames te beschrijven.'
    },
    guidelines: [

    ],
    tags: [
      'deprecated',
      'frame'
    ]
  }
};
module.exports = FrameRelationshipsMustBeDescribed;
