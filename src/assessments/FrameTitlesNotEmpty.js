/**
 * A simple test case that determines if elements, specified by a selector,
 * exist or not.
 *
 * The test fails for elements that are found and a case is created for each
 * one. The test passes is the selector finds no matching elements.
 */
var Case = require('Case');
const DOM = require('DOM');

var FrameTitlesNotEmpty = {
  run: function (test, options) {

    var selector = 'frame:not(frame[title]), frame[title=""], iframe:not(iframe[title]), iframe[title=""]';

    test.get('scope').each(function () {
      var candidates = DOM.scry(selector, $(this));
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
    testability: 1,
    title: {
      en: 'Frames cannot have empty \"title\" attributes',
      nl: 'Frames mogen geen leeg \"title\"-attribuut hebben'
    },
    description: {
      en: 'All <code>frame</code> elements must have a valid \"title\" attribute.',
      nl: 'Alle <code>frame</code>-elementen moeten een geldig \"title\"-attribuut hebben.'
    },
    guidelines: {
      wcag: {
        '2.4.1': {
          techniques: [
            'H64'
          ]
        },
        '4.1.2': {
          techniques: [
            'H64'
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
module.exports = FrameTitlesNotEmpty;
