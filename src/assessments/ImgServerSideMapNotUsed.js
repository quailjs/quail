/**
 * A simple test case that determines if elements, specified by a selector,
 * exist or not.
 *
 * The test fails for elements that are found and a case is created for each
 * one. The test passes is the selector finds no matching elements.
 */
var Case = require('Case');

var ImgServerSideMapNotUsed = {
  run: function (test) {

    var selector = 'img';

    this.get('scope').each(function () {
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
      en: 'Server-side image maps should not be used',
      nl: 'Server-side image maps moeten niet worden gebruikt'
    },
    description: {
      en: 'Server-side image maps should not be used.',
      nl: 'Server-side image maps mogen niet worden gebruikt.'
    },
    guidelines: [

    ],
    tags: [
      'image',
      'imagemap',
      'content'
    ]
  }
};
module.exports = ImgServerSideMapNotUsed;
