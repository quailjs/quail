/**
 * A simple test case that determines if elements, specified by a selector,
 * exist or not.
 *
 * The test fails for elements that are found and a case is created for each
 * one. The test passes is the selector finds no matching elements.
 */
var Case = require('Case');

var VideoProvidesCaptions = {
  run: function (test, options) {

    var selector = 'video';

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
      en: 'All video tags must provide captions',
      nl: 'Alle video tags moeten bijschriften bieden'
    },
    description: {
      en: 'All HTML5 video tags must provide captions.',
      nl: 'Alle HTML5 video tags moeten bijschriften bieden.'
    },
    guidelines: {
      508:  [
        'b',
        'b'
      ],
      wcag: {
        '1.2.2': {
          techniques:  [
            'G87'
          ]
        },
        '1.2.4': {
          techniques:  [
            'G87'
          ]
        }
      }
    },
    tags: [
      'media',
      'content'
    ]
  }
};
module.exports = VideoProvidesCaptions;
