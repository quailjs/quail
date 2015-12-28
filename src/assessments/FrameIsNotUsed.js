/**
 * A simple test case that determines if elements, specified by a selector,
 * exist or not.
 *
 * The test fails for elements that are found and a case is created for each
 * one. The test passes is the selector finds no matching elements.
 */
var Case = require('Case');
const DOM = require('DOM');

var FrameIsNotUsed = {
  run: function (test) {
    var selector = 'frame';

    test.get('scope').each(function () {
      var candidates = DOM.scry(selector, $(this));
      if (!candidates.length) {
        test.add(Case({
          element: undefined,
          status: 'passed'
        }));
      }
      else {
        candidates.each(function () {
          test.add(Case({
            element: this,
            status: 'failed'
          }));
        });
      }
    });
  },

  meta: {
    testability: 1,
    title: {
      en: 'Frames are not used',
      nl: 'Gebruik geen frames'
    },
    description: {
      en: 'Frames should not be used to organize a page.',
      nl: 'Gebruik geen frames om een pagina te organiseren.'
    },
    guidelines: [

    ],
    tags: [
      'deprecated',
      'frame'
    ]
  }
};
module.exports = FrameIsNotUsed;
