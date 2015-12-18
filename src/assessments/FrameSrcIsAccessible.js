/**
 * A simple test case that determines if elements, specified by a selector,
 * exist or not.
 *
 * The test fails for elements that are found and a case is created for each
 * one. The test passes is the selector finds no matching elements.
 */
var Case = require('Case');

var FrameSrcIsAccessible = {
  run: function (test, options) {

    var selector = 'frame';

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
      en: 'The source for each frame is accessible content.',
      nl: 'De bron van elk frame is toegankelijke content.'
    },
    description: {
      en: 'Each frame should contain accessible content, and contain content accessible to screen readers, like HTML as opposed to an image.',
      nl: 'Elk frame moet toegankelijke content bevatten, en content die toegankelijk is voor schermlezers, zoals HTML in tegenstelling tot een afbeelding.'
    },
    guidelines: [

    ],
    tags: [
      'deprecated',
      'frame'
    ]
  }
};
module.exports = FrameSrcIsAccessible;
