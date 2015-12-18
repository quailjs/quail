/**
 * A simple test case that determines if elements, specified by a selector,
 * exist or not.
 *
 * The test fails for elements that are found and a case is created for each
 * one. The test passes is the selector finds no matching elements.
 */
var Case = require('Case');

var AreaHasAltValue = {
  run: function (test) {

    var selector = 'area';

    this.get('scope').each(function () {
      var candidates = $(this).find(selector);
      if (!candidates.length) {
        test.add(Case({
          element: undefined,
          status: 'inapplicable'
        }));
      }
      else {
        candidates.each(function () {
          var status;

          // If a test is defined, then use it
          if (this.hasAttribute('alt') && (this.getAttribute('alt') || '').length > 0) {
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
      en: 'All \"area\" elements must have an \"alt\" attribute',
      nl: 'Alle \"area\"-elementen moeten een \"alt\"-attribuut hebben'
    },
    description: {
      en: 'All <code>area</code> elements within a <code>map</code> must have an \"alt\" attribute.',
      nl: 'Alle <code>area</code>-elementen binnen een <code>map</code> moeten een \"alt\"-attribuut hebben.'
    },
    guidelines: {
      wcag: {
        '1.1.1': {
          techniques: [
            'F65',
            'G74',
            'H24'
          ]
        },
        '1.4.3': {
          techniques: [
            'G145'
          ]
        }
      }
    },
    tags: [
      'imagemap',
      'content'
    ],
    options: {
      test: ':not(area[alt])'
    }
  }
};
module.exports = AreaHasAltValue;
