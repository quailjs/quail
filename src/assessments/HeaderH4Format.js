/**
 * A simple test case that determines if elements, specified by a selector,
 * exist or not.
 *
 * The test fails for elements that are found and a case is created for each
 * one. The test passes is the selector finds no matching elements.
 */
var Case = require('Case');
const DOM = require('DOM');

var HeaderH4Format = {
  run: function (test) {

    var selector = 'h4';

    test.get('scope').each(function () {
      var candidates = DOM.scry(selector, $(this));
      if (!candidates.length) {
        test.add(Case({
          element: undefined,
          status: 'inapplicable'
        }));
      }
      else {
        candidates.each(function () {
          test.add(Case({
            element: this,
            status: 'cantTell'
          }));
        });
      }
    });
  },

  meta: {
    testability: 0,
    title: {
      en: 'All h4 elements are not used for formatting',
      nl: 'H4-elementen worden niet gebruikt voor formatting'
    },
    description: {
      en: 'An <code>h4</code> element may not be used purely for formatting.',
      nl: 'Een <code>h4</code>-element mag niet alleen gebruikt worden voor formatting.'
    },
    guidelines: {
      wcag: {
        '1.3.1': {
          techniques: [
            'T3'
          ]
        }
      }
    },
    tags: [
      'header',
      'content'
    ]
  }
};
module.exports = HeaderH4Format;
