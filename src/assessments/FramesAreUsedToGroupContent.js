/**
 * A simple test case that determines if elements, specified by a selector,
 * exist or not.
 *
 * The test fails for elements that are found and a case is created for each
 * one. The test passes is the selector finds no matching elements.
 */
var Case = require('Case');

var FramesAreUsedToGroupContent = {
  run: function (test, options) {

    var selector = 'body:not(body:has(frameset))';

    this.get('$scope').each(function () {
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
    testability: 0.5,
    title: {
      en: 'Use frame elements to group repeated materials',
      nl: 'Gebruik frame-elementen om herhaalde content te groeperen'
    },
    description: {
      en: 'When blocks of repeated content are used on a site, use frames to group content that is the same across pages.',
      nl: 'Wanneer blokken content op een site herhaald worden, gebruik dan frames om content die op verschillende pagina\'s voorkomt te groeperen.'
    },
    guidelines: {
      wcag: {
        '2.4.1': {
          techniques:  [
            'H70'
          ]
        }
      }
    },
    tags: [
      'deprecated',
      'frame'
    ]
  }
};
module.exports = FramesAreUsedToGroupContent;
