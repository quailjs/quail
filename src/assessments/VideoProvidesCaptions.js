/**
 * A simple test case that determines if elements, specified by a selector,
 * exist or not.
 *
 * The test fails for elements that are found and a case is created for each
 * one. The test passes is the selector finds no matching elements.
 */
var Case = require('Case');
const DOM = require('DOM');

var VideoProvidesCaptions = {
  run: function (test, options) {

    var selector = 'video';

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
          if (options.test && !DOM.is(element, options.test)) {
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
      en: 'All video tags must provide captions',
      nl: 'Alle video tags moeten bijschriften bieden'
    },
    description: {
      en: 'All HTML5 video tags must provide captions.',
      nl: 'Alle HTML5 video tags moeten bijschriften bieden.'
    },
    guidelines: {
      508: [
        'b',
        'b'
      ],
      wcag: {
        '1.2.2': {
          techniques: [
            'G87'
          ]
        },
        '1.2.4': {
          techniques: [
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
